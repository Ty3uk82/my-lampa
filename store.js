(function() {
    'use strict';

    // 1. Укажите название магазина
    Lampa.Lang.add({
        my_custom_store: { ru: "Мой список", en: "My Store" }
    });

    // 2. Создаем кнопку для меню настроек
    Lampa.Template.add('settings_my_store', `
        <div class="settings-folder selector" data-component="my_custom_store" data-static="true">
            <div class="settings-folder__name">#{my_custom_store}</div>
        </div>
    `);

    // 3. Добавляем кнопку в настройки
    Lampa.Settings.listener.follow('open', function(e) {
        if (e.name === 'main') {
            var field = Lampa.Template.get('settings_my_store');
            field.on('hover:enter', function() {
                Lampa.Extensions.show({
                    store: 'https://ty3uk82.github.io/my-lampa/lampa.json', // <-- Вставьте URL
                    with_installed: true
                });
            });
            e.body.find('[data-component="more"]').after(field);
        }
    });
})();
