import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule, MatFormField } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserValidationService } from '../../services/user-validation.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { user, userData } from '../../interfaces/loginCredentials';
import { ShareUserDataService } from '../../services/share-user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatFormField, RouterOutlet,RouterLink, MatInputModule,MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  // template:`<h1>hellow world</h1>`,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  submitStatus: boolean = false;
  hide: boolean = true;
  // making a property for checking particular element is focused or not
  isFocused: boolean = false;

  public shareUserDataService: ShareUserDataService = inject(ShareUserDataService);

  private validateService: UserValidationService = new UserValidationService();
  private router: Router = new Router();

  // Making a formGroup 
  userForm = new FormGroup({
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
    console.error('onSUbmit is trigered');
    if ((this.userForm.value.username !== undefined && this.userForm.value.username !== null )
      && (this.userForm.value.password !== undefined && this.userForm.value.password !== null)){
    
        this.validateService.getData().subscribe( (data: userData) => {
          let user = data.find( (user: user) => {
            return user.username === this.userForm.value.username && user.password === this.userForm.value.password;
          })

          if (user) {
            if (user.id !== undefined)
              this.shareUserDataService.id = user.id;
            
              this.shareUserDataService.changeState(user);
              console.warn ('updated user: ', user);
              this.router.navigate(['/alltodos']);
            // this.shareUserDataService.username = this.userForm.value.username;

            // uopdating the user id
            
            // console.log('id: ',user.id);
          }else {
            // alert('Invalid username or password');
            this.submitStatus = true;
            this.userForm.reset();
          }
        },(err)=> {
          alert('An error has occured please try again later.');
          this.router.navigate(['/login']);
        })
      }
  }
}
