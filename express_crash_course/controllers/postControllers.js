let posts = [
  { id: 1, title: 'Charisma' },
  { id: 2, title: 'Uniqness' },
  { id: 3, title: 'Nerve' },
  { id: 4, title: 'Talent' },
];

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = (request, response, next) => {
  const limit = parseInt(request.query.limit);

  if (!isNaN(limit) && limit > 0) {
      return response.status(200).json(posts.slice(0, limit));
  }
  response.status(200).json(posts);
};

// @desc    Get single post
// @route   GET /api/posts/:id

export const getPost = (request, response, next) => {
  const id = parseInt(request.params.id);
  const post = posts.find((post) => post.id === id);
  
  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  } 
  response.status(200).json(post); 
};

// @desc    Create new post
// @route   POST /api/posts/:id

export const createPost = (request, response, next) => {
  const newPost = {
      id: posts.length + 1,
      title: request.body.title
  };

  if (!newPost.title) {
    const error = new Error(`Please include a title`);
    error.status = 400;
    return next(error);
  }

  posts.push(newPost);
  response.status(201).json(posts);
};

// @desc    Update post
// @route   PUT /api/posts/:id

export const updatePost = (request, response, next) => {
  const id = parseInt(request.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
      return response.status(404).json({ message: `A post with the id of ${id} was not found` });
  }

  post.title = request.body.title;
  response.status(200).json(posts);
};

// @desc    Delete post
// @route   DELETE /api/posts/:id

export const deletePost = (request, response, next) => {
  const id = parseInt(request.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const error = new Error(`A post with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== id);
  response.status(200).json(posts);

};