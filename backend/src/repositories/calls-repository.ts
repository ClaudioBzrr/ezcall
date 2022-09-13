export interface CallsCreateData{
    title:string,
    message:string,
    authorId:string,
    image?:string,
}


export interface CallsUpdateData{
    auth:string,
    id:number,
    severity?:string,
    status?:string,
    solverId?:string
}


export interface CallsDeleteData{
    id:number
}

export interface CallsRepository{
    create:(data:CallsCreateData) =>Promise<void>
    update:(data:CallsUpdateData) => Promise<void>
    delete:(data:CallsDeleteData) => Promise<void>
}


