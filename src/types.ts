export type TagType = {
    name: string,
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