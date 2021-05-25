import {app} from "../app/app"
import request from "supertest"


describe("Test public routes", () => {

  it("should respond with a 200 response and a 'Hello World' body in / route", async () => {
    const res = await request(app)
      .get("/api/products");
    expect(res.status).toEqual(200)
  });

})