/** MOCK DATA - file to be removed in production */

const users = [
    {
        username: "tester1",
        password: "1234",
        todos: []
    },
    {
        username: "tester2",
        password: "1234"
    },
    {
        username: "tester3",
        password: "1234",
        todos: [
            {
                text: "a completed task",
                isComplete: true
            }
        ]
    },
    {
        username: "j_newbie",
        password: "1234",
        firstname: "J",
        lastname: "Newbie",
        onboardingComplete: false,
        firstAddComplete: false,
        todos: []
    },
    {
        username: "b_expert",
        password: "1234",
        firstname: "B",
        lastname: "Expert",
        onboardingComplete: true,
        firstAddComplete: true,
        todos: [
            {
                text: "Finish CS7580 homework",
                isComplete: false
            },
            {
                text: "Do laundry",
                isComplete: true
            },
            {
                text: "Apply for internship",
                isComplete: false
            }
        ]
    }
]

/** The purpose of the following functions is to mock operations on a real 
 * database. They should accept the same parameters and return the same output 
 * as real database functions.
 */
export const login = (username, password) => {
    for (let user in users) {
        if (username === users[user].username && password === users[user].password)
            return {
                id: user,
                onboardingComplete: users[user].onboardingComplete,
                firstAddComplete: users[user].firstAddComplete,
                firstFilterComplete: users[user].firstFilterComplete,
                firstCompleteComplete: users[user].firstCompleteComplete
            };
    }
    return {}
}

export const getTodosForUser = currentUser => {
    return users[currentUser].todos;
}

export const toggleTodoForUser = (currentUser, todoId) => {
    users[currentUser].todos[todoId].isComplete = !users[currentUser].todos[todoId].isComplete;
    return users[currentUser].todos[todoId];
}

export const addTodoForUser = (currentUser, text) => {
    if (!users[currentUser].todos) {
        users[currentUser].todos = []
    }
    users[currentUser].todos.push(
        {
            text,
            isComplete: false
        }
    )
    return users[currentUser].todos;
}

export const userCompletedOnboarding = userId => {
    users[userId].onboardingComplete = true;
    return true; // A real operation would have a return...
}

export const userCompletedFirstAdd = userId => {
    users[userId].firstAddComplete = true;
    return true;
}

export const userCompletedFirstFilter = userId => {
    users[userId].firstAddFilter = true;
    return true;
}

export const userCompletedFirstComplete = userId => {
    users[userId].firstCompleteComplete = true;
    return true;
}