export interface CallsCreateData{
    title:string,
    message:string,
    authorId:string,
    image?:string,
}


export interface CallsUpdate{
    id:number,
    severity?:string,
    status?:string,
    solverId?:string
}


export interface CallsId{
    id:number
}

export interface CallsRepository{
    create:(data:CallsCreateData) =>Promise<void>
    update:(data:CallsUpdate) => Promise<void>
    delete:(data:CallsId) => Promise<void>
}


