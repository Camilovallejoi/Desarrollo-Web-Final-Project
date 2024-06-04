import { Component, Input, OnInit } from '@angular/core';
import { comicsService } from '../services/comics.service';
import { comic } from '../interfaces/comic';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar-comic',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './editar-comic.component.html',
  styleUrl: './editar-comic.component.css'
})
export class EditarcomicComponent implements OnInit {
  @Input('id') idcomic!: string
  infocomic!: comic
  formcomic!: FormGroup

  constructor(private comicsService: comicsService, private fb: FormBuilder) {
    this.formcomic = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    })
  }

  ngOnInit(): void {
    this.obtenercomicPorId()
  }

  get controls() {
    return this.formcomic.controls
  }

  obtenercomicPorId() {
    this.comicsService.obtenercomicPorId(this.idcomic)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            this.formcomic.patchValue({
              id: value.comic.id,
              nombre: value.comic.nombre,
              descripcion: value.comic.descripcion,
              precio: value.comic.precio,
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

  onFileSelected(event: any): void {
    this.formcomic.patchValue({
      imagen: event.target.files[0]

    });
  }

  actualizarcomic() {
    if (this.formcomic.invalid) {
      return
    }
    this.comicsService.actualizarcomic(this.formcomic.value)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'comic actualizado exitosamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al actualizar comic'
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
