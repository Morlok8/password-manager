export interface User{
    id: number,
    name: string;
    url: string;
    login: string;
    password: string;
    tags: string;
    comment: string;
    favorite: boolean;
    date: Date;
    //[key: string]: string | number | boolean | Date; 
}