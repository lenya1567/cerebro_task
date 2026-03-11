class UsersRepository {
    constructor() {
        this.users = {};
    }

    async getUser(userId) {
        if (this.users[userId] !== undefined) {
            return this.users[userId];
        }

        const userResponse = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);

        const userRaw = await userResponse.json();
        this.users[userId] = userRaw;
        return userRaw;
    }
}