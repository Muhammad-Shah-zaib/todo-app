export type TodoData = Root2[]

export interface Root2 {
    id?: string;
    userId: string;
    task?: string;
    completed?: boolean;
    favourite?: boolean;
}
