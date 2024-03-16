import { configure, defineRule } from "vee-validate";
import { required, max_value, email, integer, min_value, max } from "@vee-validate/rules";

defineRule("required", required)
defineRule("max_value", max_value)
defineRule("min_value", min_value)
defineRule("max", max)
defineRule("email", email)
defineRule("integer", integer)


configure({
    generateMessage: (context) => {
        if (context.rule?.name === "required") {
            return `El campo ${context.field} es requerido`;
        }

        if (context.rule?.name === "email") {
            return `El campo ${context.field} no cumple con el formato de email`;
        }

        if (context.rule?.name === "integer") {
            return `El campo ${context.field} no es un número entero`;
        }

        if (context.rule?.name === "max_value") {
            return `El campo ${context.field} no puede ser mayor a ${context?.rule?.params}`;
        }

        if (context.rule?.name === "min_value") {
            return `El campo ${context.field} no puede ser menor a ${context?.rule?.params}`;
        }

        if (context.rule?.name === "max") {
            return `El campo ${context.field} no puede ser mayor a ${context?.rule?.params} caracteres`;
        }

        return ``;
    },
});