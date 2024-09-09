interface IArticle {
  id?: string
  title: string
  description: string
  url: string
  author?: string
  urlToImage?: string
  image?: string
  content?: string
  published?: string
  publishedAt?: string
  source?: {
    id?: string
    name: string
    url?: string
  }
  language?: string
  category?: []
}

interface IResponse {
  articles?: IArticle[] | null
  news?: IArticle[] | null
  totalArticles?: number
  status?: string
  totalResults?: number
}

interface IWeatherData {
  city: string
  country: string
  local_time: string
  temperature_c: number
  temperature_f: number
  condition_text: string
  condition_icon: string
  wind_kph: number
  humidity: number
  feelslike_c: number
  feelslike_f: number
  last_updated: string
}

interface IStockData {
  symbol: string
  companyName: string
  latestPrice: number
  change: number
}

interface IExchangerateData {
  currency: string
  rate: number
}

interface IExchangerate {
  [currency: string]: number
}

interface IMenuItem {
  title: string
  path: string
}
