import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import WriteArticle from "../pages/Dashboard/WriteArticle";
import GenerateImages from "../pages/Dashboard/GenerateImages";
import Community from "../pages/Dashboard/Community";
import RemoveObject from "../pages/Dashboard/RemoveObject";
import ReviewResume from "../pages/Dashboard/ReviewResume";
import RemoveBackground from "../pages/Dashboard/RemoveBackground";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            { path: 'contact', element: <Contact /> },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
                children: [
                    { path: 'write-article', element: <WriteArticle /> }, 
                    { path: 'generate-images', element: <GenerateImages /> },
                    { path: 'remove-background', element: <RemoveBackground /> },
                    { path: 'remove-object', element: <RemoveObject /> },
                    { path: 'review-resume', element: <ReviewResume /> },
                    { path: 'community', element: <Community /> },
                ]
            },
        ]
    }
]);