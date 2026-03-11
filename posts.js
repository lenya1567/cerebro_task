class PostsRepository {
    constructor(userRepo) {
        this.posts = [];
        this.userRepo = userRepo;
    }
    
    async getNextPosts() {
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts?_page=" + parseInt(this.posts.length / 10));
        const posts = await postsResponse.json();
        const needPosts = [];

        for (const post of posts.slice(this.nextIndex % 10)) {
            const postAuthor = await this.userRepo.getUser(post.userId);

            needPosts.push({
                title: post.title,
                description: post.body,
                author: postAuthor.name,
            });
        }

        this.posts.push(...needPosts);
        
        return needPosts;
    }
}

function createPost(post) {
    const postBody = document.createElement("article");
    postBody.classList.add("post-body");

    const postTitle = document.createElement("h2");
    postTitle.classList.add("post-title");
    postTitle.innerText = post.title;

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");
    postContent.innerText = post.description;

    const postAuthor = document.createElement("footer");
    postAuthor.classList.add("post-author");
    postAuthor.innerText = "Автор: " + post.author;

    postBody.appendChild(postTitle);
    postBody.appendChild(postContent);
    postBody.appendChild(postAuthor);

    return postBody;
}