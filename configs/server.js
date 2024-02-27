'use strict'

import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'; 
import { dbConnection } from "./mongo.js";

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();
    }

    async conectarDB(){
        await dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server Running on Port: ', this.port);
        });
    }
}

export default Server;
