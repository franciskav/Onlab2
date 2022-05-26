import express from 'express'
import placeController from '../controllers/place'

const router = express.Router()

router.get('/getPlaces', placeController.getPlaces)
router.post('/createPlace', placeController.createPlace)
router.put('/updatePlace', placeController.updatePlace)
router.delete('/deletePlace', placeController.deletePlace)

export = router
