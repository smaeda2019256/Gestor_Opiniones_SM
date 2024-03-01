import { response, request } from "express";
import Publication from './publications.model.js';
import Usuario from '../users/user.model.js';
import jwt from "jsonwebtoken";


export const createPublication = async (req = request, res = response) => {
    const { idUser, title, category, description } = req.body;
    try {
        const publication = new Publication({ idUser, title, category, description });
        await publication.save();
        res.status(201).json(publication);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar la publicación' });
    }
};


export const getPublications = async (req, res) => {
    try {
        const publications = await Publication.find();
        res.json(publications);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
};


export const getPublicationById = async (req, res) => {
    const { id } = req.params;
    const publications = await Publication.findOne({ _id: id });

    res.status(200).json({
        publications
    })
};


export const updatePublication = async(req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    try {
        const token = req.header("x-token");
        if (!token) {
            return res.status(401).json({ msg: "There is no token in the request" });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({ msg: 'User does not exist in the database' });
        }

        await Publication.findByIdAndUpdate(id, resto);

        const publications = await Publication.findOne({ _id: id });

        res.status(200).json({ msg: 'Updated Publication', publications });
    } catch (error) {
        console.error('Error updating publication:', error);
        res.status(500).json({ error: 'Error updating publication' });
    }
};


export const publicationsDelete = async(req, res) => {
    const { id } = req.params;

    try {
        const token = req.header("x-token");
        if (!token) {
            return res.status(401).json({ msg: "There is no token in the request" });
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({ msg: 'User does not exist in the database' });
        }

        const publication = await Publication.findByIdAndUpdate(id, { estado: false });
        if (!publication) {
            return res.status(404).json({ msg: 'Publication not found' });
        }

        res.status(200).json({ msg: 'Publication deleted successfully', publication, usuario });
    } catch (error) {
        console.error('Error deleting publication:', error);
        res.status(500).json({ error: 'Error deleting publication' });
    }
};
