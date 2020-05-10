export interface toDo {
    completed: boolean,
    id: number,
    title: string,
    userId: number
}

export interface loginResponse {
    status: string,
    userInfo: {
        id: string,
        login: string
        toDoList: []
    }
}

export interface signUpResponse {
    status: string,
    newUser: {
        id: string,
        login: string,
    }
}