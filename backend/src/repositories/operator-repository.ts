export interface OperatorCreateData{
    name:string,
    email:string,
    password ?: string
}

export interface OperatorUpdateData{
    name ?: string,
    email ?: string,
    password ?: string
}

export interface OperatorRepository{
    create:(data:OperatorCreateData) => Promise<void>
    update:(data:OperatorUpdateData) => Promise<void>
}
