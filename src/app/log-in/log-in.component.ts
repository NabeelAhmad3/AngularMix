import { CommonModule, JsonPipe } from '@angular/common';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule,JsonPipe],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent  implements AfterViewInit{
  data: any = {};
  myValues: any[] = [];
  constructor(private renderer: Renderer2) {}

  onSubmit(form:NgForm) {
    if (form.invalid) {
       return; 
      }
    this.myValues.push(this.data);
    this.reset();
  }
  reset() {
    this.data = {};
  }
  googleLogUrl = 'https://accounts.google.com/v3/signin/identifier?dsh=S34321812%3A1689766128107239&hl=en_GB&ifkv=AeDOFXjVb8dV0EgcaUCimuPD3ioRs9_qp8ZtcARJBFX6hVBHYt1CqE-KgKnvn8LkYbSQjzeGIsAn&flowName=GlifWebSignIn&flowEntry=ServiceLogin ';
  faceboobLogUrl = 'https://www.facebook.com/login/';


ngAfterViewInit(){
  this.initializeValidation();
}
  
  initializeValidation() {
    this.renderer.listen('document', 'DOMContentLoaded', () => {
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach(form => {
        this.renderer.listen(form, 'submit', (event) => {
          const formElement = form as HTMLFormElement;
          if (!formElement.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          this.renderer.addClass(form, 'was-validated');
        });
      });
    });
  }
}
