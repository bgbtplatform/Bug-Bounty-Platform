import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Program from "./pages/Program"
import Company from "./pages/Company"
import CompanyDetails from "./pages/CompanyDetails"


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
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Program from "./pages/Program";
import ProgramDetails from "./pages/ProgramDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/programs", element: <Program /> },
      { path: "/program-details", element: <ProgramDetails /> }
    ]
  }
]);

export default Router;