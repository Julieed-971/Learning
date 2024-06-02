import express, { response } from 'express';
const router = express.Router();

let posts = [
    { id: 1, title: 'Charisma' },
    { id: 2, title: 'Uniqness' },
    { id: 3, title: 'Nerve' },
    { id: 4, title: 'Talent' },
];

// Get all posts
router.get('/', (request, response) => {
    const limit = parseInt(request.query.limit);

    if (!isNaN(limit) && limit > 0) {
        return response.status(200).json(posts.slice(0, limit));
    }
    response.status(200).json(posts);
});

// Get single posts
router.get('/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const post = posts.find((post) => post.id === id);
    
    if (!post) {
        return response
        .status(404)
        .json({ message: `A post with the id of ${id} was not found` });
    } 
    response.status(200).json(post); 
});

// Create new post
router.post('/', (request, response) => {
    const newPost = {
        id: posts.length + 1,
        title: request.body.title
    };
    if (!newPost.title) {
        return response.status(400).json({ message: 'Please include a title'});
    }
    posts.push(newPost);
    response.status(201).json(posts);
});

export default router;