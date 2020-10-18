import React from 'react';
import { useDispatch } from 'react-redux'
import { logout } from './database';

const Login = React.lazy(() => import('./components/Login'));
const Registar = React.lazy(() => import('./components/Registar'));
const Users = React.lazy(() => import('./components/Users'));
const User = React.lazy(() => import('./components/User'));
const RecoverPass = React.lazy(() => import('./components/RecoverPass'));
const ChangePass = React.lazy(() => import('./components/ChangePass'));

const Logout = () => {
   const dispatch = useDispatch();

    logout().then(res => {
        sessionStorage.clear();

        dispatch({type: 'LOGOUT'});
        window.location.replace("/login");
    });
}

const routes = [
    { path: '/', exact: true, component: Login },
    { path: '/login', exact: true, component: Login },
    { path: '/registro', exact: true, component: Registar },
    { path: '/usuarios', exact: true, component: Users },
    { path: '/usuario/:id', exact: true, component: User },
    { path: '/nuevo-usuario', exact: true, component: User },
    { path: '/recuperar-contrasena', exact: true, component: RecoverPass },
    { path: '/cambiar-contrasena', exact: true, component: ChangePass },
    { path: '/salir', exact: true, component: Logout },
];

export default routes;
