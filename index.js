
import api from './host-api-stub';
import context from './host-context-stub';
import loadApp from './src/loaders/absenceTableLoader';

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