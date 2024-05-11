/* eslint-disable react/no-unescaped-entities */
import {
  Grid,
  Input,
  Stack,
  Button,
  IconButton ,
  Typography,
  Sheet,
  Link,
  FormControl,
  FormHelperText,
  Alert
} from "@mui/joy";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import loginSchema from "../../../schemas/loginSchema";
import { requestLogin } from '../../../utils/api';
import { setUserCredentials } from "../../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';


// eslint-disable-next-line react/prop-types
function Login({authentication}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitError, setSubmitError] = useState('');
  const [isWaiting, SetIsWaiting] = useState(false)
  const [visibility, setVisibility] = useState(true)
  const { values, touched, handleBlur, handleChange, errors, handleReset, isValid, dirty } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  // For Handling Login
  const handleLogin = async (event) => {
    event.preventDefault();
    SetIsWaiting(true)
    const response = await requestLogin(values);
    if(response){
      SetIsWaiting(false)
    }
    if(response.status === 200){
      handleReset()
      setSubmitError('')
      const {_id, name, email} = response.data.user
      const credentials = {
        name,
        _id,
        email,
        auth: response.data.auth
      }
      dispatch(setUserCredentials(credentials))
    }else if(response.code === 'ERR_BAD_REQUEST'){
      setSubmitError(response.response.data.message)
    }
  };

  if (authentication) {
    return (
      <Navigate to='/'/>
    )
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{ flexGrow: 1 }}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Grid xs={10} sm={8} md={6} lg={4}>
        <Sheet variant="soft" color="nuetral" sx={{ p: 2, borderRadius: 5 }}>
          <Typography level="h2" textAlign="center" marginBottom={3}>
            Login
          </Typography>
          {submitError != '' && <Alert color="danger" sx={{marginBottom: 1}}>{submitError}</Alert>}
          <form onSubmit={handleLogin} name="loginForm">
            <Stack spacing={2}>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  startDecorator={<EmailIcon/>}
                  onChange={handleChange}
                  error={errors.email && touched.email ? true : undefined}
                />
                {errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Password"
                  type={visibility ? 'password' : 'text'}
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  startDecorator={<KeyIcon/>}
                  endDecorator={<IconButton variant="plain" onClick={()=> setVisibility(!visibility)}>{visibility ? <VisibilityOff/> : <Visibility/>}</IconButton>}
                  error={errors.password && touched.password ? true : undefined}
                />
                {errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button type="submit" disabled={!isValid || !dirty} loading={isWaiting}>Login</Button>
                  <Link fontSize={14} onClick={()=> navigate('/forgot-password')}>Forgot Password?</Link>
              </Stack>
            </Stack>
            <Typography marginTop={1} level="body-sm">
              Don't have an account?{" "}
                <Link onClick={()=> navigate('/signup')}>Create One</Link>
            </Typography>
          </form>
        </Sheet>
      </Grid>
    </Grid>
  );
}

export default Login;
