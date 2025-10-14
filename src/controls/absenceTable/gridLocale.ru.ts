import { GridLocaleText } from '@mui/x-data-grid';

export const GRID_RU_LOCALE_TEXT: GridLocaleText = {
  // Root
  noRowsLabel: 'Нет строк',
  noResultsOverlayLabel: 'Результаты не найдены.',
  noColumnsOverlayLabel: 'Нет столбцов',
  noColumnsOverlayManageColumns: 'Управление столбцами',
  emptyPivotOverlayLabel: 'Добавьте поля в строки, столбцы и значения, чтобы создать сводную таблицу',


  // Density selector toolbar button text
  toolbarDensity: 'Плотность',
  toolbarDensityLabel: 'Плотность',
  toolbarDensityCompact: 'Компактно',
  toolbarDensityStandard: 'Стандартно',
  toolbarDensityComfortable: 'Комфортно',

  // Кнопка выбора столбцов на панели инструментов
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выбрать столбцы',

  // Кнопка фильтров на панели инструментов
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показать фильтры',
  toolbarFiltersTooltipHide: 'Скрыть фильтры',
  toolbarFiltersTooltipShow: 'Показать фильтры',
  toolbarFiltersTooltipActive: (count) => count !== 1 ? `${count} активных фильтров` : `${count} активный фильтр`,

  // Поле быстрого фильтра
  toolbarQuickFilterPlaceholder: 'Поиск…',
  toolbarQuickFilterLabel: 'Поиск',
  toolbarQuickFilterDeleteIconLabel: 'Очистить',

  // Кнопка экспорта на панели инструментов
  toolbarExport: 'Экспорт',
  toolbarExportLabel: 'Экспорт',
  toolbarExportCSV: 'Скачать CSV',
  toolbarExportPrint: 'Печать',
  toolbarExportExcel: 'Скачать Excel',

  // Кнопка сводной таблицы на панели инструментов
  toolbarPivot: 'Сводная таблица',

  // Кнопка AI Assistant на панели инструментов
  toolbarAssistant: 'AI Ассистент',

  // Текст управления столбцами
  columnsManagementSearchTitle: 'Поиск',
  columnsManagementNoColumns: 'Нет столбцов',
  columnsManagementShowHideAllText: 'Показать/Скрыть все',
  columnsManagementReset: 'Сброс',
  columnsManagementDeleteIconLabel: 'Очистить',

  // Текст панели фильтров
  filterPanelAddFilter: 'Добавить фильтр',
  filterPanelRemoveAll: 'Удалить все',
  filterPanelDeleteIconLabel: 'Удалить',
  filterPanelLogicOperator: 'Логический оператор',
  filterPanelOperator: 'Оператор',
  filterPanelOperatorAnd: 'И',
  filterPanelOperatorOr: 'ИЛИ',
  filterPanelColumns: 'Столбцы',
  filterPanelInputLabel: 'Значение',
  filterPanelInputPlaceholder: 'Значение фильтра',

  // Текст операторов фильтра
  filterOperatorContains: 'содержит',
  filterOperatorDoesNotContain: 'не содержит',
  filterOperatorEquals: 'равно',
  filterOperatorDoesNotEqual: 'не равно',
  filterOperatorStartsWith: 'начинается с',
  filterOperatorEndsWith: 'заканчивается на',
  filterOperatorIs: 'равно',
  filterOperatorNot: 'не равно',
  filterOperatorAfter: 'после',
  filterOperatorOnOrAfter: 'на или после',
  filterOperatorBefore: 'до',
  filterOperatorOnOrBefore: 'на или до',
  filterOperatorIsEmpty: 'пусто',
  filterOperatorIsNotEmpty: 'не пусто',
  filterOperatorIsAnyOf: 'любое из',
  'filterOperator=': '=',
  'filterOperator!=': '!=',
  'filterOperator>': '>',
  'filterOperator>=': '>=',
  'filterOperator<': '<',
  'filterOperator<=': '<=',


  // Текст операторов фильтра заголовка
  headerFilterOperatorContains: 'Содержит',
  headerFilterOperatorDoesNotContain: 'Не содержит',
  headerFilterOperatorEquals: 'Равно',
  headerFilterOperatorDoesNotEqual: 'Не равно',
  headerFilterOperatorStartsWith: 'Начинается с',
  headerFilterOperatorEndsWith: 'Заканчивается на',
  headerFilterOperatorIs: 'Равно',
  headerFilterOperatorNot: 'Не равно',
  headerFilterOperatorAfter: 'После',
  headerFilterOperatorOnOrAfter: 'На или после',
  headerFilterOperatorBefore: 'До',
  headerFilterOperatorOnOrBefore: 'На или до',
  headerFilterOperatorIsEmpty: 'Пусто',
  headerFilterOperatorIsNotEmpty: 'Не пусто',
  headerFilterOperatorIsAnyOf: 'Любое из',
  'headerFilterOperator=': 'Равно',
  'headerFilterOperator!=': 'Не равно',
  'headerFilterOperator>': 'Больше чем',
  'headerFilterOperator>=': 'Больше или равно',
  'headerFilterOperator<': 'Меньше чем',
  'headerFilterOperator<=': 'Меньше или равно',
  headerFilterClear: 'Очистить фильтр',

  // Текст значений фильтра
  filterValueAny: 'любое',
  filterValueTrue: 'да',
  filterValueFalse: 'нет',

  // Текст меню столбца
  columnMenuLabel: 'Меню',
  columnMenuAriaLabel: (columnName: string) => `Меню столбца ${columnName}`,
  columnMenuShowColumns: 'Показать столбцы',
  columnMenuManageColumns: 'Управление столбцами',
  columnMenuFilter: 'Фильтр',
  columnMenuHideColumn: 'Скрыть столбец',
  columnMenuUnsort: 'Сбросить сортировку',
  columnMenuSortAsc: 'Сортировать по возрастанию',
  columnMenuSortDesc: 'Сортировать по убыванию',
  columnMenuManagePivot: 'Управление сводной таблицей',

  // Текст заголовка столбца
  columnHeaderFiltersTooltipActive: (count) => count !== 1 ? `${count} активных фильтров` : `${count} активный фильтр`,
  columnHeaderFiltersLabel: 'Показать фильтры',
  columnHeaderSortIconLabel: 'Сортировка',

  // Текст футера выбранных строк
  footerRowSelected: (count) => count !== 1
    ? `${count.toLocaleString()} выбранных строк`
    : `${count.toLocaleString()} выбранная строка`,

  // Текст футера общего количества строк
  footerTotalRows: 'Всего строк:',

  // Текст футера видимых строк
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} из ${totalCount.toLocaleString()}`,

  // Текст выбора через чекбокс
  checkboxSelectionHeaderName: 'Выбор через чекбокс',
  checkboxSelectionSelectAllRows: 'Выбрать все строки',
  checkboxSelectionUnselectAllRows: 'Снять выбор со всех строк',
  checkboxSelectionSelectRow: 'Выбрать строку',
  checkboxSelectionUnselectRow: 'Снять выбор со строки',

  // Текст для булевых ячеек
  booleanCellTrueLabel: 'да',
  booleanCellFalseLabel: 'нет',

  // Текст кнопки «действия» больше
  actionsCellMore: 'ещё',

  // Текст закрепления столбцов
  pinToLeft: 'Закрепить слева',
  pinToRight: 'Закрепить справа',
  unpin: 'Открепить',


  // Дерево данных
  treeDataGroupingHeaderName: 'Группа',
  treeDataExpand: 'Показать дочерние',
  treeDataCollapse: 'Скрыть дочерние',

  // Группировка столбцов
  groupingColumnHeaderName: 'Группа',
  groupColumn: (name) => `Группировать по ${name}`,
  unGroupColumn: (name) => `Прекратить группировку по ${name}`,

  // Мастер/деталь
  detailPanelToggle: 'Переключить панель деталей',
  expandDetailPanel: 'Развернуть',
  collapseDetailPanel: 'Свернуть',

  // Пагинация
  paginationRowsPerPage: 'Строк на странице:',
  paginationDisplayedRows: ({ from, to, count, estimated }) => {
    if (!estimated) {
      return `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`;
    }
    const estimatedLabel = estimated && estimated > to ? `около ${estimated}` : `более чем ${to}`;
    return `${from}–${to} из ${count !== -1 ? count : estimatedLabel}`;
  },
  paginationItemAriaLabel: (type) => {
    if (type === 'first') {
      return 'Перейти на первую страницу';
    }
    if (type === 'last') {
      return 'Перейти на последнюю страницу';
    }
    if (type === 'next') {
      return 'Перейти на следующую страницу';
    }
    return 'Перейти на предыдущую страницу';
  },

  // Перестановка строк
  rowReorderingHeaderName: 'Перестановка строк',

  // Агрегация
  aggregationMenuItemHeader: 'Агрегация',
  aggregationFunctionLabelSum: 'сумма',
  aggregationFunctionLabelAvg: 'среднее',
  aggregationFunctionLabelMin: 'минимум',
  aggregationFunctionLabelMax: 'максимум',
  aggregationFunctionLabelSize: 'размер',

  // Панель сводной таблицы
  pivotToggleLabel: 'Сводная таблица',
  pivotRows: 'Строки',
  pivotColumns: 'Столбцы',
  pivotValues: 'Значения',
  pivotCloseButton: 'Закрыть настройки сводной таблицы',
  pivotSearchButton: 'Поиск полей',
  pivotSearchControlPlaceholder: 'Поиск полей',
  pivotSearchControlLabel: 'Поиск полей',
  pivotSearchControlClear: 'Очистить поиск',
  pivotNoFields: 'Нет полей',
  pivotMenuMoveUp: 'Переместить вверх',
  pivotMenuMoveDown: 'Переместить вниз',
  pivotMenuMoveToTop: 'Переместить в начало',
  pivotMenuMoveToBottom: 'Переместить в конец',
  pivotMenuRows: 'Строки',
  pivotMenuColumns: 'Столбцы',
  pivotMenuValues: 'Значения',
  pivotMenuOptions: 'Настройки поля',
  pivotMenuAddToRows: 'Добавить в строки',
  pivotMenuAddToColumns: 'Добавить в столбцы',
  pivotMenuAddToValues: 'Добавить в значения',
  pivotMenuRemove: 'Удалить',
  pivotDragToRows: 'Перетащите сюда для создания строк',
  pivotDragToColumns: 'Перетащите сюда для создания столбцов',
  pivotDragToValues: 'Перетащите сюда для создания значений',
  pivotYearColumnHeaderName: '(Год)',
  pivotQuarterColumnHeaderName: '(Квартал)',

  // Панель AI Assistant
  aiAssistantPanelTitle: 'Помощник AI',
  aiAssistantPanelClose: 'Закрыть помощника AI',
  aiAssistantPanelNewConversation: 'Новый диалог',
  aiAssistantPanelConversationHistory: 'История диалогов',
  aiAssistantPanelEmptyConversation: 'История подсказок отсутствует',
  aiAssistantSuggestions: 'Подсказки',


  // Поле ввода запроса
  promptFieldLabel: 'Запрос',
  promptFieldPlaceholder: 'Введите запрос…',
  promptFieldPlaceholderWithRecording: 'Введите или запишите запрос…',
  promptFieldPlaceholderListening: 'Ожидание запроса…',
  promptFieldSpeechRecognitionNotSupported: 'Распознавание речи не поддерживается в этом браузере',
  promptFieldSend: 'Отправить',
  promptFieldRecord: 'Записать',
  promptFieldStopRecording: 'Остановить запись',

  // Запрос
  promptRerun: 'Выполнить снова',
  promptProcessing: 'Обработка…',
  promptAppliedChanges: 'Применённые изменения',

  // Изменения запроса
  promptChangeGroupDescription: (column: string) => `Группировать по ${column}`,
  promptChangeAggregationLabel: (column: string, aggregation: string) => `${column} (${aggregation})`,
  promptChangeAggregationDescription: (column: string, aggregation: string) => `Агрегировать ${column} (${aggregation})`,
  promptChangeFilterLabel: (column: string, operator: string, value: string) => {
    if (operator === 'is any of') {
      return `${column} соответствует любому из: ${value}`;
    }
    return `${column} ${operator} ${value}`;
  },
  promptChangeFilterDescription: (column: string, operator: string, value: string) => {
    if (operator === 'is any of') {
      return `Фильтровать по ${column}, соответствующему любому из: ${value}`;
    }
    return `Фильтровать по ${column} ${operator} ${value}`;
  },
  promptChangeSortDescription: (column: string, direction: string) => `Сортировать по ${column} (${direction})`,
  promptChangePivotEnableLabel: 'Сводная таблица',
  promptChangePivotEnableDescription: 'Включить сводную таблицу',
  promptChangePivotColumnsLabel: (count: number) => `Столбцы (${count})`,
  promptChangePivotColumnsDescription: (column: string, direction: string) => `${column}${direction ? ` (${direction})` : ''}`,
  promptChangePivotRowsLabel: (count: number) => `Строки (${count})`,
  promptChangePivotValuesLabel: (count: number) => `Значения (${count})`,
  promptChangePivotValuesDescription: (column: string, aggregation: string) => `${column} (${aggregation})`,
  toolbarCharts: '',
  columnMenuManageCharts: '',
  aggregationFunctionLabelNone: '',
  chartsNoCharts: '',
  chartsChartNotSelected: '',
  chartsTabChart: '',
  chartsTabFields: '',
  chartsTabCustomize: '',
  chartsCloseButton: '',
  chartsSyncButtonLabel: '',
  chartsSearchPlaceholder: '',
  chartsSearchLabel: '',
  chartsSearchClear: '',
  chartsNoFields: '',
  chartsFieldBlocked: '',
  chartsCategories: '',
  chartsSeries: '',
  chartsMenuAddToDimensions: function (dimensionLabel: string): string {
    throw new Error('Function not implemented.');
  },
  chartsMenuAddToValues: function (valuesLabel: string): string {
    throw new Error('Function not implemented.');
  },
  chartsMenuMoveUp: '',
  chartsMenuMoveDown: '',
  chartsMenuMoveToTop: '',
  chartsMenuMoveToBottom: '',
  chartsMenuOptions: '',
  chartsMenuRemove: '',
  chartsDragToDimensions: function (dimensionLabel: string): string {
    throw new Error('Function not implemented.');
  },
  chartsDragToValues: function (valuesLabel: string): string {
    throw new Error('Function not implemented.');
  }
};
