window.addEventListener('DOMContentLoaded', function() {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('postsContainer');
    savedPosts.forEach((postData, index) => {
        const post = createPostElement(postData.title, postData.image, postData.content, index);
        postsContainer.appendChild(post);
    });
});
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const imageFile = document.getElementById('image').files[0];
    const content = document.getElementById('content').value;
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.push({ title, image: imageData, content });
        localStorage.setItem('posts', JSON.stringify(savedPosts));
        
        const postIndex = savedPosts.length - 1;
        const post = createPostElement(title, imageData, content, postIndex);
        document.getElementById('postsContainer').appendChild(post);
        document.getElementById('postForm').reset();
    };
    
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    } else {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        savedPosts.push({ title, image: null, content });
        localStorage.setItem('posts', JSON.stringify(savedPosts));
        const postIndex = savedPosts.length - 1;
        const post = createPostElement(title, null, content, postIndex);
        document.getElementById('postsContainer').appendChild(post);
        document.getElementById('postForm').reset();
    }
});
function createPostElement(title, image, content, index) {
    const post = document.createElement('div');
    post.classList.add('post');
    post.setAttribute('data-index', index);
    const postTitle = document.createElement('h3');
    postTitle.textContent = title;
    post.appendChild(postTitle);
    if (image) {
        const postImage = document.createElement('img');
        postImage.src = image;
        post.appendChild(postImage);
    }
    const postContent = document.createElement('p');
    postContent.textContent = content;
    post.appendChild(postContent);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', function() {
        editPost(index);
    });
    post.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function() {
        deletePost(index);
    });
    post.appendChild(deleteButton);
    
    return post;
}
function deletePost(index) {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    savedPosts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    document.getElementById('postsContainer').innerHTML = '';
    savedPosts.forEach((postData, idx) => {
        const post = createPostElement(postData.title, postData.image, postData.content, idx);
        document.getElementById('postsContainer').appendChild(post);
    });
}
function editPost(index) {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const postToEdit = savedPosts[index];
    document.getElementById('title').value = postToEdit.title;
    document.getElementById('content').value = postToEdit.content;
    deletePost(index);
}