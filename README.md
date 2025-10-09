# Что такое сторонний контрол

Стронний контрол это возможность добавить веб приложение в контрол Directum RX, позволяющее значительно расширить функциональность системы. Веб приложения не содержат ограничений стандартных контролов.

Функционал сторонних контролов появился в Directum RX начиная с версии 4.9

# Примеры использования

## Кастомная карточка сотрудника

 ![Кастомная карточка сотрудника](/.gitlab/emloyer.gif)Можно создать карточку сотрудника и вывести в нее текущий прогресс по обучению, уровень ФК и другие данные.

## Тестирование

 ![Тестирование](/.gitlab/test.gif)Можно проходить тестирование в удобном интерфейсе.

## Чат с искусственным интеллектом

 ![Чат с искусственным интеллектом](/.gitlab/ai.gif)Можно общаться с искусственным интеллектом прямо из системы.

# Перед тем как начать

Внимательно изучите следующие материалы

**Разделы справки**

* [Сторонние компоненты](https://club.directum.ru/webhelp/directumrx/4.9/web/index.html?dds_storonniye_komponenty.htm)
* [Сторонний контрол](https://club.directum.ru/webhelp/directumrx/4.9/web/index.html?dds_storonniy_kontrol.htm)
* [Добавление сторонних контролов](https://club.directum.ru/webhelp/directumrx/4.9/web/index.html?wn_dobavleniye_storonnikh_kontrolov.htm)

**Статьи на Directum Club**

* [Сторонний контрол для визуальной работы со штампом](https://club.directum.ru/post/368757)

**Репозитории**

* [Репозиторий вендора со сторонним контролом](https://github.com/DirectumCompany/sungero-remote-component-example-react/blob/main/src/loaders/string-control-card-loader.tsx)

# Вам понадобиться

* Установить [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
* Установить [Visual Studio Code](https://code.visualstudio.com/)

# Установка 

1. Клонируйте репозиторий на ваше локальное устройство:
   ```bash
   git clone http://192.168.0.162/Shtin_IA/remote-component-template.git
   ```

2. Перейдите в директорию проекта: 
   ```bash
   cd remote-component-template
   ```
   
3. Установите зависимости:
   ```bash
   npm install
   ```


# Описание шаблона

* В папке **dist** находятся файлы, которые необходимо импортировать в RX, для работы стороннего компонента. Папка появляется в корне проекта после сборки;
* В папке **locales**  находятся файлы локализации для английского и русского языков;
* В папке **/src/controls** реализуются контролы;
* В папке **/src/loaders** реализуются загрузчики контролов;
* В файле **component.loaders.ts** перечисляются все загрузчики контролов, с указанием их имени для файла manifest;
* В файле **component.manifest.js** описываются контролы;
* В файле **package.json** указаны скрипты для сборки приложения;
* В файле **host-api-stub.ts** указывается поведение карточки сущности для локальной отладки;
* В файле **host-context-stub** задается контекст для локальной отладки;
* В файле **index.js** указывается загрузчик, который будет вызван при локальной отладке.

## Структура

### component.manifest.js

```javascript
module.exports = {
  vendorName: 'Directum',
  componentName: 'DefaultContorl', //Название компонента. Должно быть уникальным. Несколько компонентов с одним именем добавить не получится
  componentVersion: '1.0',
  // Описание контролов, которые есть в компоненте. Реализация контролов находится в папке ./src/controls.
  controls: [
    {
      name: 'ControlInfo', 
      // Загрузчики контрола. Загрузчик - это функция, принимающая информацию о контексте и точку доступа к API.
      // Задача загрузчика - смонтировать корневой UI-компонент контрола в указанный DOM-элемент.
      // Один и тот же контрол может отображаться в разных контекстах (карточка и обложка модуля). Если контрол должен отображаться и в карточке и в обложке, 
      // то для него следует создать разные загрузчики для этих контекстов (*-cover-loader и *-card-loader).
      loaders: [
        {
          name: 'control-loader',  // Имя загручика должно соответствовать имени загрузчика в файле component.loaders.ts.
          scope: 'Cover' // Контекст для которого предназначен загрузчик. Cover - обложка, Card - карточка сущности
        }
      ],
      displayNames: [
        // Отображаемое имя контрола. Будет отображаться в настроках представления модуля или формы
        { locale: 'en', name: 'Additional Control' },
        { locale: 'ru', name: 'Сторонний контрол' },
      ]
    }
  ]
};
```

Измените название компонента, контекст и отображаемое имя при необходимости.

### control.css

```css
.App {
    max-width: 800px;
}

/*Добавьте сюда свои стили*/
```

Стили стандартных элементов, таких как “h1”, “h2”, “p” и других предопределены на уровне системы. Таким элементам необходимо явно присваивать свои классы и описывать их стили

```css
/* Стили для стандартных элементов с классами */
.header-title {
  font-size: 2em;
  font-weight: bold;
  color: #333;
}

.sub-header-title {
  font-size: 1.5em;
  color: #666;
}

.paragraph-text {
  font-size: 1em;
  color: #000;
}
```

### control.tsx

```typescript
import React from 'react';
import { useState } from 'react';
import { IRemoteComponentContext, IRemoteComponentCoverApi } from '@directum/sungero-remote-component-types';
import './control.css';

interface IProps {
  // Заполни интерфейс по передаваемым параметрам.
}

// Сформировать страницу.
const ControlInfo: React.FC[IProps](IProps) = ({ }) => {
  // Напиши здесь получение данных.

  return (
    <div className="App">
      Сформируй HTML-страницу для отображения.
    </div>
  )
};

export default ControlInfo;
```

Вставьте сюда код вашего React приложения. Приложение необходимо предварительно отладить в Visual Studio Code.


Рекомендуется использовать TypeScript. Если использовать JavaScript, то могут возникнуть ошибки. Зависит от наличия переменных в коде.


# Сборка стороннего компонента с сторонним шаблоном

 ![Сборка компонента](/.gitlab/build.gif)В консоли, находясь в корне проекта с шаблоном выполните команду `npm run build:release`

 ![Папка dist](/.gitlab/dist.png)

В результате сборки в корне проекта появится папка `dist`

# Импорт стороннего контрола в DDS

 ![Импорт стороннего контрола в DDS](/.gitlab/import.gif)Создайте сторонний компонент и загрузите в него папку `dist` После загрузки выполните публикацию.

# Добавление стороннего контрола в Directum RX

 ![Добавление стороннего контрола в Directum RX](/.gitlab/adding.gif)

Добавьте контрол в настройках представления модуля или формы.

# Взаимодействие из стороннего контрола с системой

## Через API контрола

Если контекст контрола карточка сущности, то можно обратиться к свойствам сущности через API стороннего контрола. API достаточно ограниченный, но его можно доработать.

```typescript
/** Пример стороннего контрола, реализующего грид для отметки выполненных работ. */
const PerformedWorkDetailsGrid: React.FC[IProps](IProps) = ({ initialContext, api }) => {
  // Получаем сущность из карточки веб клиента через метод getEntity.
  const [ entity, setEntity ] = React.useState[IPerformedWork](IPerformedWork)(api.getEntity[IPerformedWork](IPerformedWork)());
  // Используем контекст, полученный в момент загрузки стороннего контрола, в качестве начального.
  // После обновления контрола, берем новый контекст.
  const [ context, setContext ] = React.useState(initialContext);
  
  // Задаем локализацию внутри контрола в соответствии с локализацией в контексте, в котором находится контрол.
  const currentCulture = context.currentCulture ?? DEFAULT_CULTURE;
  const { i18n } = useTranslation();
  React.useEffect(() => {      
    i18n.changeLanguage(currentCulture);
  }, [ currentCulture ]);

  // Задаем обработчик события обновления контрола.
  const handleControlUpdate: ControlUpdateHandler = React.useCallback(updatedContext => {
    // Заново получаем актуальную сущность через API и устанавливаем в state, чтобы перерисовать компоненты контрола с актуальными данными сущности из карточки.
    const updatedEntity = api.getEntity[IPerformedWork](IPerformedWork)();
    setEntity(updatedEntity);
    // Устанавливаем в state актуальный контекст.
    setContext(updatedContext);
  }, [ api, setEntity ]);
  api.onControlUpdate = handleControlUpdate;

  return <PerformedWorkDetailsGridView entity={entity} />;
};
```


```typescript
const PerformedWorkDetailsGridView: React.FC[IProps](IProps) = ({ entity }) => {
  const { t, i18n } = useTranslation();
  const works = entity.PerformedWorkDetails;
  const durationSum = sum(works.map(w => w.Duration));
  const summaryRowId = t('performedWorkDetailsGrid.summary.total');
  const [ summaryRows, setSummaryRows ] = React.useState<Array[IRowData](IRowData)>([{ Id: summaryRowId, Duration: durationSum }]);
  if (summaryRows[0].Duration !== durationSum) {
    setSummaryRows([{ Id: summaryRowId, Duration: durationSum }]);
  }
```

К какой либо сущности из контекста обложки обратиться  без доработки API контрола невозможно. Для обращения к сущностям системы из обложки используйте веб-сервис интеграции

## Через веб-сервис интеграции

```typescript
const getCILinksDataUrl = `/Integration/odata/CMDB/GetCILinksData(id=${ciId})`;
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; odata.metadata=minimal; odata.streaming=true',
            'Content-Encoding': 'br'
          },
        };
        const response: Response = await fetch(getCILinksDataUrl, requestOptions);
```

### Определенный пользователь

Если необходимо обращаться к сущностям системы от определенного пользователя, то в заголовках запроса необходимо указать логин и пароль в заголовке “Authorization”

### Текущий пользователь

Если необходимо обращаться к сущностям системы от текущего пользователя, то в заголовках запороса не передвайте заголовок  “Authorization”. В этом случае будет использоваться авторизация текущего пользователя.

# Использование изображений

## Через API контрола

Если в сущности, в которой вы находитесь хранится изображение, то обратитесь к нему через API контрола.

## Через веб-сервис интеграции

Если изображение хранится в системе в виде документа или в свойстве карточки, то обратитесь к нему через веб-сервис интеграции.

## Через загрузку изображений на веб-сервер

 ![](/.gitlab/web-server.png)

Можно обратиться к изображениям, которые хранятся в директории веб-сервера

`\DirectumLauncher\etc_builds_bin\SungeroWebClient\content\` или загрузить туда свои.

Данный способ не рекомендуется

## Через доработку стороннего контрола

1. Установите компоненты `save-dev`, `url-loader`  и `url-loader` с помощью команды

```bash
npm install --save-dev url-loader file-loader, находясь в корне шаблона
```
2. Доработайте `webpack.config.js` следующим образом

```typescript
test: /.(png|jpg|jpeg|gif)$/i,
type: 'asset',
parser: {
dataUrlCondition: {
maxSize: 8192 // 8KB
}
```

3. Создайте файл `declaration.d.ts`  в папке **controls** шаблона контрола со следующий содержимым

```typescript
declare module '.png' {
const value: string;
export default value;
}
declare module '.jpg' {
const value: string;
export default value;
}
declare module '.jpeg' {
const value: string;
export default value;
}
declare module '.gif' {
const value: string;
export default value;
}
declare module '*.svg' {
const value: string;
export default value;
}
```
4. Файл `control.tsx` доработайте следующим образом

   Импортируйте ваши изображения с помощью строки вида

```typescript
import icon1 from './assets/logo192.png';
```

   Обратитесь к импортированному изображению с помощью кода вида

```typescript
<img
className="sidebar-icon-img"
src={icon1}
alt="Directum ITSM"
/>
```

С помощью данной доработки изображения будут загружаться на сервер системы при публикации

# Добавление нескольких сторонних контролов в Directum RX

Папка, которая содержит в себе исходные коды контролов, перед сборкой должна иметь уникальное имя.


**Как не надо**

* Component_letters/src/controls/control
* Component_company/src/controls/control

**Как надо**

* Component_letters/src/controls/inbox_cover
* Component_company/src/controls/employers

В противном случае, если вы добавите два контрола, которые были собраны из папок с одинаковыми именами, между ними не будет происходить переключение в рамках одной обложки.

# Дополнительная информация

* 📼 Руководство [Как создать сторонний контрол и добавить его в Directum RX](https://disk.yandex.ru/i/qE8CKcTM5a_64Q)
* 📼 Летучка “[Сторонние контролы в Directum RX 4.9](https://disk.yandex.ru/d/0kcsa1T6NI_MkA)”