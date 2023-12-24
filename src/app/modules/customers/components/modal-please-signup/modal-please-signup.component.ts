import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-please-signup',
  templateUrl: './modal-please-signup.component.html',
  styleUrls: ['./modal-please-signup.component.scss']
})
export class ModalPleaseSignupComponent {
  constructor(private router: Router) { }

  visible = false;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toSignUp() {
    this.router.navigate(['/registration']);
  }
}
