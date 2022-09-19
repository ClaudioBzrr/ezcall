export interface CallsCreateData{
    title:string,
    message:string,
    authorId:string,
    screenshot:string
}


export interface CallsUpdateData{
    id:number,
    severity?:number,
    status?:string,
    solverId?:string,
    isFinished?:boolean,
    solution?:string,
    finishedAt?:Date
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
    screenshot:string | null,
    status:string,
    severity:number|null,
    createdAt:Date,
    updatedAt:Date,
    finishedAt:Date|null,
    authorId:string,
    solverId:string|null
    isFinished:boolean
}

export interface CallsUserData{
    id:number,
    title:string,
    message:string,
    screenshot:string|null,
    status:string,
    createdAt:Date,
    updatedAt:Date,
    finishedAt:Date|null,
    authorId:string,
    solverId:string|null
    isFinished:boolean
}

export interface CallsRepository{
    create:(data:CallsCreateData) => Promise<void>
    update:(data:CallsUpdateData) => Promise<void>
    delete:(data:CallsDeleteData) => Promise<void>
    readUserCalls:(data:CallsAuthorData) => Promise<CallsUserData[]>
    readOperatorCalls:(data:CallsSolverData) => Promise<CallsOperatorData[]>
    readAllcalls:(data:CallsSolverData) => Promise<CallsOperatorData[]>
}


