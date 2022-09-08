export interface UsersCreateData{
    email:string,
    name:string,
    role:string,
    sector:string,
    password ?: string

}

export interface UsersUpdateData{
    email ?:string,
    name ?:string,
    role ?:string,
    sector ?:string,
    password ?:string

}


export interface UsersRepository{
    create:(data:UsersCreateData) => Promise<void>
    update:(data:UsersUpdateData) => Promise<void>
}

