import express from 'express'
import { router } from './sendRecieve.route.js'
import { codeVerification, localSignup } from '../controllers/user.controller.js'

export const authRouter=express.Router()

authRouter.post('/signup',localSignup)
authRouter.post("/verify/:username",codeVerification)