const API_URL = 'https://69169fe4a7a34288a27ddce1.mockapi.io/api/user/comments';
// DOM elements
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');
async function loadComments() {
    try {
        //Gửi yêu cầu lấy dữ liệu từ API
        const response = await fetch(API_URL);
        //Chuyển đổi dữ liệu sang dạng json
        const data = await response.json();
        //Gọi hàm displayComment để hiển thị bình luận
        displayComments(data);
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}
function displayComments(comments) {
    commentsList.innerHTML = '<h2>Comments</h2>';
    if (comments.length === 0) {
        commentsList.innerHTML += '<p>No comments available.</p>';
        return;
    }
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p>${comment.content}</p>
            <p>Posted by: ${comment.user}</p>
        `;
        commentsList.appendChild(commentElement);
    });
}
