/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2024-09-27 17:35:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-10-08 15:22:33
 * @FilePath: /meeting_room_booking_system_frontend/src/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import  { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { UpdatePassword } from './pages/update_password/UpdatePassword';
import { ErrorPage } from './pages/error/ErrorPage';
import { Index } from './pages/index/index';
import { Children } from 'react';
import { UpdateInfo } from './pages/update_info/UpdateInfo';



const routes = [
  {
    path: "/",
    element: <Index></Index>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'update_info',
        element: <UpdateInfo />
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/update_password",
    element: <UpdatePassword/>,
  },
];
const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<RouterProvider router={router}/>);
