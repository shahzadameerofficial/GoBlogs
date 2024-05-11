/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { UploadFile } from "@mui/icons-material";
import { Transition } from "react-transition-group";
import {
  ModalClose,
  DialogTitle,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalDialog,
  DialogContent,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { createBlog, updateBlog } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import TextEditor from "../TextEditor/TextEditor";
import { setHTMLContent } from "../../store/slices/appSlice";
import blogSchema from "../../schemas/blogSchema";
import { useFormik } from "formik";
import FloatingAlert from "../FloatingAlert/FloatingAlert";

function EditBlog({ blog, mode, openModal, onComplete }) {
  const { _id } = useSelector((state) => state.user.userCredentials);
  const { htmlContent, imgPlaceholder, defaultAlert } = useSelector(
    (state) => state.app
  );
  const dispatch = useDispatch();
  const [placeholder, SetPlaceholder] = useState(undefined);
  const [alert, setAlert] = useState(defaultAlert);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetAlert = () => {
    setAlert(defaultAlert);
  };

  const showAlert = (newAlert) => {
    setAlert({ ...alert, ...newAlert });
  };

  const { values, touched, handleBlur, handleChange, errors, setValues } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        photo: "",
      },
      validationSchema: blogSchema,
    });

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    if (mode === "edit") {
      const updatedBlog = {
        blogId: blog._id,
        author: _id,
        content: htmlContent,
        title: values.title,
        photo: blog.photo === placeholder ? null : placeholder,
      };
      const response = await updateBlog(updatedBlog);
      if (response.status === 200) {
        e.target.reset();
        onComplete(false);
        showAlert({
          visible: true,
          heading: response.code,
          message: response.data.message,
          duration: 4000,
          color: "success",
        });
    setIsSubmitting(false)
      }else if(response.code === 'ERR_BAD_REQUEST'){
        showAlert({
          visible: true,
          heading: response.code,
          message: response.response.data.message,
          duration: 4000,
          color: "danger",
        });
    setIsSubmitting(false)
      }
    } else {
      const newBlog = {
        title: e.target.title.value,
        content: htmlContent,
        photo: placeholder,
        author: _id,
      };
      const response = await createBlog(newBlog);
      if (response.status === 201) {
        e.target.reset();
        onComplete(false);
        console.log(response);
        showAlert({
          visible: true,
          heading: response.code,
          message: response.data.message,
          duration: 4000,
          color: "success",
        });
        
    setIsSubmitting(false)
      } else if (response.code === "ERR_BAD_REQUEST") {
        showAlert({
          visible: true,
          heading: response.code,
          message: response.response.data.message,
          duration: 4000,
          color: "danger",
        });
        
    setIsSubmitting(false)
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        SetPlaceholder(event.target.result);
      };
    }
  };
  const handleBlogContent = (e) => {
    dispatch(setHTMLContent(e.toString()));
  };

  useEffect(() => {
    SetPlaceholder(blog?.photo || placeholder);
    if (blog && openModal) {
      setValues({ title: blog?.title, content: blog?.content });
    }
  }, [openModal]);

  return (
    <>
      <FloatingAlert alert={alert} onComplete={resetAlert} />
      <Transition in={openModal} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={() => onComplete(false)}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(8px)" },
                    entered: { opacity: 1, backdropFilter: "blur(8px)" },
                  }[state],
                },
              },
            }}
            sx={{
              visibility: state === "exited" ? "hidden" : "visible",
            }}
          >
            <ModalDialog
              layout="center"
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
              }}
            >
              <ModalClose />
              <DialogTitle>
                {mode === "edit" ? "Update Blog" : "New Blog"}
              </DialogTitle>
              <DialogContent sx={{ p: 2 }}>
                <form onSubmit={handleBlogSubmit}>
                  <label htmlFor="photo" style={{ cursor: "pointer" }}>
                    <input
                      type="file"
                      id="photo"
                      style={{ opacity: "0" }}
                      name="photo"
                      accept="image/*"
                      value={values.photo}
                      onBlur={handleBlur}
                      onChange={handleFileChange}
                    />
                    <img
                      src={placeholder ? placeholder : imgPlaceholder}
                      alt=""
                      width="100%"
                    />
                    <UploadFile sx={{ translate: "0 4px" }} />
                    Upload File
                  </label>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={errors.title && touched.title ? true : undefined}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Content</FormLabel>
                    <TextEditor
                      name="content"
                      onInput={handleBlogContent}
                      value={values.content}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <Button type="submit" sx={{ mt: 1 }} disabled={isSubmitting}>
                    {mode === "edit" ? "Update Blog" : "Create"}
                  </Button>
                </form>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </>
  );
}

export default EditBlog;
