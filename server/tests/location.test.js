import { expect, request, STATUS_CODES } from "./config";
import LocationModel from "../models/location";
import data from "./__mock__/location.data";

describe("test cases for location operations", () => {
  let locationID;
  const invalidLocationID = "5cbb89fe7878b725f9aebd";
  before(() => {
    LocationModel.collection.deleteMany({}).then(() => {
      done();
    });
  });

  it("should not be able to create a new location with undefined data", done => {
    request
      .post("/api/v1/location")
      .send(data.invalidData1)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal(
          "One or more field(s) is(are) not defined"
        );
        expect(response.body.status).to.equal(STATUS_CODES[400]);
        if (error) done(error);
        done();
      });
  });
  it("should not be able to create a location with empty input data", done => {
    request
      .post("/api/v1/location")
      .send(data.invalidData2)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.deep.equal(data.invalidDataResponse1);
        expect(response.body.status).to.equal(STATUS_CODES[400]);
        if (error) done(error);
        done();
      });
  });
  it("should not be able to create a new location with invalid input fields", done => {
    request
      .post("/api/v1/location")
      .send(data.invalidData3)
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.deep.equal(data.invalidDataResponse2);
        expect(response.body.status).to.equal(STATUS_CODES[400]);
        if (error) done(error);
        done();
      });
  });
  it("should be able to create a new location with valid input data", done => {
    request
      .post("/api/v1/location")
      .send(data.validData1)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.haveOwnProperty("payload");
        expect(data.validData1.name).to.equal(response.body.payload.name);
        expect(data.validData1.province).to.equal(
          response.body.payload.province
        );
        expect(data.validData1.males).to.equal(
          response.body.payload.males.toString()
        );
        expect(data.validData1.females).to.equal(
          response.body.payload.females.toString()
        );
        expect("Successfully created new location").to.equal(
          response.body.message
        );
        expect(response.body.status).to.equal(STATUS_CODES[201]);
        locationID = response.body.payload._id;
        if (error) done(error);
        done();
      });
  });
  it("should not be able to create a new location with the same location name", done => {
    request
      .post("/api/v1/location")
      .send(data.validData1)
      .end((error, response) => {
        expect(response.status).to.equal(409);
        expect("Location already exist").to.equal(response.body.message);
        expect(response.body.status).to.equal(STATUS_CODES[409]);
        if (error) done(error);
        done();
      });
  });
  it(`should be able to get all locations if any is available`, done => {
    request.get("/api/v1/location").end((error, response) => {
      expect(response.status).to.equal(200);
      expect("Successfully retrieved all locations").to.equal(
        response.body.message
      );
      expect(response.body.payload.length).to.equal(1);
      expect(response.body.status).to.equal(STATUS_CODES[200]);
      if (error) done(error);
      done();
    });
  });
  it(`should not be able get a single locations with an invalid ID`, done => {
    request
      .get(`/api/v1/location/${invalidLocationID}`)
      .end((error, response) => {
        expect(response.status).to.equal(422);
        expect("Invalid location id provided").to.equal(response.body.message);
        expect(response.body.status).to.equal(STATUS_CODES[422]);
        if (error) done(error);
        done();
      });
  });
  it(`should be able to get a single locations by ID`, done => {
    request.get(`/api/v1/location/${locationID}`).end((error, response) => {
      expect(response.status).to.equal(200);
      expect("Successfully retrieved location").to.equal(response.body.message);
      expect(response.body.payload._id).to.equal(locationID);
      expect(response.body.status).to.equal(STATUS_CODES[200]);
      if (error) done(error);
      done();
    });
  });
  it(`should be able to update a location by ID`, done => {
    request
      .put(`/api/v1/location/${locationID}`)
      .send({ name: "ikeja" })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect("Successfully updated location").to.equal(response.body.message);
        expect(response.body.status).to.equal(STATUS_CODES[200]);
        if (error) done(error);
        done();
      });
  });
  it("should be able to delete a location", done => {
    request.delete(`/api/v1/location/${locationID}`).end((error, response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Successfully deleted location");
      expect(response.body.payload._id).to.equal(locationID);
      expect(response.body.status).to.equal(STATUS_CODES[200]);
      if (error) done(error);
      done();
    });
  });
  it("should not be able to delete a location that has already been deleted", done => {
    request.delete(`/api/v1/location/${locationID}`).end((error, response) => {
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal("Location was not found");
      expect(response.body.status).to.equal(STATUS_CODES[404]);
      if (error) done(error);
      done();
    });
  });
  it(`should not be able to update a location that has already been deleted`, done => {
    request
      .put(`/api/v1/location/${locationID}`)
      .send({ name: "ikeja" })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect("Location was not found").to.equal(response.body.message);
        expect(response.body.status).to.equal(STATUS_CODES[404]);
        if (error) done(error);
        done();
      });
  });
  it("should not be able to get a location that does not exist or has already been deleted", done => {
    request.get(`/api/v1/location/${locationID}`).end((error, response) => {
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal("Location was not found");
      expect(response.body.status).to.equal(STATUS_CODES[404]);
      if (error) done(error);
      done();
    });
  });
  it("should get an empty array when no location are available", done => {
    request.get("/api/v1/location").end((error, response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(
        "There are no available locations"
      );
      expect(response.body.status).to.equal(STATUS_CODES[200]);
      if (error) done(error);
      done();
    });
  });
});
