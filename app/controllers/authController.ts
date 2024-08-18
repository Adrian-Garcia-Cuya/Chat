import bcryptjs from 'bcryptjs';
import { Request, Response } from 'express';

import User from '../models/userModel'
import { generateJWT } from '../helpers/jwtUtils';

import { Login } from '../types/auth/Login';

const login = async ( req: Request<{}, {}, Login>, res: Response ) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: {email} });

        if ( !user ) {
            return res.json({
                msg: 'El correo o contraseña es incorrecta.'
            });
        }

        const validatePassword: boolean = bcryptjs.compareSync( password, user.password );
        if( !validatePassword ) {
            return res.json({
                msg: 'La contraseña es incorrecta.'
            });
        }

        if ( !user.state ) {
            return res.json({
               msg: 'La cuenta esta desactivada.' 
            });
        }

        const token: string = await generateJWT( String(user.id) );

        res.json({
            user,
            token
        });
    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            msg: 'Contacte con el administrador.'
        });
    }
}



export { login };
