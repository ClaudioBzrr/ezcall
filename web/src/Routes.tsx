import { Detail } from "./pages/Detail"
import { Error } from "./pages/Error"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"

interface RoutesProps{
    path:string,
    element:JSX.Element
}

export const routes:RoutesProps[] = [
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/',
        element:<Login/>
    },
    {
        path:'/home',
        element:<Home/>
    },
    {
        path:'/details',
        element:<Detail/>
    },
    {
        path:'*',
        element:<Error/>
    },
]