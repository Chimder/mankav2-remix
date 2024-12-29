import { HeadersFunction, json, LoaderFunctionArgs } from '@remix-run/node'
import { ScrollRestoration, useLoaderData } from '@remix-run/react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import AnimeTitleInfo from '~/components/Anime/anime-info/info'
import AnimeVideo from '~/components/Anime/anime-video/video'
import { aniwatchApi, instance } from '~/hooks/api/aniwatch/anime'
import { AnimeByIdType } from '~/hooks/api/aniwatch/types'

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=1900',
  }
}
export async function loader({ params }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()
  const id = params.id as string

  await queryClient.prefetchQuery({
    queryKey: [aniwatchApi.baseKey, 'info', id],
    queryFn: async ({ signal }) => {
      const res = await instance.get<AnimeByIdType>(`/anime/${id}`, {
        signal,
      })
      return res.data
    },
  })

  return json({ dehydratedState: dehydrate(queryClient) })
}

const AnimeTitle = () => {
  const { dehydratedState } = useLoaderData<typeof loader>()

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-[calc(100vh-64px)] w-full bg-black">
        <AnimeTitleInfo />
        <section className="relative flex w-3/5 flex-col border border-green-400 text-white">
          <AnimeVideo />
        </section>
      </div>
    </HydrationBoundary>
  )
}

export default AnimeTitle
