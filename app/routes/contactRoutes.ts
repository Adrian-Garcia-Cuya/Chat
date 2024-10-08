import { Router } from "express";
import { body, param } from "express-validator";

import { destroy, store } from "../controllers/contactController";
import { checkJWT } from "../middlewares/jwtValidation";
import { checkContactExistence, checkContactIsFriend, checkValidationErrors } from "../middlewares/validationHandler";

const router = Router();

router.post( '/', [
    checkJWT,
    checkContactExistence,
    checkContactIsFriend,
    checkValidationErrors
], store);

router.delete( '/:phoneNumber', [
    checkJWT,
    checkContactExistence,
    checkValidationErrors
], destroy)

export default router;