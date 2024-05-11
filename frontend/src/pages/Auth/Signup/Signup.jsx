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
import { requestSignup } from '../../../utils/api';
import { setUserCredentials } from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import signupSchema from "../../../schemas/signupSchema";


function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector(state => state.user.userCredentials);
  const [submitError, setSubmitError] = useState('');
  const [isWaiting, SetIsWaiting] = useState(false)
  const [visibility, setVisibility] = useState(true)
  const { values, touched, handleBlur, handleChange, errors, handleReset, isValid, dirty } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });

  
  if(auth){
    return <Navigate to='/'/>
  }
  
  const handleSignup = async (event) => {
    event.preventDefault();
    SetIsWaiting(true)
    const response = await requestSignup(values);
    if (response){
      SetIsWaiting(false)
    }
    if(response.status === 201){
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
            Signup
          </Typography>
          {submitError != '' && <Alert color="danger" sx={{marginBottom: 1}}>{submitError}</Alert>}
          <form onSubmit={handleSignup} name="loginForm">
            <Stack spacing={2}>
            <FormControl>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.name && touched.name ? true : undefined}
                />
                {errors.email && (
                  <FormHelperText>{errors.name}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.username && touched.username ? true : undefined}
                />
                {errors.email && (
                  <FormHelperText>{errors.username}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
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
                  endDecorator={<IconButton variant="plain" onClick={()=> setVisibility(!visibility)}>{visibility ? <VisibilityOff/> : <Visibility/>}</IconButton>}
                  error={errors.password && touched.password ? true : undefined}
                />
                {errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type={visibility ? 'password' : 'text'}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.confirmPassword && touched.confirmPassword ? true : undefined}
                />
                {errors.password && (
                  <FormHelperText>{errors.confirmPassword}</FormHelperText>
                )}
              </FormControl>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button type="submit" disabled={!isValid || !dirty} loading={isWaiting}>Signup</Button>
                <Typography marginTop={1} level="body-sm">
              Already have an account?{" "}
                <Link onClick={()=> navigate('/login')}>Login</Link>
            </Typography>
              </Stack>
            </Stack>
          </form>
        </Sheet>
      </Grid>
    </Grid>
  );
}

export default Signup;
