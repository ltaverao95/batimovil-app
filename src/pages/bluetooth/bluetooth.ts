import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';

@IonicPage()
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
  providers: [CommonServicesProvider]
})
export class BluetoothPage {

  unpairedDevices: Array<any>;
  pairedDevices: Array<any>;
  gettingDevices: Boolean;
  devicePaired: Boolean;

  constructor(private commonServices: CommonServicesProvider) {
    this.unpairedDevices = commonServices.unpairedDevices;
    this.pairedDevices = commonServices.pairedDevices;
    this.gettingDevices = commonServices.gettingDevices;
    this.devicePaired = commonServices.devicePaired;
  }

  startScanning(){
    this.commonServices.startScanning();
  }  

  selectDevice(address: any) {
    this.commonServices.selectDevice(address);
  }

  disconnect() {
    this.commonServices.disconnect();
  }

  moveForward(){
    this.commonServices.writeMoveForward();
  }

  moveBackward(){
    this.commonServices.writeMoveBackward();
  }

  moveLeft(){
    this.commonServices.writeMoveLeft();
  }

  moveRight(){
    this.commonServices.writeMoveRight();
  }

  stop(){
    this.commonServices.writeStop();
  }
}
