import express from 'express';
import { getBots, getWorkers, getLogs } from './models/data';
import { Bot, Worker, Log } from './types';
import morgan from 'morgan';
import cors from 'cors';


const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get("/bots", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const bots: Bot[] = getBots();
  const paginatedResult = paginate(bots, page, limit);
  res.json(paginatedResult);
});

app.get("/bots/:botId/workers", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const botId = req.params.botId;
  const bots: Bot[] = getBots(); 
  const bot = bots.find(b => b.id === botId);
  if (!bot) {
    res.status(404).send('Bot not found');
    return;
  }
  const workers: Worker[] = getWorkers().filter(worker => worker.bot === bot.name);
  const paginatedWorkers = paginate(workers, page, limit);
  res.json(paginatedWorkers);
});

app.get("/workers/:workerId/logs", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const workerId = req.params.workerId;
  const allLogs: Log[] = getLogs().filter(log => log.worker === workerId);
  const paginatedLogs = paginate(allLogs, page, limit);
  res.json(paginatedLogs);
});

app.get("/bots/:botId/logs", (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const botId = req.params.botId;
  const logs: Log[] = getLogs().filter(log => log.bot === botId);
  const paginatedLogs = paginate(logs, page, limit);
  res.json(paginatedLogs);
});

function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: items.slice(startIndex, endIndex),
    pageInfo: {
        currentPage: page,
        totalItems,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: endIndex < totalItems ? page + 1 : null
    }
  };
}

export default app;
