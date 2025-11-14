

export interface IregisterUser {
    first_name: string
    last_name: string
    age: number
    sex: string
    email: string 
    password: string
    role: string
}


export interface IregisterUserResponse {
    message: string
    id: string
}