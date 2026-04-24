import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Program from "./pages/Program"
import Company from "./pages/Company"
import CompanyDetails from "./pages/CompanyDetails"
import ProgramDetails from "./pages/ProgramDetails";
import About from "./pages/About";
import Resources from "./pages/Resources";
import CompanyPrograms from "./pages/CompanyPrograms";
import Scope from "./pages/Scope";
import ScopeDetails from "./pages/ScopeDetails";


const Router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {path:"/",element:<Home/>},
            {path:"/programs",element:<Program/>},
            {path: "/program-details", element: <ProgramDetails /> },
            { path: "/scope", element: <Scope /> },
            { path: "/scope-details", element: <ScopeDetails /> },
            {path:"/company",element:<Company/>},
            {path:'/company/:id',element:<CompanyDetails/>},
            {path:"/about",element:<About/>},
            {path:"/resources",element:<Resources/>},
            { path: "/company/:id/programs", element: <CompanyPrograms /> }            
        ]
    }
]);

export default Router;
