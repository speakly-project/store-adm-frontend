import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CoursesHttpClient } from '../services/courses-http-client';

export const loginGuard: CanActivateFn = (route, state) => {
  const coursesHttpClient = inject(CoursesHttpClient);
  const router = inject(Router);

  if (coursesHttpClient.isLogged()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
