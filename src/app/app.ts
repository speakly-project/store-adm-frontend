import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cursos } from "./components/pages/cursos/cursos";
import { Header } from "./components/ui/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('speakly-adm-frontend');
}
