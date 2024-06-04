import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { comicsService } from '../services/comics.service';
import Swal from 'sweetalert2';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crear-comic',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe

  ],
  templateUrl: './crear-comic.component.html',
  styleUrl: './crear-comic.component.css'
})
export class CrearcomicComponent {
  formcomic!: FormGroup;

  constructor(private fb: FormBuilder, private comicsService: comicsService) {
    this.formcomic = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    })
  }

  get f() {
    return this.formcomic.controls;
  }



  guardarcomic() {
    if (this.formcomic.invalid) {
      return
    }

    this.comicsService.guardarcomic(this.formcomic.value)
      .subscribe({
        next: (value: any) => {
          if (value.estado == 201) {
            Swal.fire({
              icon: 'success',
              text: 'comic guardado exitosamente'
            })
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al guardar el comic'
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

}
