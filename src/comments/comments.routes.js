import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
    commentsGet,
    commentsPost,
    commentsPut,
    commentsDelete
} from "./comments.controller.js";
import {
    existeCommentsById,
} from "../helpers/db-validator.js";
import { validarJWTCMNT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get("/", commentsGet);

router.post(
    "/:idPublication", [
        check("descriptionComment", "The description is obligatory").not().isEmpty(),
        validarJWTCMNT,
        validarCampos,
    ],
    commentsPost
);

router.put(
    "/:id", [
        check("id", "The ID you entered is NOT VALID").isMongoId(),
        check("id").custom(existeCommentsById),
        validarCampos,
    ],
    commentsPut
);

router.delete(
    "/:id", [
        check("id", "The ID you entered is NOT VALID").isMongoId(),
        check("id").custom(existeCommentsById),
        validarCampos,
    ],
    commentsDelete
);

export default router;