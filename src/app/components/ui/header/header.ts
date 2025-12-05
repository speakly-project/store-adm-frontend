import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Boton } from "../boton/c-boton";

@Component({
  selector: 'app-header',
  imports: [RouterLink, Boton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})

export class Header {

}
