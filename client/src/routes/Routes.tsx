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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <Signup /> },
            {
                path: 'dashboard',
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                )
            },
            {
                path: 'write-article',
                element: (
                    <ProtectedRoute>
                        <WriteArticle />
                    </ProtectedRoute>
                )
            },
            {
                path: 'generate-images',
                element: (
                    <ProtectedRoute>
                        <GenerateImages />
                    </ProtectedRoute>
                )
            },
            {
                path: 'community',
                element: (
                    <ProtectedRoute>
                        <Community />
                    </ProtectedRoute>
                )
            },
            {
                path: 'remove-background',
                element: (
                    <ProtectedRoute>
                        <RemoveBackground />
                    </ProtectedRoute>
                )
            },
            {
                path: 'remove-object',
                element: (
                    <ProtectedRoute>
                        <RemoveObject />
                    </ProtectedRoute>
                )
            },
            {
                path: 'review-resume',
                element: (
                    <ProtectedRoute>
                        <ReviewResume />
                    </ProtectedRoute>
                )
            },
        ]
    }
]);