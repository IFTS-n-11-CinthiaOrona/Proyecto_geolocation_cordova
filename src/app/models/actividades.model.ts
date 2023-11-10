export class Actividad {
    descripcion: string;
    completado: boolean;

    constructor(nombre: string) {
        this.descripcion = nombre;
        this.completado = false;
    }
}
