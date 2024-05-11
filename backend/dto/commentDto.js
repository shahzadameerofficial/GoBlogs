class CommentDTO {
    constructor(comment){
        this._id = comment._id;
        this.content = comment.content;
        this.blog = comment.blog;
        this.createdAt = comment.createdAt
        this.author = {
            _id: comment.author._id,
            name: comment.author.name,
            username: comment.author.username,
        }
    }
}

module.exports = CommentDTO