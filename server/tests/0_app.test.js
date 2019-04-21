import { expect, request, STATUS_CODES } from "./config";

describe("test cases for application base url", () => {
  it("should return `200` when the home/base api is called", done => {
    request.get("/api/v1").end((error, response) => {
      expect(response.status).to.equal(200);
      expect(response.body.status).to.equal(STATUS_CODES[200]);
      expect(response.body.message).to.equal(
        "Welcome to the Population Management System API"
      );

      if (error) done(error);
      done();
    });
  });

  it("should return `404` when no  matching api route is not found", done => {
    request.get("/api/v1/wrongRoute").end((error, response) => {
      expect(response.status).to.equal(404);
      expect(response.body.status).to.equal(STATUS_CODES[404]);
      expect(response.body.message).to.equal(
        "API route does not exist. Redirect to /api/v1"
      );

      if (error) done(error);
      done();
    });
  });
});
