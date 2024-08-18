import Friend from "../models/friendModel";
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

const checkContactExistence = async( phoneNumber: string ): Promise<void> => {
    const user = await User.findOne({ where: { 
            phone_number: phoneNumber,
            state: true 
        }}
    );
    if ( !user ) {
        throw new Error( `El usuario con el número ${phoneNumber} no existe o tiene la cuenta inactiva.` );
    }
}

const checkContactIsFriend = async( userId: string, phoneNumber: string ): Promise<User> => {
    const friend = await User.findOne({ where: { 
            phone_number: phoneNumber,
        }}
    );
    const isFriend = await Friend.findOne({ where: {
            user1_id: userId,
            user2_id: friend!.id,
        }}
    );

    if ( isFriend ) {
        throw new Error( 'Ya tienes registrado a este contacto.' );
    }

    return friend!;
}

export {
    checkEmailNotInUse,
    checkUserExistence,
    checkContactExistence,
    checkContactIsFriend
}