import request from "supertest";
import app from "../app";
import { getBots, getWorkers, getLogs } from "../models/data";
import { Bot, Worker, Log } from "../types";

jest.mock("../models/data", () => ({
  getBots: jest.fn(),
  getWorkers: jest.fn(),
  getLogs: jest.fn(),
}));

describe("API Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe("GET /bots", () => {
    it("should return paginated bots", async () => {
      const mockBots: Bot[] = [
        { id: "1", name: "Bot One", status: "ENABLED", created: Date.now() },
        { id: "2", name: "Bot Two", status: "DISABLED", created: Date.now() },
        { id: "3", name: "Bot Three", status: "ENABLED", created: Date.now() },
      ];

      (getBots as jest.Mock).mockReturnValue(mockBots);

      const response = await request(app).get("/bots?page=1&limit=2");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pageInfo.totalItems).toBe(3);
      expect(response.body.pageInfo.totalPages).toBe(2);
    });
  });

  describe("GET /bots/:botId/workers", () => {
    it("should return paginated workers for a bot", async () => {
      const mockBots: Bot[] = [{ id: "1", name: "Bot One", status: "ENABLED", created: Date.now() }];
      const mockWorkers: Worker[] = [
        { id: "W1", name: "Worker One", description: "First Worker", bot: "Bot One", created: Date.now() },
        { id: "W2", name: "Worker Two", description: "Second Worker", bot: "Bot One", created: Date.now() },
      ];

      (getBots as jest.Mock).mockReturnValue(mockBots);
      (getWorkers as jest.Mock).mockReturnValue(mockWorkers);

      const response = await request(app).get("/bots/1/workers?page=1&limit=1");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.pageInfo.totalItems).toBe(2);
      expect(response.body.pageInfo.totalPages).toBe(2);
    });

    it("should return 404 if bot is not found", async () => {
      (getBots as jest.Mock).mockReturnValue([]);

      const response = await request(app).get("/bots/99/workers");

      expect(response.status).toBe(404);
      expect(response.text).toBe("Bot not found");
    });
  });

  describe("GET /workers/:workerId/logs", () => {
    it("should return paginated logs for a worker", async () => {
      const mockLogs: Log[] = [
        { id: "L1", message: "Log Message One", created: Date.now().toString(), bot: "1", worker: "W1" },
        { id: "L2", message: "Log Message Two", created: Date.now().toString(), bot: "1", worker: "W1" },
      ];

      (getLogs as jest.Mock).mockReturnValue(mockLogs);

      const response = await request(app).get("/workers/W1/logs?page=1&limit=1");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.pageInfo.totalItems).toBe(2);
      expect(response.body.pageInfo.totalPages).toBe(2);
    });
  });

  describe("GET /bots/:botId/logs", () => {
    it("should return paginated logs for a bot", async () => {
      const mockLogs: Log[] = [
        { id: "L1", message: "Log Message One", created: Date.now().toString(), bot: "1", worker: "W1" },
        { id: "L2", message: "Log Message Two", created: Date.now().toString(), bot: "1", worker: "W2" },
      ];

      (getLogs as jest.Mock).mockReturnValue(mockLogs);

      const response = await request(app).get("/bots/1/logs?page=1&limit=1");

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.pageInfo.totalItems).toBe(2);
      expect(response.body.pageInfo.totalPages).toBe(2);
    });
  });
});
