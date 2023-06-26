import * as yup from 'yup';

export const confirmFormSchema = yup.object({
    address: yup.string(),
    cep: yup.string(),
    number: yup.string().required("Digite o número aproximado").min(1),
    typeInformacao: yup.string().required('Escolha o tipo de ocorrência'),
    detail: yup.string().required('Detalhe brevemente a ocorrência').min(10),
});