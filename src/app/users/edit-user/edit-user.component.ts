import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RoleService} from "../../service/role/role.service";
import {RefreshTokenService} from "../../helpers/refresh-token.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  formEdit?: any;
  _id: string | undefined;

  @Input() set id(value) {
    this._id = value;
  };

  @Output() editUserEvent = new EventEmitter<object>();

  get id() {
    return this._id;
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private refreshTokenHelper: RefreshTokenService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.formEdit = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    })

    this.userService.detailUser(this._id).subscribe(res => {
      this.formEdit?.patchValue({
        name: res.data?.name,
        email: res.data?.email,
        phone: res.data?.phone,
      })
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }

  editUser() {
    this.userService.editUser(this._id, this.formEdit.value).subscribe(res => {
      this.editUserEvent.emit(res.data);
      this.toastr.success('Cập nhật thành công', 'Success');
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }

}
