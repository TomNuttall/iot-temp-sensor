module.exports = {
  tables: [
    {
      TableName: 'demo-dbtable-iot-backend',
      KeySchema: [{ AttributeName: 'time', KeyType: 'HASH' }],
      AttributeDefinitions: [{ AttributeName: 'time', AttributeType: 'N' }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
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
