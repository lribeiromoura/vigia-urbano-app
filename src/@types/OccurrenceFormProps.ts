type OccurrenceFormProps = {
    address: string,
    cep: string,
    number: string,
    typeInformacao: string,
    detail: string,
}

type OccurrenceProps = {
    occurrenceId: string;
} & Pick<User, "uid"> & OccurrenceFormProps;