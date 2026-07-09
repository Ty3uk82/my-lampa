(function() {
    'use strict';

    // 1. Указываем название магазина
    Lampa.Lang.add({
        my_custom_store: { ru: "Мой список", en: "My Store" }
    });

    // 2. Создаем шаблон кнопки с иконкой коробки (SVG)
    Lampa.Template.add('settings_my_store', `
        <div class="settings-folder selector" data-component="my_custom_store" data-static="true">
            <div class="settings-folder__icon">
                <svg xmlns="http://w3.org" width="512" height="512" viewBox="0 0 490 490"><path d="M153.125 317.435h183.75v30.625h-183.75zM420.914 0H69.086C30.999 0 0 30.999 0 69.086v351.829C0 459.001 30.999 490 69.086 490h351.829C459.001 490 490 459.001 490 420.914V69.086C490 30.999 459.001 0 420.914 0z" fill="white"></path></svg>
            </div>
            <div class="settings-folder__name">#{my_custom_store}</div>
        </div>
    `);

    // 3. Добавляем кнопку в настройки
    Lampa.Settings.listener.follow('open', function(e) {
        if (e.name === 'main' && !e.body.find('[data-component="my_custom_store"]').length) {
            var field = Lampa.Template.get('settings_my_store');
            
            field.on('hover:enter', function() {
                Lampa.Extensions.show({
                    store: 'https://ty3uk82.github.io/my-lampa/lampa.json',
                    with_installed: true
                });
            });
            
            e.body.find('[data-component="more"]').after(field);
            Lampa.Settings.main().update();
        }
    });
})();
