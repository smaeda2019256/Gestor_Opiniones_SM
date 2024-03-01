import { response, request } from "express";
import Publication from './publications.model.js';
import Usuario from '../users/user.model.js';


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


export const updatePublication = async (req, res) => {
    const id = req.params.id;
    const { title, category, description } = req.body;
    try {
        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }
        if (publication.idUser !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permiso para actualizar esta publicación' });
        }
        publication.title = title;
        publication.category = category;
        publication.description = description;
        await publication.save();
        res.json(publication);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
};


export const deletePublication = async (req, res) => {
    const id = req.params.id;
    try {
        const publication = await Publication.findById(id);
        if (!publication) {
            return res.status(404).json({ error: 'Publicación no encontrada' });
        }
        if (publication.idUser !== req.user.id) {
            return res.status(403).json({ error: 'No tienes permiso para eliminar esta publicación' });
        }
        await publication.remove();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la publicación' });
    }
};
