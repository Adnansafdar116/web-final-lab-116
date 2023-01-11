// Create a Mongoose schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// Create a Mongoose model for the posts
const Post = mongoose.model('Post', postSchema);

module.exports = Post;