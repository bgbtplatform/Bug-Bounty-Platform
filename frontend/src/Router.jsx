import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Program from "./pages/Program"
import Company from "./pages/Company"
import CompanyDetails from "./pages/CompanyDetails"
import ProgramDetails from "./pages/ProgramDetails";
import About from "./pages/About";
import Resources from "./pages/Resources";
import CompanyPrograms from "./pages/CompanyPrograms";
import Scope from "./pages/Scope";
import ScopeDetails from "./pages/ScopeDetails";
import EditCompany from "./pages/EditCompany";
import EditProgram from "./pages/EditProgram";
import EditScope from "./pages/EditScope";
import SubmitReport from "./pages/SubmitReport";
import MyReports from "./pages/MyReports";
import ReportDetails from "./pages/ReportDetails";
import EditReport from "./pages/EditReport";
import ProgramReports from "./pages/ProgramReports";
import CompanyReportView from "./pages/CompanyReportView";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/register", element: <SignUp /> },
            { path: "/programs", element: <Program /> },
            { path: "/program/edit/:id", element: <EditProgram /> },
            { path: "/program-details", element: <ProgramDetails /> },
            { path: "/scope/edit/:id", element: <EditScope /> },
            { path: "/scope", element: <Scope /> },
            { path: "/scope-details", element: <ScopeDetails /> },
            { path: "/submit-report", element: <SubmitReport /> },
            { path: "/my-reports", element: <MyReports /> },
            { path: "/reports/:id", element: <ReportDetails /> },
            { path: "/reports/edit/:id", element: <EditReport /> },
            { path: "/company", element: <Company /> },
            { path: "/company/:id", element: <CompanyDetails /> },
            { path: "/company/edit/:id", element: <EditCompany /> },
            { path: "/about", element: <About /> },
            { path: "/resources", element: <Resources /> },
            { path: "/company/:id/programs", element: <CompanyPrograms /> },
            { path: "/company/program/:programId/reports", element: <ProgramReports /> },
            { path: "/company/program/:programId/reports/:id", element: <CompanyReportView /> },
        ]
    }
]);

export default Router;
