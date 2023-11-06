import {Component} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MESSAGE} from "../../constant";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin?: any;

  constructor(
    private authService: AuthService,
    private formBuilderLogin: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.formLogin = this.formBuilderLogin.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

  }

  get messageValidate() {
    return MESSAGE.VALIDATE;
  }

  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  login() {
    const newUser = this.formLogin.value;
    this.authService.login(newUser).subscribe(res => {
      if (!res.data.user) {
        this.toastr.error('Sai thông tin đăng nhâp', 'Error');
      } else {
        localStorage.setItem('access_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        this.toastr.success('Đăng nhập thành công', 'Success');
        this.router.navigate(['/users/users'])
      }
    })
  }

}
