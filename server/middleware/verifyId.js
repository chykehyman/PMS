import { Types } from "mongoose";
import apiResponse from "../helpers/apiResponse";

export default (request, response, next) => {
  const { id } = request.params;
  if (!Types.ObjectId.isValid(id)) {
    return apiResponse.error(response, 422, "Invalid location id provided");
  }
  return next();
};
