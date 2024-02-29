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


