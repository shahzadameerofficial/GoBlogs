const Joi = require('joi');
const mongoDbIdPattern = /^[0-9a-fA-F]{24}$/;
const Comment = require('../models/comment');
const CommentDTO = require('../dto/commentDto')

const commentController = {
    async createComment(req, res, next){
        const commentSchema = Joi.object({
            content: Joi.string().required(),
            author: Joi.string().regex(mongoDbIdPattern).required(),
            blog: Joi.string().regex(mongoDbIdPattern).required(),
        })

        const {error} = commentSchema.validate(req.body);

        if(error){
            return next(error)
        }
        const {content, author, blog} = req.body;

        try {
            const newComment = new Comment({
                content,author,blog
            });
            await newComment.save()
        } catch (error) {
            return next(error)
        }
        return res.status(201).json({message: 'Comment Create Successful'})
    },
    async updateComment(req, res, next){
        const updateCommentSchema = Joi.object({
            content: Joi.string().required(),
            author: Joi.string().regex(mongoDbIdPattern).required(),
            blog: Joi.string().regex(mongoDbIdPattern).required(),
            _id: Joi.string().regex(mongoDbIdPattern).required(),
        });
        
        const { error } = updateCommentSchema.validate(req.body)
        
        if (error) {
            return next(error)
        }
        const { content, _id } = req.body;
        let comment;
        try {
            comment = await Comment.findOne({ _id })
            await Comment.updateOne({_id},{content});
        } catch (error) {
            return next(error)
        }
        return res.status(200).json({message: 'Comment Update Successful'})
    },
    async getBlogComments(req, res, next){
        const getBlogCommentsSchema = Joi.object({
            id: Joi.string().regex(mongoDbIdPattern).required()
        })

        const {error} = getBlogCommentsSchema.validate(req.params);

        if(error){
            return next(error)
        }

        const {id} = req.params

        let comment;

        try {
            comment = await Comment.find({blog:id}).populate('author')
        } catch (error) {
            return next(error)
        }
        let commentsDto = [];
        for (let index = 0; index < comment.length; index++) {
            const element = new CommentDTO(comment[index]);
            commentsDto.push(element)
            
        }
        return res.status(200).json({comment: commentsDto})
    },
    async deleteCommentById(req, res, next){
        const deleteCommentByIdSchema = Joi.object({
            id: Joi.string().regex(mongoDbIdPattern).required()
        })

        const {error} = deleteCommentByIdSchema.validate(req.params);
        if(error){
            return next(error)
        }

        const {id} = req.params;

        try {
            await Comment.deleteOne({_id: id})
        } catch (error) {
            return next(error)
        }

        return res.status(200).json({message: 'Comment Delete Successful'})
    }
}

module.exports =  commentController