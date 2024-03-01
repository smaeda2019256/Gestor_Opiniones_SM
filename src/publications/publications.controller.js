import { response, request } from "express";
import Publication from './publications.model.js';
import Usuario from '../users/user.model.js';
import jwt from "jsonwebtoken";

export const getPublications = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, publication] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        publication,
    });
};

export const createPublication = async (req, res) => {
    const user = req.usuario;
    const { title, category, description } = req.body;

    try {
        const publication = new Publication({
            title,
            category,
            description,
            idUser: user.email,
        });

        await publication.save();

        res.status(200).json({
            msg: 'Publication added successfully',
            publication
        });
    } catch (error) {
        console.error('Error creating publication:', error);
        res.status(500).json({ error: 'Error creating publication' });
    }
};


export const getPublicationById = async (req, res) => {
    const { id } = req.params;
    const publication = await Publication.findOne({ _id: id });

    res.status(200).json({
        publication
    })
};


export const updatePublication = async (req, res) => {
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


export const publicationsDelete = async (req, res) => {
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
