export interface CallsCreateData{
    title:string,
    message:string,
    authorId:string,
    image:string
}


export interface CallsUpdateData{
    auth:string,
    id:number,
    severity?:number,
    status?:string,
    solverId?:string
}


export interface CallsDeleteData{
    auth:string,
    id:number
}

export interface CallsAuthorData{
    authorId:string
}
export interface CallsSolverData{
    solverId:string
}


export interface CallsOperatorData{
    id:number,
    title:string,
    message:string,
    image:string | null,
    status:string,
    severity:number|null,
    createdAt:Date,
    updatedAt:Date,
    finishedAt:Date,
    authorId:string,
    solverId:string|null
}

export interface CallsUserData{
    id:number,
    title:string,
    message:string,
    image:string|null,
    status:string,
    createdAt:Date,
    updatedAt:Date,
    finishedAt:Date,
    authorId:string,
    solverId:string|null
}

export interface CallsRepository{
    create:(data:CallsCreateData) => Promise<void>
    update:(data:CallsUpdateData) => Promise<void>
    delete:(data:CallsDeleteData) => Promise<void>
    readUserCalls:(data:CallsAuthorData) => Promise<CallsUserData[]>
    readOperatorCall:(data:CallsSolverData) => Promise<CallsOperatorData[]>
}


