import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../services/lista.service';
import { Lista } from '../models/lista.models';
import { Actividad } from '../models/actividades.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string;

  /**
   * 
   * @param router 
   * @param listaService
   */
  constructor(
    private router: ActivatedRoute,
    public listaService: ListaService    
  ) { 
    let idLista = this.router.snapshot.paramMap.get('idLista');

    this.lista = new Lista('');
    this.nombreItem = '';

    /**
     * Si se obtiene el IdLista, se obtiene la lista del servicio
     */
    if(idLista){
      let objetoLista = this.listaService.obtenerLista(idLista);
      if(objetoLista){
        this.lista = objetoLista;
      }
    }
  }


  ngOnInit() {
  }

  agregar() {
    if (this.nombreItem.length === 0) {
      return
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaService.guardarStorage();
    this.nombreItem = '';
  }

  editar(actividad: Actividad) {
    this.EditarActividad(actividad);
  }
  eliminar(actividad: Actividad) {
    this.lista.item = this.lista.item.filter((item) => item !== actividad);
    this.listaService.guardarStorage();
  }

  /**
   * Cuando el check queda marcado como completado, se cambia el estado de la lista a true en LS.
   */
  cambioCkeck() {
    const pendientes = this.lista.item.filter((item) => item.completado == false).length;
    if (pendientes == 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = undefined;
    }

    this.listaService.guardarStorage();
  }

  /**
   * 
   * @param actividad espera una actividad por parametro para editarla
   */
  async EditarActividad(actividad: Actividad) {
    let alerta = await this.listaService.alertController.create({
      header: "Editar actividad",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nuevo nombre de la actividad",
          value: actividad.descripcion
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
              actividad.descripcion = data.titulo,
                this.listaService.guardarStorage();
              this.listaService.presentToast('Lista editada correctamente!');
            }
          }
        }
      ]
    })
    await alerta.present();
  }


}
