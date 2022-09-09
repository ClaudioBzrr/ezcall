export interface AdminsCreateData{
    name:string,
    email:string,
    password : string
}

export interface AdminsUpdateData{
    id:string
    name ?: string,
    email ?: string,
    password ?: string
}


export interface AdminsDeleteData{
    id:string
}

export interface AdminsReadData{
    id:string,
    name:string,
    email:string,
    password:string,
    firstAccess:boolean,
    createdAt:Date,
    updatedAt:Date,
}



export interface AdminsRepository{
    create:(data:AdminsCreateData) => Promise<void>
    update:(data:AdminsUpdateData) => Promise<void>
    read:() => Promise<AdminsReadData[]>
    delete:(data:AdminsDeleteData) => Promise<void>
}

