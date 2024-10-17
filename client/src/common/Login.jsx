import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
//--------------------------------------------------------------------------------------
import { startLogin } from "../actions/userActions";
//--------------------------------------------------------------------------------------
import {
  TextField,
  Typography,
  Stack,
  Paper,
  IconButton,
  Button,
  LinearProgress,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//--------------------------------------------------------------------------------------

const Login = (props) => {
  const [visible, setVisible] = useState(false);

  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required!").email("Invalid email!"),
    password: Yup.string().required("password is requried!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formData, { resetForm }) => {
      dispatch(startLogin(formData, resetForm, props));
    },
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Stack alignItems="center" p={2}>
      <Paper>
        {user.loading && <LinearProgress />}

        <Stack padding={6} spacing={3} alignItems="center">
          <LoginIcon fontSize="large" color="primary" />

          <Typography variant="h5">Login</Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} minWidth={{ sm: "270px" }} alignItems="center">
              <TextField
                type="text"
                label="email"
                name="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                type={visible ? "text" : "password"}
                label="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton onClick={toggleVisibility}>
                      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  ),
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />

              {user.loginErrors && (
                <FormHelperText error>{user.loginErrors.errors}</FormHelperText>
              )}
              <FormHelperText>
                Test creds - user1@gmail.com/Secret@123
              </FormHelperText>
              <Button type="submit" variant="contained">
                Log in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Login;
