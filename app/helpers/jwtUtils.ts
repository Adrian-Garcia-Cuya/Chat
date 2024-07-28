import jwt, { Secret } from 'jsonwebtoken'

const generateJWT = ( userId: number ): Promise<string> => {
    const privateKey: Secret|undefined =  process.env.PRIVATE_KEY;

     if ( !privateKey ) {
        return Promise.reject( 'La llave secreta no está definida.' );
     }

    return new Promise( ( res, rej ) => {
        const payload = { userId };

        jwt.sign( payload, privateKey , {
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