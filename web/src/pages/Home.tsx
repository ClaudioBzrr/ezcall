import { 
    User,
    Lock
} from 'phosphor-react'
import { Button } from "../components/Button";
import Logo from '../assets/images/logo.png'

export function Home(){
    return(
        <div className='w-[100%] h-[100vh] flex flex-col items-center justify-center'>

            <div className='flex flex-col items-center justify-center'>
                <img src={Logo} alt="Logo" className='w-44 absolute top-0'/>
                <h1 className='font-bold text-2xl text-white mb-10 mt-20'>
                    Entrar
                </h1>
            </div>
            <form className='max-w-screen-sm max-h-sm flex flex-col items-center justify-center'>
                <div className='mt-5 pb-1 flex flex-row items-center justify-center border-darkRed border-solid border-b-[1px]'>
                    <User
                        size={24}
                        className='mr-2 text-darkRed'
                    />
                    <input
                        placeholder='Digite seu usuário'
                        className='bg-dark text-darkRed text-center pr-[36px] placeholder:text-darkRed focus:outline-none'
                        type="text"
                    />
                </div>
                <div className='mt-5 pb-1 flex flex-row items-center justify-center border-darkRed border-solid border-b-[1px]'>
                    <Lock
                        size={28}
                        className='mr-2 text-darkRed '
                    />
                    <input
                        placeholder='Digite sua senha'
                        className='bg-dark placeholder:text-darkRed text-darkRed text-center pr-[36px] focus:outline-none' 
                        type="password" 
                    />
                </div>
                <Button 
                    className='mt-8 rounded-full bg-darkRed w-[100%] p-1 text-white font-semibold'
                    title="Login"
                />
            </form>
        </div>
    )
}