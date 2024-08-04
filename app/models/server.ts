import { createServer, Server as HttpServer } from 'http';
import express, { Express } from 'express';
import { Server as ServerIO } from 'socket.io';
import cors from 'cors';

import { IServer, Path } from '../interfaces/models/IServer';
import connection from '../../config/database';
import { socketHandler } from '../../sockets/socketHandler';

import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';

export default class Server implements IServer {

    public readonly port: number;
    public readonly app: Express;
    public readonly server: HttpServer;
    public readonly io: ServerIO;
    public readonly paths: Path;

    constructor() {
        this.port = Number(process.env.PORT) ?? 3000,
        this.app = express(),
        this.server = createServer( this.app ),
        this.io = new ServerIO( this.server ),
        this.paths = {
            auth: '/api/auth',
            users: '/api/users'
        }

        this.DBConnection();

        this.middlewares();
        this.routes();

        this.sockets();
    }

    async DBConnection(): Promise<void> {
        try {
            await connection.authenticate();
            console.log( 'Base de datos conectada.' );
        } catch( error ){
            throw new Error( 'No se puede establecer conexión con la base de datos' );
        }
    }

    middlewares(): void {
        this.app.use( cors() );
        this.app.use( express.json() );
    }

    routes(): void {
        this.app.use( this.paths.auth, authRoutes );
        this.app.use( this.paths.users, userRoutes );
    }

    sockets(): void {
        this.io.on( 'connection', socketHandler );
    }

    public listen(): void {
        this.server.listen( this.port, () => {
            console.log( 'Escuchando al puerto:', this.port );
        })
    }
}