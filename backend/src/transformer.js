export class Transformer {
  constructor() {}

  transformDates(results) {
    const items = results.map((row) => {
      const date = row[0]?.date
      const values = row.map((item) => {
        const { time, temp } = item
        return { time, temp }
      })
      return { date, values }
    })

    return items
  }
}
