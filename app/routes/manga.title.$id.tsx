import { HeadersFunction, LoaderFunctionArgs } from '@remix-run/node'
import { ClientLoaderFunctionArgs, json, useLoaderData } from '@remix-run/react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Chapters from '~/components/Manga/title-info/chapters'
import Info from '~/components/Manga/title-info/info'
import { feedApi } from '~/hooks/api/mangadex/feeds'
import { mangaApi } from '~/hooks/api/mangadex/manga'
import { getMangaId, getMangaIdFeed } from '~/shared/api/mangadex/generated'
import { OffsetFilterTitle } from '~/shared/constants/filters'

export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'public, max-age=900',
  }
}
export async function loader({ params }: LoaderFunctionArgs) {
  const queryClient = new QueryClient()
  const id = params.id as string

  await queryClient.prefetchQuery({
    queryKey: [mangaApi.baseKey, id],
    queryFn: ({ signal }) =>
      getMangaId(
        id,
        { 'includes[]': ['manga', 'cover_art', 'author'] },
        { signal },
      ),
  })

  return json({ dehydratedState: dehydrate(queryClient) })
}

// export const clientLoader = async ({
//   request,
//   params,
//   serverLoader,
// }: ClientLoaderFunctionArgs) => {
//   const id = params.id as string
//   const url = new URL(request.url)
//   const queryClient = new QueryClient()
//   const currentPage = Number(url.searchParams.get('page')) || 1
//   const offset = (currentPage - 1) * OffsetFilterTitle

//   await queryClient.prefetchQuery({
//     queryKey: [feedApi.baseKey, id, offset],
//     queryFn: ({ signal }) =>
//       getMangaIdFeed(
//         id!,
//         {
//           'limit': 96,
//           'offset': offset,
//           'order': { chapter: 'desc', volume: 'desc' },
//           'includes[]': ['scanlation_group', 'user'],
//           'contentRating[]': ['safe', 'suggestive'],
//         },
//         { signal },
//       ),
//   })
//   return {
//     dehydratedState: dehydrate(queryClient),
//   }
// }

const MangaTitle = () => {
  const { dehydratedState } = useLoaderData<typeof loader>()

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="z-10 flex h-[calc(100vh-64px)] border-green-400 px-[2px] text-white">
        <div className="order-2 flex w-2/5 flex-col overflow-hidden">
          <div className="chapters-scrollbar flex flex-col overflow-y-auto">
            <Info />
          </div>
        </div>
        <div className="relative flex w-3/5 flex-col border border-green-400 text-white">
          <div className="flex-grow overflow-y-auto">
            <Chapters />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}

export default MangaTitle
