import jwt, { Secret } from 'jsonwebtoken'
import { Payload } from '../types/UserRequest';

const generateJWT = ( userId: string ): Promise<string> => {
    const secretKey: Secret|undefined =  process.env.SECRET_KEY;

     if ( !secretKey ) {
        return Promise.reject( 'La llave secreta no está definida.' );
     }

    return new Promise( ( res, rej ) => {
        const payload: Payload = { userId };

        jwt.sign( payload, secretKey, {
            expiresIn: '4h',
            }, ( error, token ) => {
                if ( error ) {
                    console.error( error );
                    rej( 'No se puede generar el JWT.' );
                } else if (token) {
                    res( token );
                }else {
                    rej( 'Token no definido' );
                }
            });
    });
}

export {
    generateJWT
};