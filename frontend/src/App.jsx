import { CssVarsProvider } from "@mui/joy/styles";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllBlogs from "./pages/AllBlogs/AllBlogs";
import Login from './pages/Auth/Login/Login';
import Signup from "./pages/Auth/Signup/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import MyBlogs from './pages/MyBlogs/MyBlogs';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useSelector } from 'react-redux';
import useValidateLogin from "./hooks/useValidateLogin";
import Loader from "./components/Loader/Loader";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Search from "./pages/Search/Search";
import Footer from "./components/Footer/Footer";
import { CssBaseline } from "@mui/joy";

function App() {
  const isAuth = useSelector((state)=> state.user.userCredentials.auth);
  const loading = useValidateLogin();
  const appLoading = useSelector((state)=> state.app.loading);
  const themeMode = useSelector((state)=> state.app.themeMode);



  return loading ? <Loader /> :(

    <CssVarsProvider defaultMode={themeMode ? 'dark' : 'light'}>
      <CssBaseline />
      {/* Global App Loader */}
      { appLoading &&  <Loader /> } 
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="*" element={<PageNotFound />}/>
          <Route path="" element={<AllBlogs />}/>
          <Route path="search/:title" element={<Search />}/>
          <Route path="my-blogs" element={
          <ProtectedRoute isAuth={isAuth}>
            <MyBlogs />
          </ProtectedRoute>
          }/>
          <Route path='blogs/:id' element={<BlogDetails />}/>
          <Route path="/login" element={<Login authentication={isAuth}/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CssVarsProvider>
  );
}

export default App;
