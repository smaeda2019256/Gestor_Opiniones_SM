import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';
import validator from 'validator';

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        let usuario;
        if (validator.isEmail(email)) {
            usuario = await Usuario.findOne({ email: email });
        } else {
            usuario = await Usuario.findOne({ name: email });
        }

        if (!usuario) {
            return res.status(400).json({
                msg: "Incorrect credentials, email or user name does NOT EXIST in the database",
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "The password is INCORRECT",
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'WELCOME - Successful login',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact the administrator",
        });
    }
}