class BlogDetailsDTO {
    constructor(blog){
        this._id = blog._id;
        this.content = blog.content;
        this.title = blog.title;
        this.photo = blog.photoPath;
        this.author = {
            _id: blog.author._id,
            name: blog.author.name,
            username: blog.author.username
        },
        this.createdAt = blog.createdAt;
        this.updatedAt = blog.updatedAt;
    }
}

module.exports = BlogDetailsDTO