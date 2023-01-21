export interface Usuario{
    id:number;
    nombre:string;
    apellido:string;
    documentoid:number;
} 

export interface Mascota{
    id:number;
    nombre:string;
    raza:string;
    usuario:Usuario;
    sexo:number;
}

export interface HistoriaClinica{
    id:number;
    mascota:Mascota;
    fechaCreacion:Date;
}

export interface CreacionHistoriaClinica{
    error?:string;
    data?:HistoriaClinica;
}

