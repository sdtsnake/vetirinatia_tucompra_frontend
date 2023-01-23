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
  sexo: number;
}

export interface HistoriaClinica {
  id: number;
  mascota: Mascota;
  fechaCreacion: Date;
}

export interface CreacionHistoriaClinica {
  error?: string;
  data?: HistoriaClinica;
}

export interface DetalleHistoriaClinica {
  id: number;
  temperatura: number;
  peso: number;
  frecuenciaCardiaca: number;
  frecuenciaRespiratoria: number;
  fehaHora: Date;
  alimentacion: string;
  habitad: string;
  observacion: string;
  historiaClinica: HistoriaClinica;
  colaborador: Colaborador;
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

