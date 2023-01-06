import { Component } from '@angular/core';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {


  constructor(private modalSS: SwitchService){

  }

  closeModal(){
    this.modalSS.$modal.emit(false)
  }
}
