import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {RoleService} from "../../service/role/role.service";
import {RefreshTokenService} from "../../helpers/refresh-token.service";

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  formEdit?: any;

  _id: string | undefined;
  @Input() set id(value) {
    this._id = value;
  };

  @Output() editRoleEvent = new EventEmitter<object>();

  get id() {
    return this._id;
  }

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private toastr: ToastrService,
    private refreshTokenHelper: RefreshTokenService,
  ) {

  }

  ngOnInit() {
    this.formEdit = this.fb.group({
      name: ['', [Validators.required]],
    })

    this.roleService.detail(this._id).subscribe(res => {
      this.formEdit?.patchValue({
        name: res.data?.name,
      })
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }

  editRole() {
    this.roleService.edit(this._id, this.formEdit.value).subscribe(res => {
      if (res.data._id !== undefined) {
        this.editRoleEvent.emit(res.data);
        this.toastr.success('Cập nhật thành công', 'Success');
      } else {
        this.toastr.error('Bản ghi đã tồn tại', 'Error');
      }
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }

}
