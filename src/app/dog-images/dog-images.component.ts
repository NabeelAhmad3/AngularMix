import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-dog-image',
  imports: [JsonPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './dog-images.component.html',
  styleUrls: ['./dog-images.component.css']
})
export class DogImageComponent {
  dogImgUrl: string = '';
  userData: any[] = [];
  editingUserId: number | null = null;

  studentform: FormGroup = new FormGroup({
    value1: new FormControl("", [Validators.required, Validators.minLength(3)]),
    value2: new FormControl("", [Validators.required, Validators.email, Validators.minLength(15)]),
    value3: new FormControl("", [Validators.required, Validators.minLength(3)])
  });


  constructor(private gethttp: HttpService, private fb: FormBuilder) {
    this.DogImg();
    this.getuserdata();
  }

  //------------------- read data from public api ------------------------
  DogImg(): void {
    this.gethttp.getData('https://dog.ceo/api/breeds/image/random').subscribe(data => {
      this.dogImgUrl = data;
    });
  }
  //-------------------validation and add/edit userData ------------------------
  myData(): void {
    if (this.studentform.invalid) {
      this.studentform.markAllAsTouched();
      return
    };
    if (this.editingUserId == null) {
      this.addUser();
    } else {
      this.editUser(this.editingUserId, this.studentform.value.value1, this.studentform.value.value2, this.studentform.value.value3);
    }
  }
  //-----------------------1 Insert user data ----------------
  addUser(): void {
    this.gethttp.postData('http://localhost:5000/api', this.studentform.value).subscribe(data => {
      this.studentform.reset();
      this.getuserdata();
    });
  }
  //-----------------------2 read user data ----------------
  getuserdata(): void {
    this.gethttp.getData('http://localhost:5000/api').subscribe(data => {
      this.userData = data;
    });
  }
  //----------------------- checking form data  and apply conditions --------------------
  showDialog(id: number, value1: string, value2: string, value3: string): void {
    this.studentform.setValue({ value1, value2, value3 });
    this.editingUserId = id;
  }
  //-----------------------3 update user data --------------------
  editUser(id: number, value1: string, value2: string, value3: string): void {
    this.gethttp.putData(`http://localhost:5000/api/${id}`, { value1, value2, value3 }).subscribe(data => {
      this.editingUserId = null;
      this.getuserdata();
      this.studentform.reset();
      alert('User updated successfully');
    });
  }
  //------------------------ 4 delete user data ----------------------
  deleteUser(id: number): void {
    this.gethttp.deleteData(`http://localhost:5000/api/${id}`).subscribe(response => {
      this.getuserdata();
      alert(response.message);
    },
      error => {
        alert(error.statusText);
      }
    );
  }
}
