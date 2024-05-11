import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
export const requestLogin = async (data) => {
    let response;
    try {
        response = await api.post('/login',data);
    } catch (error) {
        return error
    }
    return response
}
export const requestSignup = async (data) => {
    let response;
    try {
        response = await api.post('/register',data);
    } catch (error) {
        return error
    }
    return response
};
export const deleteAccount = async (userId) => {
    let response;
    try {
        response = await api.delete('/delete-account/'+ userId);
    } catch (error) {
        return error
    }
    return response
};
export const requestSignout = async () => {
    let response;
    try {
        response = await api.post('/logout');
    } catch (error) {
        return error
    }
    return response
};

export const getAllBlogs = async () => {
    let response;
    try {
        response = await api.get('/blogs');
    } catch (error) {
        return error
    }
    return response
};

export const getMyBlogs = async (id) => {
    let response;
    try {
        response = await api.get('/blogs/users/' + id);
    } catch (error) {
        return error
    }
    return response
};
export const getBlogById = async (id) => {
    let response;
    try {
        response = await api.get('/blogs/' + id);
    } catch (error) {
        return error
    }
    return response
};

export const searchBlogsByTitle = async (query) => {
    let response;
    try {
        response = await api.get('/blogs/search/' + query);
    } catch (error) {
        return error
    }
    return response
};
export const updateBlog = async (data) => {
    let response;
    try {
        response = await api.put('/blogs/update', data);
    } catch (error) {
        return error
    }
    return response
};
export const createBlog = async (data) => {
    let response;
    try {
        response = await api.post('/blogs/new', data);
    } catch (error) {
        return error
    }
    return response
};

export const deleteBlog = async (id) => {
    let response;
    try {
        response = await api.delete('/blogs/'+ id);
    } catch (error) {
        return error
    }
    return response
};

export const createComment = async (comment) => {
    let response;
    try {
        response = await api.post('/comment', comment);
    } catch (error) {
        return error
    }
    return response
};
export const updateComment = async (comment) => {
    let response;
    try {
        response = await api.put('/comment/update', comment);
    } catch (error) {
        return error
    }
    return response
};
export const getBlogComments = async (id) => {
    let response;
    try {
        response = await api.get('/comment/' + id);
    } catch (error) {
        return error
    }
    return response
};

export const deleteComment = async (id) => {
    let response;
    try {
        response = await api.delete('/comment/' + id);
    } catch (error) {
        return error
    }
    return response
};