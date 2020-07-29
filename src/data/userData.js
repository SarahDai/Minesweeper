/** MOCK DATA - file to be removed in production */

const users = [
    {
        username: "newuser",
        password: "newuser",
    },
    {
        username: "expert",
        password: "expert",
    },
]

export const login = (username, password) => {
    for (let idx in users) {
        if (username === users[idx].username &&
            password === users[idx].password) {
            return {
                index: idx,
                name: username
            };
        }
    }
    return {};
}