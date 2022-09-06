export interface UsersCreateData{
    email:string,
    name:string,
    role:string,
    sector:string

}


export interface UsersRepository{
    create:(data:UsersCreateData) => Promise<void>
}

