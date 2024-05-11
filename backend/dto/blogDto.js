const UserDTO = require("./userDto");
class BlogDTO{
    constructor(blog){
        this._id = blog._id;
        this.author = new UserDTO(blog.author)
        this.content = blog.content;
        this.title = blog.title;
        this.photo = blog.photoPath;
        this.createdAt = blog.createdAt;
    }
}

module.exports = BlogDTO