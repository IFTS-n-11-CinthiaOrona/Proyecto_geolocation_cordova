import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.models';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  public listas: Lista[] = [];  //Almacenamos las listas

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
  ) {
    this.cargarStorage(); //Cargamos el local storage al iniciar la aplicación
   }

  /**
   * Funcion para crear listas de actividades que se agregan a una variable contenedora de listas
   * @param nombreLista Refiere al objeto lista que se va a crear
   */
  crearLista(nombreLista: string) {
    let ObjetoLista = new Lista(nombreLista);
    this.listas.push(ObjetoLista); //ingresamos en el array de listas el objeto con los datos creados
    this.guardarStorage(); //Guardamos la lista en el local storage

    return ObjetoLista.titulo;
  }

  /**
   * 
   * @Funcion para guardar la lista ya creada en el local storage, como persistencua de datos.
   */
  guardarStorage() {
    let stringListas: string = JSON.stringify(this.listas); //Convertimos el array de listas en texto plano
    localStorage.setItem('listas', stringListas); //Se debe ingresar dos parámetros, el primero un nombre y el segundo el contenido
  }

  /**
   * @Funcion
   * @returns devuelve la lista de actividades creadas desde el local storage
   */
  cargarStorage(): any {
    const listaStorage = localStorage.getItem('listas'); //Se debe ingresar el parámetro con el nombre del objeto que queremos recuperar
    if (listaStorage === null) {
      return this.listas = []; //Si el Storage está vacío devolvemos el objeto listas vacío también
    }
    let objLista = JSON.parse(listaStorage); //Convierte el texto plano a objeto para poder ingresarlo
    this.listas = objLista;
  }


  /**
   * @function: Filtra el elemento lista y devuelve un nuevo arreglo de listas.
   * @param lista le pasamos un elemento lista, del array de listas, para eliminarlo.
   */
  eliminarLista(lista: Lista) {
    let nuevoListado = this.listas.filter((listaItem) => listaItem.id !== lista.id); //Guardamos todas las listas menos la lista a eliminar
    //filter devuelve un arreglo de listas
    this.listas = nuevoListado;

    this.guardarStorage();
  }


/**
 * @function: Encuentra por el id la lista a editar y le modifica el "titulo" por ahora.
 * @param lista le pasamos un elemento lista, del array de listas, para editarla.
 */
  editarLista(lista: Lista) {
    let listaEditar = this.listas.find((listaItem) => listaItem.id == lista.id);
    if (listaEditar) {
      listaEditar.titulo = lista.titulo;
      this.guardarStorage();
    }
  }


  /**
   * @function: presentToast: muestra un cartel en pantalla
   * @param mensage Se debe enviar el mensaje a mostrar
   */
  async presentToast(mensage: string) {
    let toast = await this.toastController.create({
      message: mensage,
      duration: 2000
    });
    toast.present();
  }

  /**
   * La funcion valida si existe el valor y si esta vacio
   * @param input 
   * @returns devuelve un valor booleano
   */
  validarInput(input: any): boolean {
    if (input && input.titulo) {
      return true;
    }
    this.presentToast('Debe ingresar un valor');
    return false;
  }

  obtenerLista(idLista: string | number) {
    const id = Number(idLista); //Parseamos el dato a Number, por si viene de tipo string, de esta manera siempre trabajaremos con un Number
    let lista = this.listas.find((itemLista) => itemLista.id == id);
    return lista;
  }

  

}
