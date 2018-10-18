import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CommonServicesProvider {

  unpairedDevices: Array<any>;
  pairedDevices: Array<any>;
  gettingDevices: Boolean;
  devicePaired: Boolean;

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) {
    bluetoothSerial.enable();
  }

  startScanning() {
    
    this.pairedDevices = new Array<any>();
    this.unpairedDevices = new Array<any>();
    this.gettingDevices = true;

    this.bluetoothSerial.discoverUnpaired().then((unpairedDevicesResponseList) => {
      this.unpairedDevices = unpairedDevicesResponseList;
      this.gettingDevices = false;
      unpairedDevicesResponseList.forEach(
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
      (pairedDevicesResultList) => {
        this.pairedDevices = pairedDevicesResultList;
      },
      (err) => {

      }
    );
  }
  
  success(data: any){
    this.devicePaired = true;
    alert(data);
  }

  fail(error: any){
    this.devicePaired = false;
    alert(error);
  }

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
            this.devicePaired = false;
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });

    alert.present();
  }

  /*
    1 = forward
    2 = backward
    3 = left
    4 = right
    5 = stop
  */

  writeMoveForward(){
    this.bluetoothSerial.write('1');
  }

  writeMoveBackward(){
    this.bluetoothSerial.write('2');
  }

  writeMoveLeft(){
    this.bluetoothSerial.write('3');
  }

  writeMoveRight(){
    this.bluetoothSerial.write('4');
  }

  writeStop(){
    this.bluetoothSerial.write('5');
  }
}
