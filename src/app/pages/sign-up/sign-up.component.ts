import { Component, OnInit } from '@angular/core';
import { MatInputModule, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserValidationService } from '../../services/user-validation.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { user } from '../../interfaces/loginCredentials';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatButtonModule, MatFormField, RouterOutlet,RouterLink, MatInputModule,MatIconModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  hide: boolean = true;
  // making a property for checking particular element is focused or not
  isFocused: boolean = false;

  private regiterService: UserValidationService = new UserValidationService();
  private router: Router = new Router();

  // Making a formGroup 
  userForm = new FormGroup<any>({
    // id ?: new FormControl<number>(0),
    // making username FormControl
    username: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z][_a-zA-Z0-9]*$'), Validators.minLength(5), Validators.maxLength(25) ]),

    // makking password FormControl
    password: new FormControl<string>('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[_+\\-@$!%*#?&]).+$'), Validators.minLength(8)])
    // password: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
    
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
    this.regiterService.addNewUser(this.userForm.value)
  }
<<<<<<< HEAD
=======


  canExit(): boolean {
    if (this.userForm.get('username')?.value !== '' || this.userForm.get('password')?.value !== ''){
      return confirm("There are some unsaved changes, Are you sure you want to leave?");
    }

    return true;
  }
>>>>>>> chekciing
}
