import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.models';
import { ListaService } from 'src/app/services/lista.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {
  /**
   * Esta variable global recibe el tab en el que se encuentra el usuario 'hacer', 'haciendo', 'terminado'
   */
  @Input() tipo: string = '';

  constructor(   
    public listaService: ListaService,
    private roter: Router,
    
  ) {
    
   }

  
  /**
   * @function: Funcion para editar el nombre de la lista, mediante alertController
   * @param lista espera una lista por parametro
   */
  async EditarLista(lista: Lista) {
    let alerta = await this.listaService.alertController.create({
      header: "Editar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nuevo nombre de la lista",
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Editar",
          handler: (data: any) => {
            let esValido: boolean = this.listaService.validarInput(data);
            if (esValido) {
              lista.titulo = data.titulo,
                this.listaService.editarLista(lista);
              this.listaService.presentToast('Lista editada correctamente!');
            }
          }
        }
      ]
    })
    await alerta.present();
  }


  /**
   * 
   * @param listaItem espera una lista por parametro para editarla
   */
  editarLista(listaItem: Lista) {
    this.EditarLista(listaItem);
  }

  /**
   * 
   * @param listaItem espera una lista por parametro para eliminarla
   */
  eliminarLista(listaItem: Lista) {
    this.listaService.eliminarLista(listaItem);
    this.listaService.presentToast('Lista eliminada correctamente!');
  }


  listaSeleccionada(listaItem: Lista) {
    const URL = '/agregar/' + listaItem.id
    this.roter.navigateByUrl(URL);

  }
}
