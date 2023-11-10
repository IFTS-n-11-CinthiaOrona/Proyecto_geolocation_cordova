import { Component } from '@angular/core';
import { ListaService } from '../services/lista.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  constructor(
     public listaService: ListaService
    ) {}

  /***
 * @function: agrega nuevas listas, llamando a aletController
 */
  async AgregarLista() {
    let alerta = await this.listaService.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Crear",
          handler: (data: any) => {
            let esValido: boolean = this.listaService.validarInput(data);
            if (esValido) {
              let creadaOk = this.listaService.crearLista(data.titulo);
              if (creadaOk) { //Se verifica si la variable tiene un valor, es decir, que fue creada
                this.listaService.presentToast('Lista creada correctamente!');
              }
            }
          }
        }
      ]
    })
    await alerta.present();
  }
  
  

}
