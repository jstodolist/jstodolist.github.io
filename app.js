function displayNotification() {
    if (Notification.permission === "granted") {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var pushTitle = document.getElementById('push-title').value || "Demo!";
            var pushBody = document.getElementById('push-body').value || "corpo da notificação";

            var options = {
                body: pushBody,
                icon: 'images/icons/icon-72x72.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [{
                        action: 'explore',
                        title: 'explorar',
                        icon: 'images/icons/general/icon-check.png'
                    },
                    {
                        action: 'close',
                        title: 'fechar',
                        icon: 'images/icons/general/icon-close-128.png'
                    },
                ]
            };
            reg.showNotification(pushTitle, options);
        });
    } else if (Notification.permission === "blocked") {
        document.getElementById('message').textContent = "notificações estão bloqueadas. :(";
    } else {
        Notification.requestPermission(function (status) {
            console.log('Notification permission status:', status);
        });
    }
}