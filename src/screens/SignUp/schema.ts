import * as yup from 'yup';

import { cpfRegex } from '../../utils/cpfRegex';

export const signUpSchema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
    CPF: yup.string().required("O CPF é obrigatório").matches(cpfRegex, 'Digite um CPF válido.'),
    email: yup.string().required("O email é obrigatório").email('Digite um e-mail válido.'),
    password: yup.string().required("A senha é obrigatória").min(6, 'A senha deve ter no minimo 6 digitos.'),
    confirmPassword: yup.string()
    .oneOf([yup.ref("password"), ''], "As senhas não conferem")
    .required("A confirmação da senha é obrigatória"),
});