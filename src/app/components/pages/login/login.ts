import { Component } from '@angular/core';
import { CoursesHttpClient } from '../../../services/courses-http-client';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  user:string = '';
  passwd:string = '';

  constructor(private coursesHttpClient: CoursesHttpClient, private router: Router) {}

  onLogin() {
    this.coursesHttpClient.setCredentials(this.user, this.passwd);
    if(this.coursesHttpClient.isLogged()) {
      this.router.navigate(['/cursos']);
    }
  }

}
