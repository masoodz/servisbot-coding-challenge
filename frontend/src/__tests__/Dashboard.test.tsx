import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import Dashboard from "../components/Dashboard";
import { fetchBots } from "../api/api";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

jest.mock("../api/api", () => ({
  fetchBots: jest.fn(),
}));

describe("Dashboard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dashboard correctly", async () => {
    const mockResponse: AxiosResponse = {
      data: {
        data: [
          { id: "1", name: "Bot One", status: "ENABLED", created: Date.now() },
          { id: "2", name: "Bot Two", status: "DISABLED", created: Date.now() },
        ],
        pageInfo: { totalItems: 2 },
      },
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
      config: {
        headers: { "Content-Type": "application/json" },
      } as InternalAxiosRequestConfig,
    };

    (fetchBots as jest.MockedFunction<typeof fetchBots>).mockResolvedValue(
      mockResponse
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Bot One")).toBeInTheDocument();
      expect(screen.getByText("Bot Two")).toBeInTheDocument();
    });
  });
});
