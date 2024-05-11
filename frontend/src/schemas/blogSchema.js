import * as yup from 'yup';

const blogSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required(),
    photo: yup.string().required()
})
export default blogSchema