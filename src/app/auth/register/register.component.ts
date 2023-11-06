import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MESSAGE} from "../../constant";
import {Router} from "@angular/router";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  formRegister?: any;

  constructor(
    private authService: AuthService,
    private formBuilderRegister: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.formRegister = this.formBuilderRegister.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }

  get email() {
    return this.formRegister.get('email');
  }

  get password() {
    return this.formRegister.get('password');
  }

  get phone() {
    return this.formRegister.get('phone');
  }

  get name() {
    return this.formRegister.get('name');
  }

  get messageValidate() {
    return MESSAGE.VALIDATE;
  }

  register() {
    const newUser = this.formRegister.value;
    this.authService.register(newUser).subscribe(res => {
        if (res.status === 200) {
          this.toastr.success('Đăng nhập thành công', 'Success');
          this.router.navigate(['/login'])
        }
      },
      error => {
         this.toastr.error('Đã có lỗi xảy ra', 'Error');
      })
  }
}
