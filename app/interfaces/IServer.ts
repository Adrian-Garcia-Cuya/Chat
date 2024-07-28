import { Express } from "express"
import { Server as ServerIo } from "socket.io"
import { Server as HttpServer } from "http"

export interface IServer {
    port: string | undefined,
    app: Express,
    server: HttpServer
    io: ServerIo,
    paths: Path
    DBConnection: () => Promise<void>,
    routes: () => void,
    sockets: () => void,
    listen: () => void
}

export interface Path {
    auth: string,
    users: string
}