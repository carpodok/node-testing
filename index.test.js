const app = require("./app");
const supertest = require("supertest");

describe("GET /getCommentsByd", () => {
  it("should return an error if id is not passed", async () => {
    const res = await supertest(app).get("/getCommentsById");

    expect(res.status).toBe(400);
  });

  it("should return a post when a valid id is passed", async () => {
    const res = await supertest(app).get(`/getCommentsById`).query({
      postId: 1,
    });

    expect(res.status).toBe(200);
  });

  it("should return a 404 error if no comments found", async () => {
    const res = await supertest(app).get(`/getCommentsById`).query({
      postId: 9999,
    });

    expect(res.status).toBe(404);
  });
});
