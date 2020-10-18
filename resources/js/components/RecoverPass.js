import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as db from '../database';
import { SET_RECOVER_EMAIL } from '../store/actions';

function RecoverPass() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged);
    const [email, setEmail] = useState('');
    const [isCompleted, setCompleted] = useState(false);

    const checkEmail = (event) => {
        event.preventDefault();

        db.recoverByEmail(email).then(res => {
            if ( res ) {
                dispatch({ type: SET_RECOVER_EMAIL, email: email });
                setCompleted(true);
            }
        })
    }

    return (
        <div className="container">
            {isLogged && (
                <Redirect to="/usuarios" />
            )}
            {isCompleted && (
                <Redirect to="/cambiar-contrasena" />
            )}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-5 mt-5">Recuperar Contraseña</h1>
                    <form onSubmit={e => checkEmail(e)}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Recuperar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RecoverPass;
