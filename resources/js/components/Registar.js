import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REGISTER } from '../store/actions';
import { Redirect } from 'react-router-dom';

import * as db from '../database';

function Registar() {
    const isLogged = useSelector(state => state.isLogged);

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, SetIsRegistered] = useState(false);

    const registerUser = (event) => {
        event.preventDefault();

        db.register(email, password, name, lastname).then(res => {
            if ( res ) {
                dispatch({ type: REGISTER, loggedUser: res });
                SetIsRegistered(true);
            }
        })
    }

    return (
        <div className="container">
            {(isLogged || isRegistered) && (
                <Redirect from="/" to="/login" />
            )}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-5 mt-5">Registro</h1>
                    <form onSubmit={e => registerUser(e)}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" className="form-control" id="name" onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Apellido:</label>
                            <input type="text" className="form-control" id="name" onChange={e => setLastname(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" min="4" className="form-control" id="password" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Registarme</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registar;
