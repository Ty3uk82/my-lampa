(function() {
    'use strict';

    // 1. Указываем название магазина
    Lampa.Lang.add({
        my_custom_store: { ru: "Мой список", en: "My Store" }
    });

    // 2. Создаем шаблон кнопки для меню настроек
    Lampa.Template.add('settings_my_store', `
        <div class="settings-folder selector" data-component="my_custom_store" data-static="true">
            <div class="settings-folder__name">#{my_custom_store}</div>
        </div>
    `);

    // 3. Добавляем кнопку в настройки без дублирования
    Lampa.Settings.listener.follow('open', function(e) {
        if (e.name === 'main') {
            
            // ПРОВЕРКА: добавляем кнопку только если её ещё нет в текущем меню
            if (!e.body.find('[data-component="my_custom_store"]').length) {
                var field = Lampa.Template.get('settings_my_store');
                
                // Привязываем действие при клике
                field.on('hover:enter', function() {
                    Lampa.Extensions.show({
                        store: 'https://ty3uk82.github.io/my-lampa/lampa.json',
                        with_installed: true
                    });
                });
                
                // Вставляем кнопку в меню
                e.body.find('[data-component="more"]').after(field);
                
                // Обновляем навигацию пульта, чтобы кнопка сразу стала активной
                Lampa.Settings.main().update();
            }
        }
    });
})();
