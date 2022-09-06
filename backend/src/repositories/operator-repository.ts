export interface OperatorCreateData{
    name:string,
    email:string,
}


export interface OperatorReporitory{
    create:(data:OperatorCreateData) => Promise<void>
}
