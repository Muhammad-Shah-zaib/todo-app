import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatFormField, MatInputModule,MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  // making a property for checking particular element is focused or not
  isFocused: boolean = false;

  // Making a formGroup 
  userForm = new FormGroup({
    // making username FormControl
    username: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z][_a-zA-Z0-9]*$'), Validators.minLength(5), Validators.maxLength(25) ]),

    // makking password FormControl
    password: new FormControl<string>('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[_+\\-@$!%*#?&]).+$'), Validators.minLength(8)])
  })


  constructor() {}

  ngOnInit(): void {
    
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  onSubmit(): void {
    console.log(this.userForm.value);
  }
}
