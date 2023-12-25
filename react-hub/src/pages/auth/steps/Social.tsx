// the social aspects of the school: like clubs, frats or dorms

import {
  Container,
  CssBaseline,
  Typography,
  Box,
  styled,
  InputBase,
  Input,
  TextField,
  alpha,
  Toolbar,
  Autocomplete,
} from "@mui/material";
import { RefObject } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
        <Autocomplete
          options={[]}
          renderInput={(params) => (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          )}
        />
        <Typography>
          Any clubs, frats, or groups that you may be a part of
        </Typography>
      </Box>
    </Container>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
