import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  unpairedDevices: Array<any>;
  pairedDevices: Array<any>;
  gettingDevices: Boolean;

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();
  }

  startScanning() {
    this.pairedDevices = new Array<any>();
    this.unpairedDevices = new Array<any>();
    this.gettingDevices = true;

    this.bluetoothSerial.discoverUnpaired().then((success) => {
      this.unpairedDevices = success;
      this.gettingDevices = false;
      success.forEach(
        element => {
          console.log(element.name);
        }
      );
    },
      (err) => {
        console.log(err);
      }
    );

    this.bluetoothSerial.list().then(
      (success) => {
        this.pairedDevices = success;
      },
      (err) => {

      }
    );
  }
  
  success = (data) => alert(data);
  fail = (error) => alert(error);

  selectDevice(address: any) {

    let alert = this.alertCtrl.create({
      title: 'Establecer Conexión',
      message: '¿Te gustaría conectarte a este dispositivo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conectar',
          handler: () => {
            this.bluetoothSerial.connect(address).subscribe(this.success, this.fail);
          }
        }
      ]
    });

    alert.present();
  }

  disconnect() {
    let alert = this.alertCtrl.create({
      title: '¿Desconectar?',
      message: '¿Te Gustaría desconectarte?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Desconectar',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    alert.present();
  }
}
