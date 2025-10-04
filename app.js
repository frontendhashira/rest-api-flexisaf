const API_BASE = "https://jsonplaceholder.typicode.com";

function showResponse(responseId) {
	const responseDiv = document.getElementById(responseId);
	responseDiv.classList.add("visible");
}

// GET Post
async function getPost() {
	const postId = document.getElementById("getPostId").value || 1;
	const contentDiv = document.getElementById("getPostContent");

	showResponse("getPostResponse", "getPostContent");
	contentDiv.innerHTML = '<div class="loading">Loading...</div>';

	try {
		const response = await fetch(`${API_BASE}/posts/${postId}`);
		if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
		const data = await response.json();

		contentDiv.innerHTML = `
          <div class="status-badge">Status: ${response.status} OK</div>
          <div class="repo-item">
            <h5>${data.title}</h5>
            <p><strong>Body:</strong> ${data.body}</p>
            <p><strong>User ID:</strong> ${data.userId}</p>
            <p><strong>ID:</strong> ${data.id}</p>
          </div>
          <details><summary>Raw JSON</summary><pre>${JSON.stringify(data, null, 2)}</pre></details>
        `;
	} catch (error) {
		contentDiv.innerHTML = `<div class="status-badge status-error">Error</div><p class="error-text">${error.message}</p>`;
	}
}

// POST Create Post
document.getElementById("createPostForm").onsubmit = async (e) => {
	e.preventDefault();
	const title = document.getElementById("postTitle").value;
	const body = document.getElementById("postBody").value;
	const contentDiv = document.getElementById("postPostContent");

	showResponse("postPostResponse", "postPostContent");
	contentDiv.innerHTML = '<div class="loading">Creating...</div>';

	try {
		const response = await fetch(`${API_BASE}/posts`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, body, userId: 1 }),
		});
		if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
		const data = await response.json();

		contentDiv.innerHTML = `
          <div class="status-badge">Status: ${response.status} Created</div>
          <div class="repo-item">
            <h5>${data.title}</h5>
            <p><strong>Body:</strong> ${data.body}</p>
            <p><strong>User ID:</strong> ${data.userId}</p>
            <p><strong>ID:</strong> ${data.id}</p>
          </div>
          <details><summary>Raw JSON</summary><pre>${JSON.stringify(data, null, 2)}</pre></details>
        `;
	} catch (error) {
		contentDiv.innerHTML = `<div class="status-badge status-error">Error</div><p class="error-text">${error.message}</p>`;
	}
};

// PUT Update Post
document.getElementById("updatePostForm").onsubmit = async (e) => {
	e.preventDefault();
	const postId = document.getElementById("updatePostId").value;
	const title = document.getElementById("updateTitle").value;
	const body = document.getElementById("updateBody").value;
	const contentDiv = document.getElementById("putPostContent");

	showResponse("putPostResponse", "putPostContent");
	contentDiv.innerHTML = '<div class="loading">Updating...</div>';

	try {
		const response = await fetch(`${API_BASE}/posts/${postId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: postId, title, body, userId: 1 }),
		});
		if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
		const data = await response.json();

		contentDiv.innerHTML = `
          <div class="status-badge">Status: ${response.status} OK</div>
          <div class="repo-item">
            <h5>${data.title}</h5>
            <p><strong>Body:</strong> ${data.body}</p>
            <p><strong>User ID:</strong> ${data.userId}</p>
            <p><strong>ID:</strong> ${data.id}</p>
          </div>
          <details><summary>Raw JSON</summary><pre>${JSON.stringify(data, null, 2)}</pre></details>
        `;
	} catch (error) {
		contentDiv.innerHTML = `<div class="status-badge status-error">Error</div><p class="error-text">${error.message}</p>`;
	}
};

// DELETE Post
async function deletePost() {
	const postId = document.getElementById("deletePostId").value;
	const contentDiv = document.getElementById("deletePostContent");

	showResponse("deletePostResponse", "deletePostContent");

	if (!postId) {
		contentDiv.innerHTML = `<div class="status-badge status-error">Error</div><p class="error-text">Please enter a Post ID</p>`;
		return;
	}

	contentDiv.innerHTML = '<div class="loading">Deleting...</div>';

	try {
		const response = await fetch(`${API_BASE}/posts/${postId}`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

		contentDiv.innerHTML = `
          <div class="status-badge">Status: ${response.status} Deleted</div>
          <div class="repo-item">
            <h5>Post Deleted</h5>
            <p><strong>ID:</strong> ${postId}</p>
          </div>
        `;
	} catch (error) {
		contentDiv.innerHTML = `<div class="status-badge status-error">Error</div><p class="error-text">${error.message}</p>`;
	}
}
