import * as yup from 'yup';

export const homeSchema = yup.object({
    search: yup.string().required("Digite o endereço na busca."),
});