import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';


@Component({
  selector: 'app-rform',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, CommonModule,PasswordModule],
  templateUrl: './rform.component.html',
  styleUrl: '../log-in/log-in.component.css',
})
export class RformComponent {
  studentsForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(15)]),
    password: new FormControl("", [Validators.required, Validators.minLength(3)])
  });

  myValues: any;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.studentsForm.invalid) {
      this.studentsForm.markAllAsTouched();
      return;
    } 
    this.myValues = this.studentsForm.value;
      this.studentsForm.reset();
  }

}
