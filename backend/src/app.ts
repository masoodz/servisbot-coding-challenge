import express from 'express';
import { getBots, getWorkers, getLogs } from './models/data';
import { Bot, Worker, Log } from './types';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get("/bots", (req, res) => {
  const bots: Bot[] = getBots();
  res.json(bots);
});

app.get("/bots/:botId/workers", (req, res) => {
  const workers: Worker[] = getWorkers().filter(worker => worker.bot === req.params.botId);
  res.json(workers);
});

app.get("/workers/:workerId/logs", (req, res) => {
  const logs: Log[] = getLogs().filter(log => log.worker === req.params.workerId);
  res.json(logs);
});

app.get("/bots/:botId/logs", (req, res) => {
  const logs: Log[] = getLogs().filter(log => log.bot === req.params.botId);
  res.json(logs);
});

export default app;
