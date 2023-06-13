const table_schema = require('./db/schema.json')

module.exports = {
  tables: [
    {
      ...table_schema,
      data: [
        {
          time: 5,
          payload: { temp: 10 },
        },
        {
          time: 15,
          payload: { temp: 20 },
        },
      ],
    },
  ],
  basePort: 8004,
}
