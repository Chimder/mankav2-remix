import { LoaderFunction } from '@remix-run/node'
import axios from 'axios'

export const loader: LoaderFunction = async ({ request }) => {
  const originalUrl = new URL(request.url)

  // Извлекаем параметр `url`
  const apiPath = originalUrl.searchParams.get('url')
  if (!apiPath) {
    return new Response(
      JSON.stringify({ error: "Missing 'url' query parameter" }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  // Убираем параметр `url` из searchParams для передачи остальных
  const searchParams = new URLSearchParams(originalUrl.search)
  searchParams.delete('url')

  // Базовый адрес MangaDex
  const apiBaseUrl = 'https://api.mangadex.org'

  // Формируем полный путь для запроса
  const apiFullUrl = `${apiBaseUrl}${apiPath}?${searchParams.toString()}`

  try {
    // Прокси-запрос на MangaDex
    const response = await axios({
      url: apiFullUrl,
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        host: undefined, // Убираем заголовок host
      },
      data: request.body,
    })

    // Возвращаем ответ
    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching from MangaDex:', error)

    if (axios.isAxiosError(error) && error.response) {
      return new Response(JSON.stringify({ error: error.response.data }), {
        status: error.response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(
      JSON.stringify({ error: 'Unexpected error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}
