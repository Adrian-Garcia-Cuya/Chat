import { ContactParams } from "../../../types/Contact/ContactParams";
import { ContactBody } from "../../../types/Contact/ContactRequest";
import { BaseRequest } from "../BaseRequest";

//NOTE: Estas interfaces se utilizan pero no necesariamente se requieren asi, ahora. Está, mas que todo, de ejemplo en caso se requira de esta forma mas adelante.
export interface CreateContactRequest extends BaseRequest<{}, {}, ContactBody, {}> {

}

export interface ContactRequest extends BaseRequest<ContactParams, {}, ContactBody, {}> {
    friendId?: number
}