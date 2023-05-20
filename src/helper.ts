import { Response } from "express"
import { Iwish } from "./types"

export const findWish = (name:string, wishes:Iwish[]) => {
    return wishes.filter((wish:Iwish)=> {
        return wish.name === name
    })[0]
}

export const generateServerError = (error:any, res:Response)=> {
    return res.status(500).json({
        message: "Oops! It's not you, it's us.",
        error: error.message
      })
}