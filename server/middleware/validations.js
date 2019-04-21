import validator from "validator";
import isEmpty from "is-empty";
import apiResponse from "../helpers/apiResponse";

const validateName = (inputValue, errors, field, type) => {
  const lowercaseField = field.toLowerCase();
  const checkMinimumValue = () => {
    if (!validator.isLength(inputValue, { min: 2, max: undefined })) {
      errors[lowercaseField] = `${field} should be a minimum of 2 characters`;
    }
  };
  if (type !== "update") {
    if (!validator.isEmpty(inputValue)) {
      checkMinimumValue();
    } else {
      errors[lowercaseField] = `${field} is required`;
    }
  } else {
    checkMinimumValue();
  }
};

const validatePopulation = (inputValue, errors, field) => {
  const lowercaseField = field.toLowerCase();
  const regex = /^[0-9]*$/;
  if (!validator.isEmpty(inputValue)) {
    if (!inputValue.match(regex)) {
      errors[
        lowercaseField
      ] = `${field} population must contain only numbers and no spaces`;
    }
  } else {
    errors[lowercaseField] = `${field} population is required`;
  }
};

export const validateLocation = type => (request, response, next) => {
  const { name, males, females, province } = request.body;
  const errors = {};
  const validateInputs = () => {
    if (name === "" || name) {
      const inputtedName = name.trim();
      validateName(inputtedName, errors, "Name", type);
    }
    if (males === "" || males) {
      const inputtedMales = males.trim();
      validatePopulation(inputtedMales, errors, "Male", type);
    }
    if (females === "" || females) {
      const inputtedFemales = females.trim();
      validatePopulation(inputtedFemales, errors, "Female", type);
    }
    if (province === "" || province) {
      const inputtedProvince = province.trim();
      validateName(inputtedProvince, errors, "Province", type);
    }
  };

  if (type === "create") {
    if (
      typeof name === "undefined" ||
      typeof males === "undefined" ||
      typeof females === "undefined" ||
      typeof province === "undefined"
    ) {
      return apiResponse.error(
        response,
        400,
        "One or more field(s) is(are) not defined"
      );
    }
    validateInputs();
  }
  if (type === "update") validateInputs();

  if (!isEmpty(errors)) {
    return apiResponse.error(response, 400, errors);
  }
  return next();
};
