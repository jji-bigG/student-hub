import { Grid, Paper, Typography } from "@mui/material";

function App() {
  return (
    <Grid container>
      <Grid item>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5">Professors</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
