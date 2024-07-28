import { createServer, Server as HttpServer } from 'http';
import express, { Express } from 'express';
import { Server as ServerIO } from 'socket.io';
import cors from 'cors';

import { IServer, Path } from '../interfaces/IServer';
import connection from '../../config/database';

export default class Server implements IServer {

    public readonly port: string|undefined;
    public readonly app: Express;
    public readonly server: HttpServer;
    public readonly io: ServerIO;
    public readonly paths: Path;

    constructor() {
        this.port = process.env.PORT,
        this.app = express(),
        this.server = createServer( this.app ),
        this.io = new ServerIO( this.server ),
        this.paths = {
            auth: '/api/auth',
            users: '/api/users'
        }

        this.DBConnection();

        this.middlewares();
    }

    async DBConnection(): Promise<void> {
        try {
            await connection.authenticate();
            console.log( 'Base de datos conectada.' );
        } catch( error ){
            throw new Error( 'No se puede establecer conexión con la base de datos' );
        }
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    public listen(): void {
        this.server.listen( this.port, () => {
            console.log( 'Escuchando al puerto:', this.port );
        })
    }
}