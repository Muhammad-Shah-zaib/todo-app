import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserValidationService } from '../../services/user-validation.service';
import { Router } from '@angular/router';

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

  private validateService: UserValidationService = new UserValidationService();
  private router: Router = new Router();

  // Making a formGroup 
  userForm = new FormGroup({
    // making username FormControl
    username: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z][_a-zA-Z0-9]*$'), Validators.minLength(5), Validators.maxLength(25) ]),

    // makking password FormControl
    // password: new FormControl<string>('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[_+\\-@$!%*#?&]).+$'), Validators.minLength(8)])
    password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
    
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
    if ((this.userForm.value.username !== undefined && this.userForm.value.username !== null )
      && (this.userForm.value.password !== undefined && this.userForm.value.password !== null)){
    
        if (this.validateService.checkLoginCredentials( this.userForm.value.username, this.userForm.value.password)) {
          this.router.navigate(['/home']);
        }else {
          alert('Incorrect')
        }
      }
  }
}
