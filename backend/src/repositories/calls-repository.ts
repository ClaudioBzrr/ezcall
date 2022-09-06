export interface CallsCreateData{
    title:string,
    message:string,
    authorId:string,

}


export interface CallsRepository{
    create:(data:CallsCreateData) =>Promise<void>
}