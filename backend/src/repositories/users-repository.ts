
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
    sector?: string,
    password ?: string
    isActive ?: boolean
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
    isActive: boolean
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
    login:(data:UsersLoginData) => Promise<UsersID>
}

