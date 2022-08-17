import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {AuthRequest} from "../../../../api/src/auth/models/auth-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() {
    return this.loginForm.controls;
  }

  submit(): void {
    const username = this.f.username.value.trim();
    const password = this.f.password.value.trim();

    if (username === '' || password === '') {
      // @show error message
      return;
    }

    const request: AuthRequest = {
      username: username,
      password: password
    }
    this.authService.login(request);
  }
}
