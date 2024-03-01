import {response, request} from "express";
import Comment from '../comments/comments.model.js';
import Usuario from '../users/user.model.js';
import jwt from 'jsonwebtoken';

export const commentsPost = async (req, res) => {
    const user = req.usuario;
    const {descriptionComent} = req.body;

    try{
        if (!descriptionComent) {
            return res.status(400).json({
                msg: 'Please, The description of the comments is required'
            });
        }

        const comment = new Comment({
            descriptionComent,
            idUser: user.email,
            idPublication: req.idPublication, 
        });

        await comment.save();

        res.status(200).json({
            msg: 'The Comment ADDED successfully',
            comment
        });

    }catch(error) {
        console.error('ERROR - Creating Comment: ', error);
        res.status(400).json({error: "ERROR - Creating Comment"});
    }
};

export const commentsGet = async (req = request, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};
    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        comments
    });
};