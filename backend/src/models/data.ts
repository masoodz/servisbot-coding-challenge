import fs from "fs";
import path from "path";
import { Bot, Worker, Log } from "../types";

function readJsonFile<T>(fileName: string): T {
  const filePath = path.join(__dirname, fileName);
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData) as T;
}

export const getBots = (): Bot[] => readJsonFile<Bot[]>("bots.json");
export const getWorkers = (): Worker[] =>
  readJsonFile<Worker[]>("workers.json");
export const getLogs = (): Log[] => readJsonFile<Log[]>("logs.json");
