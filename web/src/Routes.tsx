import { Home } from "./pages/admin/Home"

interface RoutesProps{
    path:string,
    element:JSX.Element
}

export const routes:RoutesProps[] = [
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/home',
        element:<Home/>
    }
]