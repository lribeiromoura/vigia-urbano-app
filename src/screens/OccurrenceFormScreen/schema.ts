import * as yup from 'yup';

export const confirmFormSchema = yup.object({
    address: yup.string(),
    cep: yup.string(),
    number: yup.string().required("Digite o número aproximado").min(1, "Digite o número aproximado"),
    typeInformacao: yup.string().required('Escolha o tipo de ocorrência'),
    detail: yup.string().required('Detalhe brevemente a ocorrência').min(10, 'Deve ter ao menos 10 caracteres'),
});