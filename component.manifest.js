module.exports = {
  vendorName: 'Directum',
  componentName: 'AbsenceSolution',
  componentVersion: '1.0',
  controls: [
    {
      name: 'AbsenceTable', 
      loaders: [
        {
          name: 'absenceTableLoader',
          scope: 'Cover'
        }
      ],
      displayNames: [
        { locale: 'en', name: 'Absence table' },
        { locale: 'ru', name: 'Таблица отсутствий' },
      ]
    }
  ]
};


