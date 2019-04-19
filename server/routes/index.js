import express from "express";
import LocationController from "../controllers/location";
import verifyId from "../middleware/verifyId";
import { validateLocation } from "../middleware/validations";

const router = express.Router();

/** LOCATION ROUTES */
router
  .route("/location")
  .post(validateLocation("create"), LocationController.addLocation) // Route for creating a location
  .get(LocationController.getAllLocations); // Route for getting all locations

router
  .route("/location/:id")
  .get(verifyId, LocationController.getLocation) // Route for getting a location by ID
  .put(verifyId, validateLocation("update"), LocationController.updateLocation) // Route for updating a location by ID
  .delete(verifyId, LocationController.deleteLocation); // Route for deleting a location by ID

export default router;
