import { Socket } from "socket.io";
import { verifyJWT } from "../app/helpers/jwtUtils";
import { isString } from "../app/helpers/predicates";
import { IMessageInformation } from "../app/interfaces/Socket/IMessageInformation";

const socketHandler = async( socket: Socket ) => {

    console.log( 'Conexion establecida.' );
    const token = socket.handshake.headers['x-token'];
    if ( !isString( token ) ) {
        console.error('Token invalido o ausente.')
        return socket.disconnect();
    }
    const user = await verifyJWT( JSON.parse(token) );
    if ( !user ) {
        return socket.disconnect();
    }

    socket.join(String(user.id));

    socket.on('send-message', ( { userId, message }: IMessageInformation ): void => {
        socket.to( String( userId ) ).emit( 'private-message', { by: user.name, message } );
    });

}



export {
    socketHandler
};