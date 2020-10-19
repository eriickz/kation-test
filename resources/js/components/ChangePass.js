import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as db from '../database';
import Swal from 'sweetalert2';

function ChangePass() {
    const isLogged = useSelector(state => state.isLogged);
    const recoverEmail = useSelector(state => state.recoverEmail);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const changePassword = (event) => {
        event.preventDefault();

        if ( password === password2 ) {
            db.changePassword(recoverEmail, password).then(res => {
                if ( res ) {
                    window.location.replace('/login');
                }
            })
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                showConfirmButton: false,
                showCancelButton: true,
                cancelButtonText: 'Cerrar'
            });
        }
    }

    return (
        <div className="container">
            {isLogged && (
                <Redirect from="/" to="/usuarios" />
            )}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-5 mt-5">Nueva Contraseña</h1>
                    <form onSubmit={e => changePassword(e)}>
                        <div className="form-group">
                            <label htmlFor="password1">Ingrese la contraseña:</label>
                            <input type="password" className="form-control" id="password1" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password2">Ingrese nuevamente la contraseña:</label>
                            <input type="password" className="form-control" id="password2" onChange={e => setPassword2(e.target.value)}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePass;
