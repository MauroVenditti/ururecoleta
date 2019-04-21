//======================================================
// Service Worker Notificaciones Push
//======================================================

// Escuchar Push
self.addEventListener('push', e => {

    const data = JSON.parse(e.data.text());
    const title = data.titulo;
    const options = {
        body: data.cuerpo,
        icon: `assets/imgs/logo.png`,
        badge: 'assets/imgs/icon.png',
        image: '',
        vibrate: [],
        openUrl: '/',
        data: {
            url: '/',
            id: data.usuario
        },
        actions: [{
            action: 'thor-action',
            title: 'Thor',
            icon: 'img/avatar/thor.jpg'
        }]
    };
    e.waitUntil(self.registration.showNotification(title, options));
});

// Cierra la Notificacion
self.addEventListener('notificationclose', e => {
    console.log('Notificacion Cerrada', e);
});

// Click en Notificacion
self.addEventListener('notificationclick', e => {
    const notificacion = e.notification;
    const accion = e.action;

    console.log({ notificacion, accion });

    const respuesta = clients.matchAll()
        .then(clientes => {
            let cliente = clientes.find(c => {
                return c.visibilityState === 'visible';
            });

            if (cliente !== undefined) {
                cliente.navigate(notificacion.data.url);
                cliente.focus();
            } else {
                clients.openWindow(notificacion.data.url);
            }
            return notificacion.close();
        });
    e.waitUntil(respuesta);
});