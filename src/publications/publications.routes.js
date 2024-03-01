import express from 'express';
import { check } from 'express-validator';
import { 
    getPublications, 
    getPublicationById, 
    createPublication, 
    updatePublication, 
    deletePublication } from './publications.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { publicationExistsById, publicationBelongsToUser } from '../helpers/db-validator.js';

const router = express.Router();

router.get('/publications', getPublications);

router.get('/publications/:id', [
    check('id', 'El ID ingresado no es válido').isMongoId(),
    check('id').custom(publicationExistsById),
    check('id').custom(publicationBelongsToUser),
    validarCampos
], getPublicationById);

router.post('/publications', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('category', 'La categoría es obligatoria').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    validarJWT,
    validarCampos
], createPublication);

router.put('/publications/:id', [
    check('id', 'El ID ingresado no es válido').isMongoId(),
    check('id').custom(publicationExistsById),
    check('id').custom(publicationBelongsToUser), 
    validarJWT,
    validarCampos
], updatePublication);


router.delete('/publications/:id', [
    check('id', 'El ID ingresado no es válido').isMongoId(),
    check('id').custom(publicationExistsById),
    check('id').custom(publicationBelongsToUser),
    validarJWT,
    validarCampos
], deletePublication);

export default router;
