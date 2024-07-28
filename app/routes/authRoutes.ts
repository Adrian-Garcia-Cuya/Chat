import { Router } from "express";
import { body } from "express-validator";

import { login } from "../controllers/authController";
import { checkValidationErrors } from "../middlewares/validationHandler";

const router = Router();

router.post( 'login', [
    body( 'email', 'Por favor, ingrese un correo válido' ).notEmpty().isEmail(),
    body( 'password', 'Debe ingresar una contraseña.' ).notEmpty(),
    checkValidationErrors
], login );

export default router;