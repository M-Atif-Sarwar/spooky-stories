import express from 'express'
import { router } from './sendRecieve.route.js'
import { codeVerification, localSignup } from '../controllers/user.controller.js'

export const authRouter=express.Router()

router.post('/signup',localSignup)
router.post("/verify",codeVerification)