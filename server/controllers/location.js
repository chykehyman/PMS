import LocationModel from "../models/location";
import apiResponse from "../helpers/apiResponse";

export default class LocationController {
  static async addLocation(request, response) {
    const { name } = request.body;
    try {
      const foundLocation = await LocationModel.findOne({ name });
      if (foundLocation) {
        return apiResponse.error(response, 409, "Location already exist");
      }
      const createdLocation = await new LocationModel(request.body).save();
      return apiResponse.success(
        response,
        201,
        "Successfully created new location",
        createdLocation
      );
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async getAllLocations(_, response) {
    try {
      const allLocations = await LocationModel.find();
      if (allLocations.length < 1)
        return apiResponse.success(
          response,
          200,
          "There are no available locations"
        );
      const payload = allLocations.map(location => {
        const { _id, name, females, males, province, createdAt } = location;
        const total = males + females;
        return { _id, name, females, males, total, province, createdAt };
      });
      return apiResponse.success(
        response,
        200,
        "Successfully retrieved all locations",
        payload
      );
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async getLocation(request, response) {
    const { id } = request.params;
    try {
      const location = await LocationModel.findById(id);
      if (!location)
        return apiResponse.error(response, 404, "Location was not found");
      return apiResponse.success(
        response,
        200,
        "Successfully retrieved location",
        location
      );
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async updateLocation(request, response) {
    const {
      params: { id },
      body
    } = request;
    try {
      const location = await LocationModel.findById(id);
      if (!location)
        return apiResponse.error(response, 404, "Location was not found");

      const updateData = {
        name: body.name || location.name,
        males: body.males || location.males,
        females: body.females || location.females,
        province: body.province || location.province
      };
      await LocationModel.updateOne({ _id: id }, updateData, {
        multi: true,
        new: true
      });
      return apiResponse.success(
        response,
        200,
        "Successfully updated location"
      );
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async deleteLocation(request, response) {
    const { id } = request.params;
    try {
      const deletedLocation = await LocationModel.findOneAndDelete({ _id: id });
      if (!deletedLocation)
        return apiResponse.error(response, 404, "Location was not found");

      return apiResponse.success(
        response,
        200,
        "Successfully deleted location",
        deletedLocation
      );
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }
}
