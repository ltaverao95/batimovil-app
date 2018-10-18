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

  constructor(public commonServices: CommonServicesProvider) {

  }

  startScanning(){
    this.commonServices.startScanning();
  }  

  selectDevice(address: any) {
    this.commonServices.selectDevice(address);
  }

  disconnect() {
    this.stop();
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
