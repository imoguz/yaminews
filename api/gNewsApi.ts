export default async function gNewsApi(category: string = 'everything') {
  const apiKey = process.env.NEXT_PUBLIC_GNEWS_KEY
  const url = `https://gnews.io/api/v4/top-headlines?topic=${category}&token=${apiKey}&lang=en&max=5`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data: IResponse = await response.json()
    const sortedArticles = data.articles?.sort((a, b) => {
      return (
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime()
      )
    })

    return sortedArticles
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
