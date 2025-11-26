// async function fetchData() {
//     try {
//         const response = await fetch('https://69169fe4a7a34288a27ddce1.mockapi.io/api/user/comments');
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Custom-Header': 'Custom-Value'
//         },
//         credentials: 'include',
//     };
//         if (!response.ok) {
//             throw new Error('Lỗi khi tải dữ liệu: ' + response.status);
//         }
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Đã xảy ra lỗi:', error);
//         throw error;
//     }
// fetchData();
// .then(data => console.log('Xử lý dữ liệu',data))
// .catch(error => console.error('Đã xảy ra lỗi:', error));

// API endpoints
const API_URL = 'https://69169fe4a7a34288a27ddce1.mockapi.io/api/user/comments';

// DOM Elements
const commentForm = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

// Function to load comments
async function loadComments() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Không thể tải bình luận');
        }

        const comments = await response.json();
        displayComments(comments);
    } catch (error) {
        console.error('Lỗi khi tải bình luận:', error);
        alert('Có lỗi xảy ra khi tải bình luận');
    }
}

// Function to display comments
function displayComments(comments) {
    // Clear existing comments
    commentsList.innerHTML = '<h2>Bình luận</h2>';

    if (comments.length === 0) {
        commentsList.innerHTML += '<p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>';
        return;
    }

    // Add each comment to the list
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <div class="comment-content">${comment.content || comment.comment || 'Nội dung trống'}</div>
            <div class="comment-meta">
                Đăng lúc: ${new Date(comment.createdAt || Date.now()).toLocaleString()}
            </div>
        `;
        commentsList.appendChild(commentElement);
    });
}

// Function to submit a new comment
async function submitComment(content) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content,
                createdAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Không thể gửi bình luận');
        }

        // Clear the form
        document.getElementById('commentContent').value = '';
        
        // Reload comments
        await loadComments();
    } catch (error) {
        console.error('Lỗi khi gửi bình luận:', error);
        alert('Có lỗi xảy ra khi gửi bình luận');
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

// Load comments when the page loads
document.addEventListener('DOMContentLoaded', loadComments);