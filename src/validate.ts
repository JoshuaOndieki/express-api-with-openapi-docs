import { NextFunction, Request, Response } from "express"

export default function validateWish(req:Request, res:Response, next:NextFunction){
    const {name, description} = req.body
    if (!name || !description) { // post and put requires all fields to be provided
        const message = ('missing fields in body:') + (!name? ' name': '') + (!description? ' description':'')
        return res.status(400).json({message})
    }
    next()
}