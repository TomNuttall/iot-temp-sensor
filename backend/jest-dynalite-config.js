const table_schema = require('./db/schema.json')

module.exports = {
  tables: [
    {
      ...table_schema,
      data: [
        {
          date: '01/06/2023',
          time: 1,
          temp: 10,
        },
        {
          date: '02/06/2023',
          time: 5,
          temp: 10,
        },
        {
          date: '02/06/2023',
          time: 15,
          temp: 20,
        },
      ],
    },
  ],
  basePort: 8004,
}
