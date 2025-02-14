import React, { useCallback, useEffect, useState } from "react";
import { fetchBots, fetchWorkersForBot, fetchLogsForWorker } from "../api/api";
import { Bot, Worker, Log } from "../types";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

interface PaginationInfo {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
}

const Dashboard: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [botPagination, setBotPagination] = useState<PaginationInfo | null>(
    null
  );
  const [workerPagination, setWorkerPagination] =
    useState<PaginationInfo | null>(null);
  const [logPagination, setLogPagination] = useState<PaginationInfo | null>(
    null
  );
  const [selectedBotId, setSelectedBotId] = useState<string>("");
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>("");

  const fetchPage = useCallback(
    async (dataType: string, page?: number) => {
      if (page === null) return; 
      const limit = 10; 
      try {
        let response;
        switch (dataType) {
          case "bots":
            response = await fetchBots(page, limit);
            setBots(response.data.data);
            setBotPagination(response.data.pageInfo);
            console.log(response.data.pageInfo);
            break;
          case "workers":
            if (!selectedBotId) return; 
            response = await fetchWorkersForBot(selectedBotId, page, limit);
            setWorkers(response.data.data);
            console.log(response.data.pageInfo);
            setWorkerPagination(response.data.pageInfo);
            break;
          case "logs":
            if (!selectedWorkerId) return;
            response = await fetchLogsForWorker(selectedWorkerId, page, limit);
            setLogs(response.data.data);
            console.log(response.data.pageInfo);
            setLogPagination(response.data.pageInfo);
            break;
          default:
            console.error("Invalid data type specified");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
    [selectedBotId, selectedWorkerId]
  );

  useEffect(() => {
    fetchBots()
      .then((response) => {
        setBots(response.data.data);
        setBotPagination(response.data.pageInfo);
      })
      .catch((error) => console.error("Failed to fetch bots:", error));
  }, []);

  useEffect(() => {
    if (selectedBotId) {
      fetchWorkersForBot(selectedBotId)
        .then((response) => {
          setWorkers(response.data.data);
          setWorkerPagination(response.data.pageInfo);
        })
        .catch((error) => console.error("Failed to fetch workers:", error));
    }
  }, [selectedBotId]);

  useEffect(() => {
    if (selectedWorkerId) {
      fetchLogsForWorker(selectedWorkerId)
        .then((response) => {
          setLogs(response.data.data);
          setLogPagination(response.data.pageInfo);
        })
        .catch((error) =>
          console.error("Failed to fetch logs for worker:", error)
        );
    }
  }, [selectedWorkerId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Bots</Typography>
            <List>
              {bots.map((bot) => (
                <ListItem key={bot.id} onClick={() => setSelectedBotId(bot.id)}>
                  <ListItemText
                    primary={bot.name}
                    secondary={`Status: ${bot.status}`}
                  />
                </ListItem>
              ))}
            </List>
            {botPagination && (
              <div>
                <Button
                  onClick={() => fetchPage("bots", botPagination.prevPage!)}
                  disabled={!botPagination.prevPage}
                >
                  Prev
                </Button>
                <Button
                  onClick={() => fetchPage("bots", botPagination.nextPage!)}
                  disabled={!botPagination.nextPage}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Workers of Selected Bot</Typography>
            <List>
              {workers.map((worker) => (
                <ListItem
                  key={worker.id}
                  onClick={() => setSelectedWorkerId(worker.id)}
                >
                  <ListItemText primary={worker.name} />
                </ListItem>
              ))}
            </List>
            {workerPagination && (
              <div>
                <Button
                  onClick={() =>
                    fetchPage("workers", workerPagination.prevPage!)
                  }
                  disabled={!workerPagination.prevPage}
                >
                  Prev
                </Button>
                <Button
                  onClick={() =>
                    fetchPage("workers", workerPagination.nextPage!)
                  }
                  disabled={!workerPagination.nextPage}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Logs</Typography>
            <List>
              {logs.map((log) => (
                <ListItem key={log.id}>
                  <ListItemText
                    primary={log.message}
                    secondary={`Created: ${new Date(
                      log.created
                    ).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
            {logPagination && (
              <div>
                <Button
                  onClick={() => fetchPage("logs", logPagination.prevPage!)}
                  disabled={!logPagination.prevPage}
                >
                  Prev
                </Button>
                <Button
                  onClick={() => fetchPage("logs", logPagination.nextPage!)}
                  disabled={!logPagination.nextPage}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
