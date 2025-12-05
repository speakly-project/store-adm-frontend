import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'button[c-boton]',
  imports: [],
  templateUrl: './c-boton.html',
  styleUrl: './c-boton.scss',
  encapsulation: ViewEncapsulation.None

})
export class Boton {
  @Input() importancia: 'primaria' | 'secundaria' = 'primaria';

  @HostBinding('class')
    get clazz(): Record<string, boolean> {
        return {
            'c-boton': true,
            'c-boton--importance-primaria': this.importancia === 'primaria',
            'c-boton--importance-secundaria': this.importancia === 'secundaria',

        };
    }

}
