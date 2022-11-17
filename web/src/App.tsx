import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { routes } from './Routes'


export function App() {

  return (
    <BrowserRouter>
      <Routes>
        {
          routes.map(({path,element},index) => <Route key={index.toString()} path={path} element={element} />)
        }
      </Routes>
    </BrowserRouter>
  )
}
