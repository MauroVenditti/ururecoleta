import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { HeaderComponent } from './header/header.component';
import { ItemListaComponent } from './item-lista/item-lista.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { PromocionComponent } from './promocion/promocion.component';
import { PromoIndividualComponent } from './promo-individual/promo-individual.component';
import { PromocionVistapreviaComponent } from './promocion-vistaprevia/promocion-vistaprevia.component';
import { MispromosComponent } from './mispromos/mispromos.component';
import { VerqrComponent } from './verqr/verqr.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent,
    ItemListaComponent,
    ImagenesComponent,
    PromocionComponent,
    PromoIndividualComponent,
    PromocionVistapreviaComponent,
    MispromosComponent,
    VerqrComponent
  ],
  imports: [
    CommonModule,
    BootstrapModule,
    IonicModule.forRoot(),
    TranslateModule.forChild(),
  ],
  exports: [
    BootstrapModule,
    HeaderComponent,
    ItemListaComponent,
    ImagenesComponent,
    PromocionComponent,
    PromoIndividualComponent,
    PromocionVistapreviaComponent,
    MispromosComponent,
    VerqrComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
