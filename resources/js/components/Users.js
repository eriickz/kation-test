import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as db from '../database';

function Users() {
    const loggedUser = useSelector(state => state.loggedUser);
    const isLogged = useSelector(state => state.isLogged);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if ( !isLogged ) window.location.replace("/login");

        db.getUsers().then(users => {
            let data = [];

            for (let user in users) {
                data.push(users[user]);
            }

            setUsers(data);
        });
    }, []);

    return(
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-5 mt-5">Lista de Usuarios</h1>
                    <div className="list-group">
                        {users.map((user, index) => {

                            const fullname = `${user.name} ${user.lastname}`;
                            const active = (loggedUser.id === user.id) ? 'active' : '';

                            return (
                                <Link key={index} to={`/usuario/${user.id}`} className={"list-group-item list-group-item-action " + active}>
                                    { fullname }
                                </Link>
                            )
                        })}
                    </div>
                    <Link to="/nuevo-usuario" className="btn btn-success mt-3 mr-2">Añadir Usuario</Link>
                    <Link to="/salir" className="btn btn-danger mt-3">Desconectarme</Link>
                </div>
            </div>
        </div>
    )
}

export default Users;
