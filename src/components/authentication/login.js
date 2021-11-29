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
import Container from "@material-ui/core/Container";
import { Formik } from "formik";
import { UserContext } from "../../providers/userContext";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Input } from "@material-ui/core";
import clsx from "clsx";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const userService = React.useContext(UserContext);

  const history = useHistory();
  const [value, setValue] = React.useState(" ");
  const loginForm = {
    email: "",
    
    password: "",
  };
  const handleClickShowPassword = () => {
    setValue({ ...value, showPassword: !value.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onFormSubmit = (formdata, { setSubmitting }) => {
    console.log(formdata);
    setSubmitting = true;
    userService.getUserByEmail(formdata.email).then((userdata) => {
      if (userdata) {
        if (userdata["password"] === formdata["password"]) {
          Swal.fire({
            icon: "success",
            title: "Great!",
            text: "Successfully Loggedin",
          }).then(() => {
            userService.setLoggedin(true);
            sessionStorage.setItem("user", JSON.stringify(userdata));
            userService.setCurrentUser(userdata);

            if (userdata["isadmin"]) {
              history.push("/admin");
            } else {
              history.push("/user");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Email and Password does't match",
          });
        }
      }
    });
    userService.getUserByPhone(formdata.phone_no).then((userdata) => {
      if (userdata) {
        if (userdata["password"] === formdata["password"]) {
          Swal.fire({
            icon: "success",
            title: "Great!",
            text: "Successfully Loggedin",
          }).then(() => {
            userService.setLoggedin(true);
            sessionStorage.setItem("user", JSON.stringify(userdata));
            userService.setCurrentUser(userdata);

            if (userdata["isadmin"]) {
              history.push("/admin");
            } else {
              history.push("/user");
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops!",
            text: "Phone and Password does't match",
          });
        }
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik initialValues={loginForm} onSubmit={onFormSubmit}>
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={handleChange}
                value={values.email}
                
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {/* <Grid>
                <TextField
                  reuired
                  name="phone_no"
                  label="phone_no"
                  onChange={handleChange}
                  autofocus
                  value={values.phone_no}
                />
              </Grid> */}
              <Grid>
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/main/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/main/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Login;
