import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import User from "../models/userModel";
import { UserRequest } from "../types/UserRequest";
import { UserParams } from "../types/UserParams";

const store = async( req: Request<{}, {}, UserRequest>, res: Response ): Promise<void> => {

    const salt = bcryptjs.genSaltSync();

    let userData = req.body;
    userData.password = bcryptjs.hashSync( userData.password, salt );

    const user = await User.create( userData );
    
    res.status(201).json( user );
}

const update = async ( req: Request<UserParams, {}, UserRequest>, res: Response ): Promise<void> => {

    const { id } = req.params;
    const userData = req.body;

    const user = await User.findByPk( id );
    if( !user ) {
        res.status(400).json({
            msg: `No existe el usuario con id: ${ id }`
        });
        return;
    }

    await user.update( userData );
    res.json( user );
}

export {
    store,
    update
};