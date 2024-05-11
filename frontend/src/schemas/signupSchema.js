import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/
const patternErrorMsg = 'Password must contain one lowercase, one uppercase and one number';
const signupSchema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    username: yup.string().lowercase('Username must be lowercase letters').trim('Username must not contain any spaces').required('Username is Required'),
    email: yup.string().email().required('Email is Required'),
    password: yup.string().min(8).max(25).matches(passwordPattern, patternErrorMsg).required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords Are not same!').required('Confirm Password is required'),
})
export default signupSchema