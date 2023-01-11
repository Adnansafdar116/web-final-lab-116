const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/posts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.get('/posts', (req, res) => {
    // Get page number from query string


    const page = req.query.page || 1;


    // Get number of items per page
    const limit = req.query.limit || 10;


    // Skip value for pagination
    const skip = (page - 1) * limit;


    // Find the posts from the MongoDB collection
    Post.find().skip(skip).limit(limit).exec((err, posts) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        }
        res.json(posts);
    });
});

// Some mock data into the MongoDB
const mockData = [
    { title: 'waste1', content: 'LAB exam' },
    { title: 'print', content: 'hard work' },
    { title: 'post3', content: 'rendering ' },

];


mockData.forEach(data => {
    const post = new Post(data);
    post.save();
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});


