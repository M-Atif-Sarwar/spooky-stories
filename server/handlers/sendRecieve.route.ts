import express from 'express'
import { getRequest, postRequest } from "../controllers/data.controller.js"

export const router=express.Router()

router.get('/sendData',getRequest)
router.post('/recieveData',postRequest)

