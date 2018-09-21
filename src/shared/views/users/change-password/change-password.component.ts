import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UsersApi } from "../../../sdk/services/custom/Users";
import { AlertService } from "../../../services/alert.service";
import { PreloaderService } from "../../../services/preloader.service";

@Component({
  selector: "app-user-changepassword",
  templateUrl: "./change-password.component.html"
})
export class ChangePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  user: any;
  access_token: any;
  passwordRegex: any = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  constructor(
    private fb: FormBuilder,
    private usersApi: UsersApi,
    private alertService: AlertService,
    private _preloaderService: PreloaderService
  ) {}

  ngOnInit() {
    this.buildForms();
  }

  buildForms() {
    this.updatePasswordForm = this.fb.group(
      {
        password: ["", [Validators.required]],
        npassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.passwordRegex)
          ]
        ],
        cpassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(this.passwordRegex)
          ]
        ]
      },
      { validator: this.passwordMatch("npassword", "cpassword") }
    );
  }

  updatePassword() {
    this._preloaderService.showPreloader();
    this.usersApi
      .changePassword(
        this.updatePasswordForm.value.password,
        this.updatePasswordForm.value.npassword
      )
      .subscribe(
        result => {
          this.alertService.success("Password has been changed successfully.");
          this.buildForms();
          this._preloaderService.hidePreloader();
        },
        err => {
          if (err.code === "INVALID_PASSWORD") {
            err.message = "Invalid old password.";
          }
          this.alertService.error(err.message);
          this._preloaderService.hidePreloader();
        }
      );
  }

  passwordMatch(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];

      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
}
