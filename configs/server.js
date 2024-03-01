'use strict'

import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'; 
import { dbConnection } from "./mongo.js";
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import publicationRoutes from '../src/publications/publications.routes.js';
import commentRoutes from '../src/comments/comments.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        this.publicationPath = '/api/publications';
        this.commentPath = '/api/comment'

        this.conectarDB();

        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.commentPath , commentRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server Running on Port: ', this.port);
        });
    }
}

export default Server;
