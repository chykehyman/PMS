export default {
  invalidData1: {
    name: "ibeju",
    males: 45,
    province: "lekki"
  },
  invalidData2: {
    name: "",
    males: "",
    females: "",
    province: ""
  },
  invalidData3: {
    name: "r",
    males: "4e",
    females: "4 6",
    province: "f"
  },
  invalidDataResponse1: {
    name: "Name is required",
    male: "Male population is required",
    female: "Female population is required",
    province: "Province is required"
  },
  invalidDataResponse2: {
    name: "Name should be a minimum of 2 characters",
    male: "Male population must contain only numbers and no spaces",
    female: "Female population must contain only numbers and no spaces",
    province: "Province should be a minimum of 2 characters"
  },
  validData1: {
    name: "ibeju",
    males: "45",
    females: "70",
    province: "lekki"
  }
};
