import express from 'express'
import indexController from '../controllers'

const router = express.Router()

router.get('/initDb', indexController.initDb)

export = router
