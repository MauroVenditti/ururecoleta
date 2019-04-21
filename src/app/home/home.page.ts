import { Component } from '@angular/core';
import { IonFab, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform
  ) {}

  shareN(socialNet: string, fab: IonFab) {
    fab.close();
    console.log('Sharing in', socialNet);
    const message = 'Test';
    const image = '';
    const url = '';
    if (this.platform.is('cordova')) {
      // Verifica si puede compartir
      // this.socialSharing.canShareVia(socialNet, message, '', image, url).then(() => {
        // Puede Compartir
        if (socialNet === 'twitter') {
      //    this.socialSharing.shareViaTwitter(message, image, url);
        }
        if (socialNet === 'facebook') {
      //    this.socialSharing.shareViaFacebook(message, image, url);
        }
      // }).catch(err => {
        // No puede Compartir
      //  console.log(err);
      // });
    } else {

      if (navigator['share']) {
        navigator['share']({
            title: 'Uru Recoleta',
            text: 'El Mejor Cuero Argentino',
            url: 'https://www.ururecoleta.com.ar',
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }
    }
  }
}
