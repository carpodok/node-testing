const app = require("./app");
const supertest = require("supertest");

describe("GET /getUsers", () => {
  it("should return all users", async () => {
    const res = await supertest(app).get("/getUsers");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([
      {
        username: "Ali",
        email: "ali@gmail.com",
        password: "123456",
      },
      {
        username: "Talha",
        email: "talha@gmail.com",
        password: "123456",
      },
    ]);
  });
});

describe("POST /login", () => {
  const user = {
    username: "Ali",
    email: "ali@gmail.com",
    password: "123456",
  };

  it("should returns 200 if user is exist", async () => {
    const res = await supertest(app).post("/login").send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      username: user.username,
      email: user.email,
    });
  });

  it("should returns 404 if user doesn't exist", async () => {
    const res = await supertest(app).post("/login").send({
      email: "Ali Talha",
      password: "1234567890",
    });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ success: false, message: "User not found" });
  });
});
