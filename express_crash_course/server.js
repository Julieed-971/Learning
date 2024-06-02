const express = require('express');
const path = require('path');
const posts = require('./routes/posts');
const port = process.env.PORT || 8000;

const app = express();

// Routes
app.use('/api/posts', posts);


// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

// using direct routes to html pages
// app.get('/', (request, response) => {
//     response.sendFile(path.join(__dirname, 'public', 'index.html'))
// });

// app.get('/about', (request, response) => {
//     response.sendFile(path.join(__dirname, 'public', 'about.html'))
// });

app.listen(port, () => console.log(`Server running on port ${port}`));