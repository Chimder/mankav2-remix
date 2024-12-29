import { ScrollRestoration, useParams } from '@remix-run/react'
import { aniwatchApi } from '~/hooks/api/aniwatch/anime'

import VideoList from './video-list'

type Props = {}

function AnimeVideo() {
  const { id } = useParams()
  const { data: videoList } = aniwatchApi.useAnimeEpisodesById({ animeId: id })

  return (
    <div className="chapters-scrollbar h-full overflow-y-scroll pb-6">
      <ScrollRestoration />
      <VideoList
        key={`${videoList?.data?.totalEpisodes}${id}`}
        video={videoList?.data}
      />
    </div>
  )
}

export default AnimeVideo
