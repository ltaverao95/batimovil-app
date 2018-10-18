import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServicesProvider } from '../../providers/common-services/common-services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [CommonServicesProvider]
})
export class HomePage {

  coordinatesForm = new FormGroup({
    latitude: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
  });

  constructor(public navCtrl: NavController, 
              private commonServices: CommonServicesProvider,
              private alertCtrl: AlertController) {

  }

  sendCoordinates(){

    if(this.coordinatesForm.invalid){
      let alert = this.alertCtrl.create({
        title: 'Mensaje',
        message: 'Debes completar todos los campos primero',
        buttons: [
          {
            text: 'Cerrar',
            role: 'close',
            handler: () => {
              
            }
          }
        ]
      });
  
      alert.present();
      return;
    }

    let coordinates: string = this.coordinatesForm.controls.latitude.value + "," + this.coordinatesForm.controls.longitude.value;

    console.log(coordinates);

    this.commonServices.writeSendCoordinates(coordinates);

    this.coordinatesForm.reset();
  }
}
