import { Router } from "express";
import { body, param } from "express-validator";

import { store, update } from "../controllers/userController";
import { checkValidationErrors } from "../middlewares/validationHandler";
import { checkJWT } from "../middlewares/jwtValidation";
import { checkEmailNotInUse, checkUserExistence } from "../helpers/customValidations";

const router = Router();

router.post( '/', [
    body('name', 'Es necesario agregar un nombre.').notEmpty(),
    body('email', 'El email no es valido.').notEmpty().isEmail().isString().trim(),
    body('email', ).custom( checkEmailNotInUse ),
    body('password', 'La contraseña no puede estar vacia y debe ser mayor a 8 caracteres.').notEmpty().isLength({ min: 8 }),
    body('phone', 'El numero ingresado no debe ser mayor ni menor a 9 digitos.').notEmpty().isInt().isLength({ min: 9, max: 9}),
    body('image_url', 'Debe ingresar una URL valida.').optional().isString(),
    body('state').isBoolean().optional(),
    checkValidationErrors
], store );

router.put( '/:id', [
    param('id', 'El id debe ser un entero.').isInt(),
    param('id').custom( checkUserExistence ),
    body('name', 'Es necesario agregar un nombre.').notEmpty().optional(),
    body('phone', 'El numero ingresado no debe ser mayor ni menor a 9 digitos.').notEmpty().isInt().isLength({ min: 9, max: 9}).optional(),
    body('image_url', 'Debe ingresar una URL valida.').optional().isString(),
    checkJWT,
    checkValidationErrors
], update );

export default router;