import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from './user.model.js'

export const usuariosGet = async(req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        msg: 'Added Users',
        total,
        usuarios,
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
    const { _id, password, newPassword, email,  ...resto } = req.body;

    try {
        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: 'User NOT FOUND' });
        }

        if (usuario.email !== email) {
            return res.status(400).json({ msg: 'The current email does not match well with the one already registered.' });
        }

        if (password && newPassword) {
            const passwordCorrect = bcryptjs.compareSync(password, usuario.password);
            if (!passwordCorrect) {
                return res.status(400).json({ msg: 'The current password is incorrect' });
            }
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(newPassword, salt);
        } else if (password || newPassword) {
            return res.status(400).json({ msg: 'Both the current password and the NEW password must be provided' });
        }

        await User.findByIdAndUpdate(id, resto, { new: true });

        res.status(200).json({
            msg: 'User has been successfully UPDATED',
            id,
            email
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'User error update'
        });
    }
};



