import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: ':cod_cliente/:cod_guia', redirectTo: 'home/:cod_cliente/:cod_guia' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'home/:cod_cliente/:cod_guia',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'settings', loadChildren: './configuracion/configuracion.module#ConfiguracionPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'detalle', loadChildren: './detalle/detalle.module#DetallePageModule' },
  { path: 'ruta', loadChildren: './ruta/ruta.module#RutaPageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'promociones', canActivate: [AuthGuardService], loadChildren: './promociones/promociones.module#PromocionesPageModule' },
  { path: 'mispromociones', loadChildren: './mispromociones/mispromociones.module#MispromocionesPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  /*{
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsPageModule'
  },
  {
    path: 'details',
    loadChildren: './details/details.module#DetailsPageModule'
  },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'promociones', canActivate: [AuthGuardService], loadChildren: './promociones/promociones.module#PromocionesPageModule' },
  { path: 'detalle', loadChildren: './detalle/detalle.module#DetallePageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' },
  { path: 'ruta', loadChildren: './ruta/ruta.module#RutaPageModule' },
  { path: 'mispromociones', loadChildren: './mispromociones/mispromociones.module#MispromocionesPageModule' }
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
