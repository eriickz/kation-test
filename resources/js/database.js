import axios from 'axios';
import Swal from 'sweetalert2';

export const login = async (email, password) => {
    try {
        const response = await axios.post("/api/auth/login", { email, password }).then(res => res);

        if ( response.status === 200 ) {
            axios.defaults.headers.common = {'Authorization': `Bearer ${response.data.token}`};
            sessionStorage.setItem('token', response.data.token);

            return response.data.user;
        }
    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const register = async (email, password, name, lastname) => {
    try {
        const response = await axios.put("/api/auth/register", { email, password, name, lastname }).then(res => res);

        if ( response.status === 201 ) {

            Swal.fire({
                title: '¡Enhorabuena!',
                text: 'El usuario ha sido agregado sastifactoriamente.',
                icon: 'success',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ok'
            });

            return response.data.user;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const getUsers = async () => {
    try {
        const response = await axios.get("/api/auth/users").then(res => res);

        if ( response.status === 200 ) {
            return response.data.users;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const getUser = async (userId) => {
    try {
        const response = await axios.get("/api/auth/user/" + userId).then(res => res);

        if ( response.status === 200 ) {
            return response.data.user[0];
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const updateUser = async (userId, data) => {
    try {
        const response = await axios.post("/api/auth/user/" + userId, { data }).then(res => res);

        if ( response.status === 200 ) {

            Swal.fire({
                title: '¡Enhorabuena!',
                text: 'Los datos del usuario han sido actualizados correctamente.',
                icon: 'success',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ok'
            });

            return response.data;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete("/api/auth/user/" + userId).then(res => res);

        if ( response.status === 200 ) {

            Swal.fire({
                title: '¡Enhorabuena!',
                text: 'El usuario ha sido eliminado con éxito.',
                icon: 'success',
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ok'
            });

            return response.data;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const recoverByEmail = async (email) => {
    try {
        const response = await axios.post("/api/auth/checkEmail", { email }).then(res => res);

        if ( response.status === 200 ) {
            return response.data;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const changePassword = async (email, password) => {
    try {
        const response = await axios.post("/api/auth/changePassword", { email, password }).then(res => res);

        if ( response.status === 200 ) {
            return response.data;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}

export const logout = async () => {
    try {
        const response = await axios.get("/api/auth/logout").then(res => res);

        if ( response.status === 200 ) {
            return response.data;
        }

    } catch (e) {
        const title = `Error ${e.response.status}:`;
        const message = e.response.data;

        Swal.fire({
            title: title,
            text: message,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar'
        });
    }
}
