import supertest from "supertest";
import app from "../app";

export { STATUS_CODES } from "http";
export { expect } from "chai";

export const request = supertest(app);
