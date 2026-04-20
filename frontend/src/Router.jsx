import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Program from "./pages/Program"

const Router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {path:"/",element:<Home/>},
            {path:"/programs",element:<Program/>}
        ]
    }
])

export default Router