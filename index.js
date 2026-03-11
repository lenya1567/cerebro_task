const userRepo = new UsersRepository();
const postRepo = new PostsRepository(userRepo);
const finishElement = document.getElementById("end");

const observer = new IntersectionObserver(async (entries) => {
    if (!entries[0].isIntersecting) {
        return;
    }

    const newPosts = await postRepo.getNextPosts();
    
    for (const post of newPosts) {
        const newPostElement = createPost(post);
        finishElement.before(newPostElement);
    }
}, { threshold: 1.0 });

observer.observe(finishElement);