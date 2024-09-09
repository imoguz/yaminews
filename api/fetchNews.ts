export default async function fetchNews(category: string) {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL

  try {
    const response = await fetch(`${baseURL}?collection=${category}`)
    if (!response.ok) {
      throw new Error(`Error fetching news data for ${category} category.`)
    }

    const articles: IArticle[] = await response.json()

    return articles
  } catch (error) {
    console.error('API error:', error)
    throw new Error('Unable to retrieve data.')
  }
}
