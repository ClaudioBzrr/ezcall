import { ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    title:string
}


export function Button({title,...rest}:ButtonProps){
    return(
        <button {...rest}>
            {
                title
            }
        </button>
    )
}