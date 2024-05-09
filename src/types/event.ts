export type Event = {
  cdRegistroEvento: number;
  nomeEvento: string;
  statusEvento: string;
  complementoEvento: string;
  motivoCancelamentoEvento: string | null;
  valorIngresso: number | null;
  nomeResponsavel: string;
  dtInicio: string;
  dtEncerramento: string;
  numeroMaximoParticipantes: number;
  dtRegistroEvento: string;
  dtUltimaAtualizacaoEvento: string | null;
  endereco: {
    cdEnderecoEvento: number;
    numeroCEP: string;
    estado: string;
    cidade: string;
    numero: string;
    logradouro: string;
    complemento: string;
  };
};
