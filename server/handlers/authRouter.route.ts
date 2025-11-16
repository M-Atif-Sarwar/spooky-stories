import express from 'express'
import { router } from './sendRecieve.route.js'
import { codeVerification, localSignup, loginController } from '../controllers/user.controller.js'

export const authRouter=express.Router()

authRouter.post('/signup',localSignup)
authRouter.post("/verify/:username",codeVerification)
authRouter.post("/login",loginController)