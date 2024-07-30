import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: '../log-in/log-in.component.css',//because css have same so i use login css 
})
export class SignUpComponent implements AfterViewInit {
  data: any = {};
  myValues: any[] = [];

  agreeTerms: boolean = false;

  constructor(private renderer: Renderer2) {

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.myValues.push(this.data);
    this.reset();
    alert("your form submit success fully")
  }

  reset() {
    this.data = {};
  }

  ngAfterViewInit() {
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
