import jwt from 'jsonwebtoken';
import Usuario from '../users/user.model.js';

export const validarJWT = async(req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "There is NO TOKEN in the request",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'User does NOT EXIST in the database'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'INVALID TOKEN - User with status: false'
            })
        }
        req.usuario = usuario;

        next();
    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "INVALID TOKEN",
            });
    }
};

export const validarJWTCMNT = async(req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "There is NO TOKEN in the request",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: 'User does NOT EXIST in the database'
            })
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'INVALID TOKEN - User with status: false'
            })
        }

        req.usuario = usuario;

        const idPublication = req.params.idPublication;
        if (!idPublication) {
            return res.status(400).json({
                msg: 'Publication ID is MISSING in the request'
            });
        }

        req.idPublication = idPublication;

        next();
    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "INVALID TOKEN",
            });
    }
};