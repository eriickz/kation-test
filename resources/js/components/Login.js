import React, { useState } from 'react';
import { LOGIN } from '../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import * as db from '../database';

function Login() {
    const isLogged = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (event) => {
        event.preventDefault();

        db.login(email, password).then(res => {
            if ( res ) {
                dispatch({ type: LOGIN, loggedUser: res });
            }
        })
    }

    return (
        <div className="container">
            {isLogged && (
                <Redirect from="/" to="/usuarios" />
            )}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-5 mt-5">Ingresar</h1>
                    <form onSubmit={e => loginUser(e)}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <Link className="mt-1 float-right" to="/recuperar-contrasena">¿Olvidó la contraseña?</Link>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                        <Link type="submit" className="btn btn-secondary ml-2" to="/registro" >Registrarme</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
