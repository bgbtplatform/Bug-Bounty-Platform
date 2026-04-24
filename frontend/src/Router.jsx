import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Program from "./pages/Program"
import Company from "./pages/Company"
import CompanyDetails from "./pages/CompanyDetails"
import ProgramDetails from "./pages/ProgramDetails";
import About from "./pages/About";
import Resources from "./pages/Resources";


const Router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {path:"/",element:<Home/>},
            {path:"/programs",element:<Program/>},
            { path: "/program-details", element: <ProgramDetails /> },
            {path:"/company",element:<Company/>},
            {path:'/company/:id',element:<CompanyDetails/>},
            {path:"/about",element:<About/>},
            {path:"/resources",element:<Resources/>},

        
        ]
    }
]);

export default Router;
