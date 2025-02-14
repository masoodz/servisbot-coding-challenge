import fs from "fs";
import path from "path";
import { Bot, Worker, Log } from "../types";

function readJsonFile<T>(fileName: string): T {
  const filePath = path.join(__dirname, fileName);
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData) as T;
}

let cachedBots: Bot[] = [];
let cachedWorkers: Worker[] = [];
let cachedLogs: Log[] = [];

function loadCache() {
  cachedBots = readJsonFile<Bot[]>("bots.json");
  cachedWorkers = readJsonFile<Worker[]>("workers.json");
  cachedLogs = readJsonFile<Log[]>("logs.json");
  console.log("Data cache initialized");
}

loadCache();

export const getBots = (): Bot[] => cachedBots;
export const getWorkers = (): Worker[] => cachedWorkers;
export const getLogs = (): Log[] => cachedLogs;
