import express, {Request, Response, json} from 'express'
import { Iwish } from './types'
import { findWish, generateServerError } from './helper'


const app = express()

let wishList:Iwish[] = [] // app starts with empty wishlist. NOTE: if server crashes or is restarted, the list always resets to empty

app.use(json())

// get all wishes
app.get('/', (req:Request, res) => {
  try {
    if (wishList.length) {
      return res.status(200).json(wishList)
    }
    return res.status(404).json({message: 'No wishes found. Try adding one.'})
  } catch (error:any) {
      return generateServerError(error, res)
    }
})


// add a wish
app.post('/', (req:Request, res:Response)=> {
  try {
    const {name, description} = req.body
  
    if (findWish(name, wishList)) { //check if wish exists by name
      return res.status(409).json({message: `A wish named ${name} already exists.`})
    }
  
    wishList.push({name, description})
    return res.status(201).json({message: 'Wish Added Successfully.'})
  } catch (error:any) {
      return generateServerError(error, res)
    }
})

// update wish
app.put('/', (req:Request, res) => {
  try {
    const {wishName} = req.query
    const {name, description} = req.body
    if (!name || !description) { // put requires all fields to be provided
      const message = ('missing fields in body:') + (!name? ' name': '') + (!description? ' description':'')
      return res.status(400).json({message})
    }
    if (findWish(wishName as string, wishList)) {
      wishList.forEach((wish:Iwish)=>{
        if (wish.name == wishName) {
          wish.name = name
          wish.description = description
        }
      })
      return res.status(200).json({ message: 'Wish updated successfully.' })
    }
  
    return res.status(404).json({message: `Cannot update wish as no wish found named ${wishName}`})
  } catch (error:any) {
      return generateServerError(error, res)
    }
})

// patch wish
app.patch('/', (req:Request, res) => {
  try {
    const {wishName} = req.query
    const {name, description} = req.body
    if (findWish(wishName as string, wishList)) {
      wishList.forEach((wish:Iwish)=>{
        if (wish.name == wishName) {
          wish.name = name ? name : wish.name
          wish.description = description ? description : wish.description
        }
      })
      return res.status(200).json({ message: 'Wish patched successfully.' })
    }
  
    return res.status(404).json({message: `Cannot patch wish as no wish found named ${wishName}`})
  } catch (error:any) {
    return res.status(500).json({
      message: "Oops! It's not you, it's us.",
      error: error.message
    })
  }
})

// delete wish
app.delete('/:wishName', (req:Request<{wishName:string}>, res)=> {
  try {
    const {wishName} = req.params
    if (findWish(wishName as string, wishList)) {
      const wishIndex = wishList.findIndex((wish:Iwish)=> {
        wish.name === wishName
      })
      wishList.splice(wishIndex,1)
      return res.status(200).json({message: 'Wish deleted.'})
    }
  
    return res.status(404).json({message: `No wish found named ${wishName}`})
  } catch (error:any) {
      return generateServerError(error, res)
  }
})


// A protected endpoint
app.get('/protected', (req:Request, res:Response)=> {
  try {
    const {secret} = req.headers
    if (secret==='grogu') {
      return res.status(200).json({message: "Access Granted. Secret information ..."})
    }
    return res.status(401).json({message: "Access Denied."})
  } catch (error:any) {
      return generateServerError(error, res)
  }
})


export default app