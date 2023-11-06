import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RoleService} from "../../service/role/role.service";
import {ToastrService} from "ngx-toastr";
import {RefreshTokenService} from "../../helpers/refresh-token.service";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  formCreate?: any;

  @Output() createRoleEvent = new EventEmitter<object>();

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private refreshTokenHelper: RefreshTokenService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required]],
    })
  }

  createRole() {
    this.roleService.create(this.formCreate.value).subscribe(res => {
      if (!res.data.id) {
        this.toastr.error('Bản ghi đã tồn tại', 'Error');
      } else {
        this.createRoleEvent.emit(res.data);
        this.toastr.success('Tạo mới thành công', 'Success');
      }
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }
}
