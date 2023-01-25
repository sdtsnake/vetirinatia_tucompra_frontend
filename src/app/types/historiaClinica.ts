export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  documentoid: number;
}

export interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  usuario: Usuario;
  sexo: Sexo;
}

export interface HistoriaClinica {
  id: number;
  mascota: Mascota;
  fechaCreacion: string;
}

export interface CreacionHistoriaClinica {
  error?: string;
  data?: HistoriaClinica;
}
export interface CreacionDetalleHistoriaClinica {
  error?: string;
  data?: DetalleHistoriaClinica;
}

export interface ActualizaDetalleHistoriaClinica {
  error?: string;
  data?: DetalleHistoriaClinica;
}
export interface DetalleHistoriaClinica {
  id: number;
  temperatura: number;
  peso: number;
  frecuenciaCardiaca: number;
  frecuenciaRespiratoria: number;
  fechaHora: string;
  alimentacion: string;
  habitad: string;
  observacion: string;
  historiaClinica: HistoriaClinica;
  colaborador: Colaborador;
}

export interface DetalleHistoriaPostClinica {
  id: number;
  temperatura: number;
  peso: number;
  frecuenciaCardiaca: number;
  frecuenciaRespiratoria: number;
  fechaHora: string;
  alimentacion: string;
  habitad: string;
  observacion: string;
  idHistoriaClinica: number;
  idColaborador: number;
}

export interface Colaborador {
  id: string;
  nombre: string;
  apellido: string;
  cargo: string;
  especialidad: string;
  tipoDocumento: string;
  documentoIdentificacion: number;
}

export interface BorrarHistoriaClinica {
  error?: string;
}

export enum Sexo {
  Masculino,
  Femenino
}

