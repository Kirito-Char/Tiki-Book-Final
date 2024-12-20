import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {App, ConfigProvider} from 'antd';
import Layout from '@/layout'
import BookPage from 'pages/client/book';
import AboutPage from 'pages/client/about';
import LoginPage from 'pages/client/auth/login';
import RegisterPage from 'pages/client/auth/register';
import HomePage from 'pages/client/home';
import {AppProvider} from "components/context/app.context";
import ProtectedRoute from "components/auth";
import LayoutAdmin from "components/layout/layout.admin";
import DashBoardPage from "pages/admin/dashboard";
import ManageBookPage from "pages/admin/manage.book";
import ManageOrderPage from "pages/admin/manage.order";
import ManageUserPage from "pages/admin/manage.user";
import enUS from 'antd/es/locale/en_US';
import OrderPage from "pages/client/order";
import HistoryPage from "pages/client/history";
import ReturnURLPage from "components/client/order/return.url";
import {GoogleOAuthProvider} from '@react-oauth/google';

import 'styles/global.scss'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "/book/:id",
                element: <BookPage/>,
            },
            {
                path: "/order",
                element: (
                    <ProtectedRoute>
                        <OrderPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/vnpay/return-url",
                element: (
                    <ProtectedRoute>
                        <ReturnURLPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "/about",
                element: <AboutPage/>,
            },
            {
                path: "/history",
                element: (
                    <ProtectedRoute>
                        <HistoryPage/>
                    </ProtectedRoute>
                ),
            },
        ]
    },
    {
        path: "admin",
        element: <LayoutAdmin/>,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <DashBoardPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "book",
                element: (
                    <ProtectedRoute>
                        <ManageBookPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "order",
                element: (
                    <ProtectedRoute>
                        <ManageOrderPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "user",
                element: (
                    <ProtectedRoute>
                        <ManageUserPage/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <div>admin page</div>
                    </ProtectedRoute>
                ),
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App>
            <AppProvider>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <ConfigProvider locale={enUS}>
                        <RouterProvider router={router}/>
                    </ConfigProvider>
                </GoogleOAuthProvider>
            </AppProvider>
        </App>
    </StrictMode>
)