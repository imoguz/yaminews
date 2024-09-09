export default async function exchangerateApi(): Promise<
  IExchangerateData[] | null
> {
  const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates')
    }

    const data = await response.json()

    const commonCurrencies = [
      'EUR',
      'GBP',
      'JPY',
      'AUD',
      'CAD',
      'CHF',
      'CNY',
      'NZD',
      'INR',
      'TRY',
    ]

    const filteredRates: IExchangerateData[] = []
    for (const currency of commonCurrencies) {
      if (currency in data.conversion_rates) {
        filteredRates.push({
          currency,
          rate: data.conversion_rates[currency],
        })
      }
    }
    return filteredRates
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
