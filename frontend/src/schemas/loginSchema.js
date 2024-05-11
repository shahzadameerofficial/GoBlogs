import * as yup from 'yup';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/
const patternErrorMsg = 'Password must contain one lowercase, one uppercase and one number';
const loginSchema = yup.object().shape({
    email: yup.string().email().required('Email is Required'),
    password: yup.string().min(8).max(25).matches(passwordPattern, patternErrorMsg).required('Password is Required'),
})
export default loginSchema