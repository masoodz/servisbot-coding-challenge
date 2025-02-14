import { useEffect, useState } from "react";
import {
  fetchBots,
  fetchWorkersForBot,
  fetchLogsForBot,
  fetchLogsForWorker,
} from "../api/api";
import { Bot, Worker, Log } from "../types";
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [bots, setBots] = useState<Bot[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [selectedBotName, setSelectedBotName] = useState<string | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const [botPage, setBotPage] = useState(1);
  const [botPageSize, setBotPageSize] = useState(10);
  const [botTotal, setBotTotal] = useState(0);

  const [workerPage, setWorkerPage] = useState(1);
  const [workerPageSize, setWorkerPageSize] = useState(10);
  const [workerTotal, setWorkerTotal] = useState(0);

  const [logPage, setLogPage] = useState(1);
  const [logPageSize, setLogPageSize] = useState(10);
  const [logTotal, setLogTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBots(botPage, botPageSize)
      .then((response) => {
        setBots(response.data.data);
        setBotTotal(response.data.pageInfo.totalItems);
      })
      .catch((error) => console.error("Error fetching bots:", error))
      .finally(() => setLoading(false));
  }, [botPage, botPageSize]);

  useEffect(() => {
    if (selectedBotId) {
      setLoading(true);
      fetchWorkersForBot(selectedBotId, workerPage, workerPageSize)
        .then((response) => {
          setWorkers(response.data.data);
          setWorkerTotal(response.data.pageInfo.totalItems);
        })
        .catch((error) => console.error("Error fetching workers:", error))
        .finally(() => setLoading(false));

      fetchLogsForBot(selectedBotId, logPage, logPageSize)
        .then((response) => {
          setLogs(response.data.data);
          setLogTotal(response.data.pageInfo.totalItems);
        })
        .catch((error) => console.error("Error fetching bot logs:", error))
        .finally(() => setLoading(false));

      const selectedBot = bots.find((bot) => bot.id === selectedBotId);
      setSelectedBotName(selectedBot ? selectedBot.name : null);
    }
  }, [selectedBotId, workerPage, workerPageSize, logPage, logPageSize, bots]);

  useEffect(() => {
    if (selectedWorkerId) {
      setLoading(true);
      fetchLogsForWorker(selectedWorkerId, logPage, logPageSize)
        .then((response) => {
          setLogs(response.data.data);
          setLogTotal(response.data.pageInfo.totalItems);
        })
        .catch((error) => console.error("Error fetching worker logs:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedWorkerId, logPage, logPageSize]);

  const botColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: isMobile ? 150 : 250 },
    { field: "name", headerName: "Name", width: isMobile ? 120 : 150 },
    { field: "status", headerName: "Status", width: isMobile ? 100 : 120 },
    {
      field: "created",
      headerName: "Created",
      width: isMobile ? 150 : 180,
      valueGetter: (value) =>
        value ? new Date(value).toLocaleString() : "N/A",
    },
  ];

  const workerColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    {
      field: "created",
      headerName: "Created",
      width: 180,
      valueGetter: (value) =>
        value ? new Date(value).toLocaleString() : "N/A",
    },
  ];

  const logColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "message", headerName: "Message", width: 400 },
    {
      field: "created",
      headerName: "Created",
      width: 180,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{ marginTop: 3, marginBottom: 2, textAlign: "center" }}
      >
        Bot Management Dashboard
      </Typography>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        sx={{ marginTop: 3, marginBottom: 2, textAlign: "center" }}
      >
        Select a row to learn more
      </Typography>

      {loading && (
        <CircularProgress
          sx={{ display: "block", margin: "0 auto", marginBottom: 2 }}
        />
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ padding: isMobile ? 1 : 2 }}>
            <Typography variant="h6">Bots</Typography>
            <Box sx={{ height: isMobile ? 300 : 400 }}>
              <DataGrid
                rows={bots}
                columns={botColumns}
                paginationMode="server"
                pageSizeOptions={[10, 20, 50]}
                rowCount={botTotal}
                paginationModel={{ page: botPage - 1, pageSize: botPageSize }}
                onPaginationModelChange={(newModel) => {
                  setBotPage(newModel.page + 1);
                  setBotPageSize(newModel.pageSize);
                }}
                onRowClick={(params) => {
                  setSelectedBotId(params.row.id);
                  setSelectedBotName(params.row.name);
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {selectedBotId && (
          <Grid item xs={12}>
            <Paper sx={{ padding: isMobile ? 1 : 2 }}>
              <Typography variant="h6">
                Workers for Bot: {selectedBotName} (ID: {selectedBotId})
              </Typography>
              <Box sx={{ height: isMobile ? 300 : 400 }}>
                <DataGrid
                  rows={workers}
                  columns={workerColumns}
                  paginationMode="server"
                  pageSizeOptions={[10, 20, 50]}
                  rowCount={workerTotal}
                  paginationModel={{
                    page: workerPage - 1,
                    pageSize: workerPageSize,
                  }}
                  onPaginationModelChange={(newModel) => {
                    setWorkerPage(newModel.page + 1);
                    setWorkerPageSize(newModel.pageSize);
                  }}
                  onRowClick={(params) => setSelectedWorkerId(params.row.id)}
                />
              </Box>
            </Paper>
          </Grid>
        )}

        {(selectedWorkerId || selectedBotId) && (
          <Grid item xs={12}>
            <Paper sx={{ padding: isMobile ? 1 : 2 }}>
              <Typography variant="h6">
                Logs for{" "}
                {selectedWorkerId
                  ? `Worker ID: ${selectedWorkerId}`
                  : `Bot: ${selectedBotName} (ID: ${selectedBotId})`}
              </Typography>
              <Box sx={{ height: isMobile ? 300 : 400 }}>
                <DataGrid
                  rows={logs}
                  columns={logColumns}
                  paginationMode="server"
                  pageSizeOptions={[10, 20, 50]}
                  rowCount={logTotal}
                  paginationModel={{ page: logPage - 1, pageSize: logPageSize }}
                  onPaginationModelChange={(newModel) => {
                    setLogPage(newModel.page + 1);
                    setLogPageSize(newModel.pageSize);
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
