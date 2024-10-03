export class Transformer {
  constructor() {}

  transformDates(results) {
    const items = results.map((row) => {
      const date = row[0].date.S
      const values = row.map((item) => {
        const { time, temp } = item
        return { time: Number(time.N), temp: Number(temp.N) }
      })
      return { date, values }
    })

    return items
  }
}
