import jwt, { Secret, verify } from 'jsonwebtoken'
import { Payload } from '../types/auth/Payload';
import User from '../models/userModel';
import { isPayload } from './predicates';

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

const verifyJWT = async( token: string ): Promise<User|undefined> => {

    const secretKey: Secret|undefined =  process.env.SECRET_KEY;
    try{
        if ( !secretKey ) {
            throw new Error( 'La llave secreta no está definida.' );
        }

        if ( token.length < 10 ) {
            throw new Error( 'Token invalido.' );
        }

        const payload = jwt.verify( token, secretKey );

        if ( !isPayload( payload ) ) {
            throw new Error( 'No se encontró el id del usuario en el payload.' );
        }

        const userId = payload.userId;
        const user = await User.findByPk( userId );
        if ( !user ) {
            throw new Error( 'Token invalido/ Usuario no existe.' );
        }
        if ( !user.state ) {
            throw new Error( 'Esta cuenta esta desactivada.' );
        }

        return user;

    } catch ( error: any ) {
        console.log(error);
    }
}

export {
    generateJWT,
    verifyJWT
};