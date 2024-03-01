import User from '../users/user.model.js';

export const existeUsuarioById = async (id ='') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error (`The ID: ${email} does NOT EXIST`);
    }
};

export const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({email});
    if(existeEmail) {
        throw new Error(`The Email: ${email} has already been REGISTERED in the database`)
    }
};