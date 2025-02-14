import request from "supertest";

import app from "../app";
import { getBots, getLogs, getWorkers } from "../models/data";

jest.mock("../models/data"); 

describe("API Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe("GET /bots", () => {
    it("should return a list of bots", async () => {
      const mockBots = [
        { id: "1", name: "Test Bot", status: "ENABLED", created: Date.now() },
      ];
      (getBots as jest.Mock).mockReturnValue(mockBots);
      const response = await request(app).get("/bots");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBots);
    });
  });

  describe("GET /bots/:botId/workers", () => {
    it("should return workers for a specific bot", async () => {
      const mockWorkers = [
        { id: "1", name: "Worker One", bot: "1", created: Date.now() },
      ];
      (getWorkers as jest.Mock).mockReturnValue(mockWorkers);
      const response = await request(app).get("/bots/1/workers");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        mockWorkers.filter((worker) => worker.bot === "1")
      );
    });
  });

  describe("GET /workers/:workerId/logs", () => {
    it("should return logs for a specific worker", async () => {
      const mockLogs = [
        {
          id: "1",
          created: "2024-04-22T14:14:14.926Z",
          message: "Log message",
          bot: "1",
          worker: "1",
        },
      ];
      (getLogs as jest.Mock).mockReturnValue(mockLogs);
      const response = await request(app).get("/workers/1/logs");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        mockLogs.filter((log) => log.worker === "1")
      );
    });
  });

  describe("GET /bots/:botId/logs", () => {
    it("should return logs for a specific bot", async () => {
      const mockLogs = [
        {
          id: "2",
          created: "2024-04-22T14:14:14.926Z",
          message: "Another log message",
          bot: "2",
          worker: "2",
        },
      ];
      (getLogs as jest.Mock).mockReturnValue(mockLogs);
      const response = await request(app).get("/bots/2/logs");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockLogs.filter((log) => log.bot === "2"));
    });
  });
});
