(function() {
    'use strict';
    
    Lampa.Lang.add({
        my_custom_store: {
            ru: "Тест сборки плагинов",
            en: "Test Plugin Store"
        }
    });

    function addStore() {
        if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="my_custom_store"]').length) {
            var field = "<div class=\"settings-folder selector\" data-component=\"my_custom_store\" data-static=\"true\">\n\t\t\t<div class=\"settings-folder__icon\">\n\t\t\t\t<svg xmlns=\"http://w3.org\" width=\"512\" height=\"512\" viewBox=\"0 0 490 490\"><circle cx=\"245\" cy=\"245\" r=\"200\" fill=\"red\"></circle></svg>\n\t\t\t</div>\n\t\t\t<div class=\"settings-folder__name\">"+Lampa.Lang.translate('my_custom_store')+"</div>\n\t\t</div>";
            Lampa.Settings.main().render().find('[data-component="more"]').after(field);
            Lampa.Settings.main().update();
        }
    }

    Lampa.Settings.listener.follow('open', function(e) {
        if (e.name == 'main') {
            e.body.find('[data-component="my_custom_store"]').on('hover:enter', function() {
                
                // ТЕСТОВЫЙ ПРИНТ 1: Проверяем, что кнопка нажата
                Lampa.Noty.show('Запрос к lampa.json отправлен...');

                // Прямой ручной запрос к вашему JSON файлу для проверки связи
                network.silent('https://github.io' + Math.random(), function(data) {
                    
                    // ТЕСТОВЫЙ ПРИНТ 2: Данные успешно получены сервером
                    Lampa.Noty.show('Данные от GitHub успешно получены!');
                    
                    Lampa.Extensions.show({
                        store: 'https://github.io' + Math.random(),
                        with_installed: true
                    });
                }, function() {
                    // ТЕСТОВЫЙ ПРИНТ 3: Ошибка сети (ТВ заблокировал запрос или 404)
                    Lampa.Noty.show('ОШИБКА: Сервер GitHub вернул ошибку или недоступен!');
                });

            });
        }
    });

    if (window.appready) addStore();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addStore();
        });
    }
})();
