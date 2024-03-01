import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from './user.model.js'

export const usuariosGet = async (req = request, res = response) => {
    const {limite, desde } = req.query;
    const query = {estado: true};
    const {total, usuarios} = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        msg: 'User ADDED',
        total,
        usuarios
    });
}

export const getUsuarioById = async (req, res) => {
    const {id} = req.params;
    const usuario = await User.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

export const usuariosPost = async (req, res) => {
    const {name, email, password} = req.body;
    const usuario = new User({ name, email, password});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        msg: 'User ADDED',
        usuario
    });
}

export const usuariosPut = async(req, res) => {
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    try {
        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'User NOT FOUND' });
        }

        if (usuario.email !== email) {
            return res.status(400).json({ msg: 'The current email does not match well with the one already registered.' });
        }

        await User.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({
            msg: 'User has been successfully UPDATED',
            id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'User error update'
        });
    }
};



