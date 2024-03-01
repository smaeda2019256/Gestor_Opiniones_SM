import { Router } from "express";
import { check } from "express-validator";
import {
    existenteEmail,
    existeUsuarioById,
} from "../helpers/db-validator.js";

import {
    usuariosGet,
    usuariosPost,
    usuariosPut,
} from "./user.controller.js";

import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.get("/", usuariosGet);


router.post(
    "/", [
        check("name", "The name is required").not().isEmpty(),
        check("password", "Password must be greater than 6 characters").isLength({min: 6,
        }),
        check("email", "The email entered is not valid ").isEmail(),
        check("email").custom(existenteEmail),
        validarCampos,
    ],
    usuariosPost
);


router.put(
    "/:id", [
        check("id", "The ID you entered is NOT VALID").isMongoId(),
        check("id").custom(existeUsuarioById),
        check('email', 'The actual email is obligatory').isEmail(),
        check('password', 'The actual password is obligatory').not().isEmpty(),
        check('newPassword', 'The new password is obligatory').not().isEmpty(),
        validarCampos,
    ],
    usuariosPut
);

export default router;