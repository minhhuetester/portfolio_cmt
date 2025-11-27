const API_URL = 'https://69169fe4a7a34288a27ddce1.mockapi.io/api/user/comments';
// DOM elements
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
async function loadComments() {
    try {
        //Gửi yêu cầu lấy dữ liệu từ API
        const response = await fetch(API_URL,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        const displayData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        displayComments(displayData);
    } catch (error) {
        console.error('Error loading comments:', error);
        alert('Error loading comments');
    }
}
function displayComments(comments) {
    commentsList.innerHTML = '<h2>Comments</h2>';
    if (comments.length === 0) {
        commentsList.innerHTML += '<p>No comments available.</p>';
        return;
    }
    // Add each cmt to the list
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
           <div class="comment-content">${comment.content}</div>
           <div class="comment-meta">
               <span>Created at: ${comment.createdAt || Date.now().toLocaleString()}
           </div>
        `;
        commentsList.appendChild(commentElement);
    });
}
// Submit comment
async function submitComment(content) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                createdAt: new Date().toISOString(),
            }),
        });
        document.querySelector("#commentContent").value=""
        loadComments()
    } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Error submitting comment');
    }
}
// Event listener for form submission
commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   const content = document.getElementById('commentContent').value.trim();
   if (content) {
    await submitComment(content);
   }
});
document.addEventListener('DOMContentLoaded', loadComments);