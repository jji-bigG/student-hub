import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FormProps {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export default function BasicInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data);

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h6">Create a new user instance</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          autoFocus
          sx={{ my: 1 }}
          variant="filled"
          label="First Name"
          required
          error={errors.firstName?.message === null}
          helperText={errors.firstName ? errors.firstName.message : ""}
          {...register("firstName", { required: true })}
        />
        <TextField
          sx={{ my: 1 }}
          variant="filled"
          label="Last Name"
          required
          error={errors.lastName?.message === null}
          helperText={errors.lastName ? errors.lastName.message : ""}
          {...register("lastName", { required: true })}
        />

        <TextField
          fullWidth
          sx={{ my: 1 }}
          variant="filled"
          label="Username"
          required
          error={errors.username?.message === null}
          helperText={
            errors.username
              ? errors.username.message
              : "Username cannot be changed."
          }
          {...register("email", { required: true })}
        />

        <TextField
          fullWidth
          sx={{ my: 1 }}
          variant="filled"
          label="Email"
          required
          error={errors.email?.message === null}
          helperText={errors.email ? errors.email.message : ""}
          {...register("email", { required: true })}
        />
        <TextField
          fullWidth
          sx={{ my: 1 }}
          variant="filled"
          label="Password"
          required
          error={errors.password?.message === null}
          helperText={errors.password ? errors.password.message : ""}
          {...register("password", { required: true })}
        />
      </Box>
    </Container>
  );
}
