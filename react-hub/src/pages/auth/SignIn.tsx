import { SubmitHandler, useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LinkMUI from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { userRequests } from "../../requests";

interface FormProps {
  username: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await userRequests.post("auth", data);

    const isAuthenticated = await userRequests.get("/");
    if (isAuthenticated.data.authenticated) {
      console.log(isAuthenticated.data);

      redirect("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            error={errors.username?.message === null}
            helperText={errors.username ? errors.username.message : ""}
            {...register("username", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            error={errors.password?.message === null}
            helperText={errors.password ? errors.password.message : ""}
            {...register("password", { required: true })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <LinkMUI href="#" variant="body2">
                Forgot password?
              </LinkMUI>
            </Grid>
            <Grid item>
              <Link to={"signup"}>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
