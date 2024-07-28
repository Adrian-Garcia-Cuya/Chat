import { createServer, Server as HttpServer } from 'http';
import express, { Express } from 'express';
import { Server as ServerIO } from 'socket.io';
import cors from 'cors';

import { IServer, Path } from '../interfaces/IServer';

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
    }

    public listen(): void {
        this.server.listen( this.port, () => {
            console.log( 'Escuchando al puerto:', this.port );
        })
    }
}