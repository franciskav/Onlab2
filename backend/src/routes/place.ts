import express from 'express'
import placeController from '../controllers/place'

const router = express.Router()

router.get(
  '/getPlaces',
  placeController.authenticate,
  placeController.getPlaces,
)
router.post(
  '/createPlace',
  placeController.authenticate,
  placeController.createPlace,
)
router.post(
  '/updatePlace',
  placeController.authenticate,
  placeController.updatePlace,
)
router.delete(
  '/deletePlace/:id',
  placeController.authenticate,
  placeController.deletePlace,
)

export = router
