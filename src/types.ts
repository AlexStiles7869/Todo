export type CompletionState = {
    complete: boolean,
}

export type TagType = {
    name: string,
    id: number,
}

export type TodoType = {
    name: string,
    id: number,
    date: string,
    time: string,
    note: string,
    tags: TagType[],
    completed: boolean,
}