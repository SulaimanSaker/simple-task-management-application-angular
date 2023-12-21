import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  loginEmail: string = '';
  loginPassword: string = '';

  registerEmail: string = '';
  registerName: string = '';
  registerPassword: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginEmail = '';
    this.loginPassword = '';

    this.registerEmail = '';
    this.registerName = '';
    this.registerPassword = '';
  }

  onLoginSubmit() {
    const loginUserDto: LoginUserDto = {
      email: this.loginEmail,
      password: this.loginPassword,
    };

    this.authService.loginUser(loginUserDto).subscribe((res) => {
      this.ngOnInit();

      localStorage.setItem('user', JSON.stringify(res.data.user));

      localStorage.setItem('token', res.data.token);

      this.sendLoginStatus();
    });
  }

  onRegisterSubmit() {
    const createUserDto: CreateUserDto = {
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword,
    };

    this.authService.registerUser(createUserDto).subscribe(() => {
      this.isLogin = true;
      this.ngOnInit();
    });
  }

  sendLoginStatus() {
    this.loginStatus.emit(true);
  }
}
