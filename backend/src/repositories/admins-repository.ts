export interface AdminsCreateData{
    name:string,
    email:string,
}



export interface AdminsRepository{
    create:(data:AdminsCreateData) => Promise<void>
}