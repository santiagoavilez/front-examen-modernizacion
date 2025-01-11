export interface Task {
    id: number
    title: string
    description: string
    users: User[]
    priority: Priority
    status: Status
    updated_at: string
    created_at: string
}

export interface Status {
    id: number
    name: string
}
export interface Priority {
    id: number
    name: string
}

export interface User {
    id: number
    name: string
    email: string
}
