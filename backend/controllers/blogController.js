const Joi = require('joi');
const fs = require('fs');
const Blog = require('../models/blog');
const BlogDTO = require('../dto/blogDto');
const BlogDetailsDTO = require('../dto/blogDetailsDto');
const Comment = require('../models/comment');
const storageUtilities = require('../utilities/storageUtilities')
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/

const blogController = {
    async createBlog(req, res, next) {
        // STEPS
        // Validate Request Body
        // Handle Photo Storage >> Get a Converted Image type of b64 from client
        // Add to Database
        // Return Response

        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            author: Joi.string().regex(mongoDbIdPattern).required(),
            content: Joi.string().required(),
            photo: Joi.string().required(),
        });

        const { error } = createBlogSchema.validate(req.body);

        if (error) {
            return next(error)
        }
        const { title, author, content, photo } = req.body;

        const imagePath = storageUtilities.saveImage(photo, author);
        if (!imagePath) {
            return next(imagePath)
        }
        let newBlog
        try {
            newBlog = new Blog({
                title,
                author,
                content,
                photoPath: imagePath
            })

            await newBlog.save();
        } catch (error) {
            return next(error)
        }

        const blogDto = new BlogDTO(newBlog)
        return res.status(201).json({ blog: blogDto, message: 'Blog Created Successfully' })
    },
    async getAllBlogs(req, res, next) {
        try {
            const blogs = await Blog.find({}).populate('author');
            let allBlogs = []
            for (const blog of blogs) {
                const dto = new BlogDTO(blog);
                allBlogs.unshift(dto)
            }
            return res.status(200).json({ blogs: allBlogs })
        } catch (error) {
            return next(error)
        }
    },
    async getBlogsByTitle(req, res, next){
        const searchBlogByTitle = Joi.object({
            title: Joi.string().required()
        })
        const { error } = searchBlogByTitle.validate(req.params);

        if (error) {
            return next(error)
        }

        const { title } = req.params

        try {
            const blogs = await Blog.find({}).populate('author');

            const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(title.toLowerCase()))

            let allBlogs = []
            for (const blog of filteredBlogs) {
                const dto = new BlogDTO(blog);
                allBlogs.unshift(dto)
            }
            return res.status(200).json({ blogs: allBlogs })
        } catch (error) {
            return next(error)
        }
    },
    async getBlogsByUser(req, res, next){
        const getByUserSchema = Joi.object({
            id: Joi.string().regex(mongoDbIdPattern).required()
        })
        const { error } = getByUserSchema.validate(req.params);

        if (error) {
            return next(error)
        }
        
        const { id } = req.params
        try {
            const blogs = await Blog.find({author: id});
            let allBlogs = []
            for (const blog of blogs) {
                const dto = new BlogDTO(blog);
                allBlogs.push(dto)
            }
            return res.status(200).json({ blogs: allBlogs })
        } catch (error) {
            return next(error)
        }
    },async getBlogById(req, res, next) {
        // Valid id
        // response

        const getByIdSchema = Joi.object({
            id: Joi.string().regex(mongoDbIdPattern).required()
        })

        const { error } = getByIdSchema.validate(req.params);

        if (error) {
            return next(error)
        }

        let blog;
        const { id } = req.params
        try {
            blog = await Blog.findOne({ _id: id }).populate('author')
        } catch (error) {
            return next(error)
        }
        const blogDto = new BlogDetailsDTO(blog);
        return res.status(200).json({ blog: blogDto })
    },
    async updateBlog(req, res, next) {
        const updateBlogSchema = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            author: Joi.string().regex(mongoDbIdPattern).required(),
            blogId: Joi.string().regex(mongoDbIdPattern).required(),
            photo: Joi.any()
        });
        
        const { error } = updateBlogSchema.validate(req.body)
        if (error) {
            return next(error)
        }
        
        const { title, content, author, blogId, photo } = req.body;

        let blog;
        try {
            blog = await Blog.findOne({ _id: blogId })
        } catch (error) {
            return next(error)
        }

        if (photo) {
            const imagePath = storageUtilities.updateImage(blog.photoPath, photo, author);

            await Blog.updateOne({ _id: blogId }, {
                title, content, photoPath: imagePath
            })
        }else{
            await Blog.updateOne({_id: blogId},{title, content});
        }
        return res.status(200).json({message: 'Blog Updated Successfully'})
    },
    async deleteBlog(req, res, next) { 
        // validate id
        // delete blog
        // delete blog comments

        const deleteBlogSchema = Joi.object({
            id: Joi.string().regex(mongoDbIdPattern).required()
        })

        const {error} = deleteBlogSchema.validate(req.params)

        if(error){
            return next(error)
        }

        const {id} = req.params

        // deleting blogs & comments

        try {
            await Blog.deleteOne({_id: id});
            await Comment.deleteMany({blog: id})
        } catch (error) {
            return next(error)
        }

        return res.status(200).json({message: 'Blog Deleted Successfully'})
    },

}
module.exports = blogController