import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [FormBuilder, Validators]
})

export class LoginComponent {
  constructor(private FormBuilder : FormBuilder, private _auth: AuthService,
    private _router: Router) {

  }
  loginUserData = {email : '', password : ''}

  ngOnInit() 
  {
  }

  loginUser () 
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/books'])
      },
      err => console.log(err)
    ) 
  }

  loginForm = this.FormBuilder.group(
    {
      email: ['', Validators.required],
      passward: ['', Validators.required]
    }

  )

  showModal: boolean = false; 
    openModal() { 
        this.showModal = true; 
    } 
  
    closeModal() { 
        this.showModal = false; 
    } 
}