import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { comicsService } from '../services/comics.service';
import { comic, Responsecomic, ResponseStatuscomic } from '../interfaces/comic';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'img', 'editar', 'eliminar'];
  dataSource: comic[] = [];
  ruta_imagenes = environment.ruta_imagenes

  constructor(private comicsService: comicsService) { }

  ngOnInit(): void {
    this.obtenercomics()
  }
  obtenercomics() {
    this.comicsService.obtenercomics()
      .subscribe({
        next: (value: Responsecomic) => {
          // Assign the data to the data source for the table to render
          this.dataSource = value.comics
        }, error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          })
        }
      })
  }


  eliminarcomic(id: string) {
    this.comicsService.eliminarcomic(id)
      .subscribe({
        next: (value: ResponseStatuscomic) => {
          const { estado, mensaje } = value;
          if (estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'comic eliminado exitosamente'
            })
            this.obtenercomics()
          } else {
            Swal.fire({
              icon: 'error',
              text: mensaje
            })
          }
        }, error: () => {
          Swal.fire({
            icon: 'error',
            text: 'Error en el servidor'
          })
        }
      })
  }
}
