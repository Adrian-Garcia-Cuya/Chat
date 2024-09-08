import User from "../models/userModel";

const checkEmailNotInUse = async( email: string ): Promise<void> => {
    const user = await User.findOne({ where: { email } });
    if ( user ) {
        throw new Error( `El correo ${ email } ya se encuentra registrado.` );
    }
}

const checkUserExistence = async( id: number ): Promise<boolean> => {
    const user = await User.findByPk( id );
    if ( !user ) {
        throw new Error( `El usuario con id ${id} no existe.` );
    }

    return true;
}

export {
    checkEmailNotInUse,
    checkUserExistence
}