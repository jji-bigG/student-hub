// for the student's school information

import {
  Autocomplete,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { LegacyRef, RefObject } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  submitRef: RefObject<HTMLButtonElement>;
}

interface FormProps {
  university: string;
  college: string;
  major: string;

  studentID: string;
}

export default function College({ submitRef }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data);

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h6">Student & School Information</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2 }}
      >
        <button style={{ display: "none" }} type="submit" ref={submitRef} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              options={[{ label: "Cornell University" }]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="University"
                  fullWidth
                  required
                  autoFocus
                  {...register("university", { required: true })}
                />
              )}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              {...register("college", { required: true })}
              label="College"
              variant="standard"
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="standard"
              label="Student ID"
              {...register("studentID")}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
