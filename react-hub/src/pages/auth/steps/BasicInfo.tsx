import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { LegacyRef, RefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { userRequests } from "../../../requests";

interface Props {
  submitRef: RefObject<HTMLButtonElement>;
  nextStep: VoidFunction;
}

interface FormProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function BasicInfo({ submitRef, nextStep }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    userRequests.post("/", data);
  };

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h6">New user instance</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2, alignContent: "center" }}
      >
        <button style={{ display: "none" }} type="submit" ref={submitRef} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoFocus
              variant="filled"
              label="First Name"
              required
              error={errors.firstName?.message === null}
              helperText={errors.firstName ? errors.firstName.message : ""}
              {...register("firstName", { required: true })}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="filled"
              label="Last Name"
              required
              error={errors.lastName?.message === null}
              helperText={errors.lastName ? errors.lastName.message : ""}
              {...register("lastName", { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Username"
              required
              error={errors.username?.message === null}
              helperText={
                errors.username
                  ? errors.username.message
                  : "Username cannot be changed."
              }
              {...register("username", { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              required
              error={errors.email?.message === null}
              helperText={errors.email ? errors.email.message : ""}
              {...register("email", { required: true })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Password"
              required
              error={errors.password?.message === null}
              helperText={errors.password ? errors.password.message : ""}
              {...register("password", { required: true })}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
