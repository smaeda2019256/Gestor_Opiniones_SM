import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';

export const validarJWT = async(req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No TOKEN in the request",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'User does NOT EXIST in the DB'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Invalid TOKEN - user with status: false'
            })
        }

        req.usuario = usuario;

        next();
    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "Invalid TOKEN",
            });
    }
};
