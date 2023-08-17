import {createBrowserRouter} from "react-router-dom";
import {Navigate} from "react-router-dom";
import DefaultLayout from "../pages/layouts/DefaultLayout";
import Dashboard from "../pages/Private/Dashboard";
import Users from "../pages/Private/Users";
import Nationalities from '../pages/Private/Nacionalidade'
import Players from "../pages/Private/Jogadores";
import GuestLayout from "../pages/layouts/GuestLayout";
import Login from "../pages/Public/Login";
import Signup from "../pages/Public/Signup";
import NotFound from "../pages/Public/NotFound";
import PlayerIndex from "../pages/Public/Jogadores/index"


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" />,
        abstract: true,
        title: 'Dashboard',
        description: 'Dashboard',
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {path: '/nationalities',
    element:<Nationalities/>,},
    {path:'/players',
    element:<Players/>
  },
    ]
  },
  {
    path:'/playerindex',
    element: <PlayerIndex/>
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path:'/playerindex',
        element: <PlayerIndex/>
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }


]);

export default router;
