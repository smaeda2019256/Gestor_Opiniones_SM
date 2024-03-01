import User from '../users/user.model.js';
import Publications from '../publications/publications.model.js';

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

export const publicationExistsById = async (id = '') => {
    const publication = await Publications.findById(id);
    if (!publication) {
        throw new Error('The publication was not found');
    }
};

export const publicationBelongsToUser = async (publicationId, userId) => {
    const publication = await Publications.findOne({ _id: publicationId, idUser: userId  });
    if (!publication) {
        throw new Error('he publication does not belong to the user');
    }
};