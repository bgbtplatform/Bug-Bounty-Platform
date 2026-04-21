import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Program from "./pages/Program"
import Company from "./pages/Company"
import CompanyDetails from "./pages/CompanyDetails"
import Scope from "./pages/Scope"

const Router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {path:"/",element:<Home/>},
            {path:"/programs",element:<Program/>},
            {path:"/company",element:<Company/>},
            {path:'/company/:id',element:<CompanyDetails/>},
        
        ]
    }
])

export default Router