import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CreateUserDto from 'src/app/dtos/create-user.dto';
import LoginUserDto from 'src/app/dtos/login-user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() loginStatus: EventEmitter<boolean> = new EventEmitter();

  title: string = 'Todo List';
  isLogin: boolean = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      registerName: ['', Validators.required],
      registerEmail: ['', [Validators.required, Validators.email]],
      registerPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const loginUserDto: LoginUserDto = {
        email: this.loginForm.value.loginEmail,
        password: this.loginForm.value.loginPassword,
      };

      this.authService.loginUser(loginUserDto).subscribe((res) => {
        this.ngOnInit();
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        this.sendLoginStatus();
      });
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      const createUserDto: CreateUserDto = {
        name: this.registerForm.value.registerName,
        email: this.registerForm.value.registerEmail,
        password: this.registerForm.value.registerPassword,
      };

      this.authService.registerUser(createUserDto).subscribe(() => {
        this.isLogin = true;
        this.ngOnInit();
      });
    }
  }

  sendLoginStatus() {
    this.loginStatus.emit(true);
  }

  // Getter methods for form controls
  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  get registerName() {
    return this.registerForm.get('registerName');
  }

  get registerEmail() {
    return this.registerForm.get('registerEmail');
  }

  get registerPassword() {
    return this.registerForm.get('registerPassword');
  }
}
