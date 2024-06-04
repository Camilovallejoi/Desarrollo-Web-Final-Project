import { Routes } from '@angular/router';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ListadoComponent } from './listado/listado.component';
import { CrearcomicComponent } from './crear-comic/crear-comic.component';
import { EditarcomicComponent } from './editar-comic/editar-comic.component';

export const routes: Routes = [
    {
        path: '',
        component: NavegacionComponent,
        children: [
            {
                path: 'listado',
                component: ListadoComponent
            }, {
                path: 'crear',
                component: CrearcomicComponent
            },
            {
                path: 'editar/:id',
                component: EditarcomicComponent
            }
        ]

    }

];
