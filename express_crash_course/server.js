import express from 'express';
import path from 'path';
import posts from'./routes/posts.js';
const port = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);

// using direct routes to html pages
// app.get('/', (request, response) => {
//     response.sendFile(path.join(__dirname, 'public', 'index.html'))
// });

// app.get('/about', (request, response) => {
//     response.sendFile(path.join(__dirname, 'public', 'about.html'))
// });

app.listen(port, () => console.log(`Server running on port ${port}`));