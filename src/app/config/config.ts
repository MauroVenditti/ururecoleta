import { HttpHeaders } from '@angular/common/http';

export const API_URL = 'http://ururecoleta.com.ar/api/index.php';
export const API_IMAGENES = 'http://ururecoleta.com.ar/api/assets/uploads';
export const API_IMAGENES_PROMOS = 'http://ururecoleta.com.ar/api';
export const API_KEY = 'e10adc3949ba59abbe56e057f20f883e';
export const HEADER: HttpHeaders = new HttpHeaders();
HEADER.append('API-KEY', API_KEY);
export const cod_cliente = '9999';

export const sinImagen = 'assets/imgs/sin_imagen.jpg';
// tslint:disable-next-line:max-line-length
export const imgCargando = 'data:image/gif;base64,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';