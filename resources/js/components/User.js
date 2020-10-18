import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import * as db from '../database';

function User() {
    const isLogged = useSelector(state => state.isLogged);

    //URL PARAM
    const { id = undefined } = useParams();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(0);

    const [isCompleted, setCompleted] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if ( id !== undefined ) {
            db.getUser(id).then(user => {
                setName(user.name);
                setLastname(user.lastname);
                setEmail(user.email);
                setUserId(id);
                setIsUpdate(true);
            })
        }
    }, []);

    const updateUser = (event) => {
        event.preventDefault();

        const data = {
            name,
            lastname,
            email,
            password,
        }

        db.updateUser(userId, data).then(res => {
            if ( res ) {
                setCompleted(true);
            }
        })
    }

    const newUser = (event) => {
        event.preventDefault();

        db.register(email, password, name, lastname).then(res => {
            if ( res ) {
                setCompleted(true);
            }
        })
    }

    const deleteUser = (event) => {
        event.preventDefault();

        db.deleteUser(userId).then(res => {
            if ( res ) {
                setCompleted(true);
            }
        })
    }

    return (
        <div className="container">
            {(!isLogged || isCompleted) && (
                <Redirect to="/usuarios" />
            )}
            <div className="row justify-content-center">
                <div className="col-md-6">
                <h1 className="text-center mb-5 mt-5">{ (isUpdate) ? 'Editar Usuario' : 'Nuevo Usuario' }</h1>
                    <form onSubmit={e => (isUpdate) ? updateUser(e) : newUser(e)}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Apellido:</label>
                            <input type="text" className="form-control" id="name" value={lastname} onChange={e => setLastname(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña:</label>
                            <input type="password" min="4" className="form-control" id="password" onChange={e => setPassword(e.target.value)}></input>
                        </div>
                        <button type="submit" className="btn btn-primary">{(isUpdate) ? "Actualizar Datos" : 'Crear Usuario'}</button>

                        {isUpdate && (
                            <button className="btn btn-danger ml-2" onClick={e => deleteUser(e)}>Borrar Usuario</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default User;
