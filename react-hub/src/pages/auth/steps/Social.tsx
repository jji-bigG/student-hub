// the social aspects of the school: like clubs, frats or dorms

import {
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Checkbox,
  InputAdornment,
  Grid,
  InputLabel,
} from "@mui/material";
import { RefObject } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  submitRef: RefObject<HTMLButtonElement>;
}

interface FormProps {
  dorm: string; // id of dorm: since db is stored as a ref, should store the id

  club: string; // id of club; tell this is just initial if its not there create later
}

export default function Social({ submitRef }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Container>
      <CssBaseline />
      <Typography variant="h6">Social Groups</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 2 }}
      >
        {/* <TextField
          variant="outlined"
          label="Find your group"
          fullWidth
          type="search"
        /> */}
        {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}> */}
        <Grid container>
          <Grid item xs={1}>
            <SearchIcon
              sx={{ color: "action.active", mt: 1.5, fontSize: 30 }}
            />
          </Grid>
          <Grid item xs={11}>
            <Autocomplete
              multiple
              options={campusGroups}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              // style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Campus Groups"
                  placeholder="Clubs, Frats, Study Groups, ..."
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SearchIcon />
                  //     </InputAdornment>
                  //   ),
                  // }}
                  fullWidth
                />
              )}
            />
            <InputLabel>Will be joined upon approval</InputLabel>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Box>
    </Container>
  );
}

// dummy data for the groups that can be lazy loaded based on inputs; will be extracted to a new component
const campusGroups = [
  { title: "Cornell Venture Capitals" },
  { title: "Cornell Data Science" },
  { title: "Cornell Electric Vehicles" },
];
