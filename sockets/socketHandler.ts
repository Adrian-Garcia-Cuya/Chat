import { Socket } from "socket.io";

const socketHandler = ( socket: Socket ) => {

    console.log( 'Conexion establecida.' );
}

export {
    socketHandler
};