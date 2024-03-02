import express from 'express';
import { check } from 'express-validator';
import { 
    getPublications, 
    getPublicationById, 
    createPublication, 
    updatePublication, 
    publicationsDelete } from './publications.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validarCampos.js';
import { publicationExistsById } from '../helpers/db-validator.js';

const router = express.Router();

router.get('/', getPublications);

router.get('/:id', [
    check('id', 'The entered ID is invalid').isMongoId(),
    check('id').custom(publicationExistsById),
    validarCampos
], getPublicationById);

router.post('/', [
    check('title', 'The title is obligatory').not().isEmpty(),
    check('category', 'The category is obligatory').not().isEmpty(),
    check('description', 'The description is obligatory').not().isEmpty(),
    validarJWT,
    validarCampos
], createPublication);

router.put('/:id', [
    validarJWT,
    check('id', 'The entered ID is invalid').isMongoId(),
    check('id').custom(publicationExistsById),
    validarCampos
], updatePublication);


router.delete('/:id', [
    check('id', 'The entered ID is invalid').isMongoId(),
    check('id').custom(publicationExistsById),
    validarCampos
], publicationsDelete);

export default router;
