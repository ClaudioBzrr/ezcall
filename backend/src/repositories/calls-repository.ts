export interface CallsCreateData{
    title:string,
    message:string,
    authorId:string,
    image?:string,
}


export interface CallsUpdate{
    severity:string,
    status:string,
    solverId:string
}


export interface CallsRepository{
    create:(data:CallsCreateData) =>Promise<void>
    update:(data:CallsUpdate) => Promise<void>
}