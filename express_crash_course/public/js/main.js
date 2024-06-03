const output = document.querySelector('#output');
const button = document.querySelector('#get-posts-btn');
const form = document.querySelector('#add-post-form');

// Get and show post
async function showPosts() {
  try {
    const response = await fetch('http://localhost:8000/api/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    output.innerHTML = '';

    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.textContent = post.title;
        output.appendChild(postElement);
    });
  } catch (error) {
    console.log('Error fetching posts: ', error);
  } 
}

// Submit new post
async function addPost(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const title = formData.get('title');

  try {
    const response = await fetch('http://localhost:8000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    })

    if (!response.ok) {
      throw new Error('Failed to add post');
    }

    const newPost = await response.json();

    const postElement = document.createElement('div');
    postElement.textContent = newPost.title;
    output.appendChild(postElement);
    showPosts();
  } catch (error) {
    console.log('Error adding posts: ', error);
  }
}

// Event listeners
button.addEventListener('click', showPosts);
form.addEventListener('submit', addPost);