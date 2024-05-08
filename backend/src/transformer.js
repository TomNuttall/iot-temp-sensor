export class Transformer {
  constructor() {}

  transformDates(results) {
    if (!results) return []

    const items = results?.reduce((acc, item) => {
      const { date, time, temp } = item

      if (!(date in acc)) {
        acc[date] = { date, values: [] }
      }

      acc[date].values.push({ time, temp })
      return acc
    }, {})

    return Object.values(items)
  }
}
