import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { RefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { userRequests } from "../../../requests";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Props {
  submitRef: RefObject<HTMLButtonElement>;
  nextStep: VoidFunction;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const schema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),

    username: z.string().min(1, "Required"),
    email: z.string().email("Not a valid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

type FormProps = z.infer<typeof schema>;

export default function BasicInfo({ submitRef, nextStep, setError }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormProps>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    if (isValid)
      userRequests
        .post("/", data)
        .then((resp) => {
          // console.log("Response in register user: ", resp);
          nextStep();
        })
        .catch((e) => {
          console.log("Error in register user: ", e);
          setError("Registration Rejected by Server.");
        });
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
              error={errors.firstName?.message != null}
              helperText={errors.firstName ? errors.firstName.message : ""}
              {...register("firstName")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              variant="filled"
              label="Last Name"
              required
              error={errors.lastName?.message != null}
              helperText={errors.lastName ? errors.lastName.message : ""}
              {...register("lastName")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Username"
              required
              error={errors.username?.message != null}
              helperText={
                errors.username
                  ? errors.username.message
                  : "Username must be unique."
              }
              {...register("username")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Email"
              required
              error={errors.email?.message != null}
              helperText={errors.email?.message}
              {...register("email")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Password"
              type="password"
              required
              error={errors.password?.message != null}
              helperText={errors.password ? errors.password.message : ""}
              {...register("password")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="filled"
              label="Confirm Password"
              type="password"
              required
              error={errors.confirmPassword?.message != null}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
              {...register("confirmPassword")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
