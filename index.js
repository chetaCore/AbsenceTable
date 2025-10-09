// Точка входа для отладки контролов в режиме standalone (отдельное приложение, без веб клиента Sungero).

// import { container } from 'webpack';
import api from './host-api-stub';
import context from './host-context-stub';
import loadApp from './src/loaders/control-loader';

let args = {
    // Контейнер элемента.
    container: document.getElementById('app'),
    // Контекст инициализации.
    initialContext: context,
    // API сторонних компонентов.
    api: api,
    // Параметры стороннего контрола.
    controlInfo: null
}

loadApp(args);