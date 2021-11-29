import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { UserContext } from "../../providers/userContext";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Input } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { useState } from "react";

const interests = [
  {
    value: "Thriller",
    label: "Thriller",
  },
  {
    value: "Horror",
    label: "Horror",
  },
  {
    value: "Action",
    label: "Action",
  },
  {
    value: "Comedy",
    label: "Comedy",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  label: { marginBottom: 8 },
  day: {
    width: 56,
  },
  month: {
    width: 56,
  },
  year: {
    width: 72,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "",
  },
}));
const Register = () => {
  const classes = useStyles();
  const userService = React.useContext(UserContext);
  const history = useHistory();
  const [value, setValue] = React.useState(" ");
  const [interest, setInterest] = React.useState(" ");
  const [imgpath, setImgPath] = useState("");
  const [avatar, setAvatar] = useState("");

  const registerForm = {
    fullname: "",
    email: "",
    password: "",
    interests: [],
    age: 0,
    phone_no: "",
    isadmin: false,
    showPassword: false,
  };
  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValue({ ...value, showPassword: !value.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClick = (event) => {
    setInterest(event.target.value);
  };

  const onFormSubmit = (value, { setSubmitting }) => {
    console.log(value);
    setSubmitting = true;
    value["avatar"] = avatar;
    userService.addUser(value).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have Successfully Logged in",
      });
      history.push("/main/login");
    });
  };

  const showAvatar = () => {
    if (imgpath) {
      return <img src={imgpath} className="img-fluid" />;
    }
  };

  const uploadImage = (event) => {
    const data = new FormData();
    data.append("image", event.target.files[0]);
    setAvatar(event.target.files[0].name);
    userService.uploadImage(data).then((res) => console.log(res));

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // erroMsg = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setImgPath(reader.result);
    };
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Formik initialValues={registerForm} onSubmit={onFormSubmit}>
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="fullname"
                    onChange={handleChange}
                    value={values.fullname}
                    required
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  id="phone_no"
                  label="phone_no"
                  name="phone_no"
                  onChange={handleChange}
                  value={values.phone_no}
                />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className="w-100">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      required
                      fullwidth
                      id="standard-adornment-password"
                      type={value.showPassword ? "text" : "password"}
                      value={value.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {value.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Select"
                    value={value.interests}
                    onChange={handleClick}
                    helperText="Please select your interests"
                    variant="filled"
                  >
                    {interests.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <br />
                <Grid item xs={12} sm={6}>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="date"
                      label="Birthday"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Grid>
                <div className={classes.root}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={uploadImage}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  {showAvatar()}
                </div>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive regular updates of new podcasts uploaded via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/main/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
};
export default Register;
