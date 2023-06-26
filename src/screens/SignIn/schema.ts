import * as yup from 'yup';

export const signInSchema = yup.object({
    email: yup.string().required("O email é obrigatório").email('Digite um e-mail válido.'),
    password: yup.string().required("A senha é obrigatória").min(6, 'A senha deve ter no minimo 6 digitos.'),
});