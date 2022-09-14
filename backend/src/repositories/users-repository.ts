
export interface UsersCreateData{
    auth?:string,
    name:string,
    email:string,
    role ?:string,
    sector:string,
}

export interface UsersUpdateData{
    auth?:string,
    id:string,
    name ?: string,
    email ?: string,
    role ?:string,
    sector: string,
    password ?: string
}


export interface UsersDeleteData{
    auth?:string,
    id:string
}

export interface UsersReadData{
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    sector: string;
    firstAccess: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UsersID{
    id:string
}

export interface UsersLoginData{
    email:string,
    password:string,
}


export interface UsersRepository{
    create:(data:UsersCreateData) => Promise<string>
    update:(data:UsersUpdateData) => Promise<void>
    readOne:(data:UsersID) => Promise<UsersReadData>
    readAll:() => Promise<UsersReadData[]>
    delete:(data:UsersDeleteData) => Promise<void>
    login:(data:UsersLoginData) => Promise<UsersID>
}

