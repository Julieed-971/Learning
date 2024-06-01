const express = require('express');
const path = require('path');

const app = express();

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// using direct routes to html pages
// app.get('/', (request, response) => {
//     response.sendFile(path.join(__dirname, 'public', 'index.html'))
// });

// app.get('/about', (request, response) => {
//     response.sendFile(path.join(__dirname, 'public', 'about.html'))
// });

app.listen(8000, () => console.log(`Server running on port 8000`));