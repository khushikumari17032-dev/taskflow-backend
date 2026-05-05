import request from "supertest";
import app from "../server.js";

let createdTaskId;

describe("Task API Tests", () => {

  // GET
  test("GET /api/tasks should return array", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // POST
  test("POST /api/tasks should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ text: "Test Task" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");

    createdTaskId = res.body.id;
  });

  // PUT
  test("PUT /api/tasks/:id should update task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
  });

  // DELETE
  test("DELETE /api/tasks/:id should delete task", async () => {
    const res = await request(app)
      .delete(`/api/tasks/${createdTaskId}`);

    expect(res.statusCode).toBe(200);
  });

});