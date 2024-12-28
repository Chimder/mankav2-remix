

import { aniwatchApi } from '~/hooks/api/aniwatch/anime'
import { Badge } from '../../ui/badge'
import Characters from './characters'
import AnimeRelation from './relation'
import AnimeSeasons from './seasons'
import { useParams } from '@remix-run/react'

// type Props = {}

function AnimeTitleInfo() {
  const { id } = useParams()
  const { data } = aniwatchApi.useAnimeInfoById({ id: id as string })

  const anime = data?.data.anime
  const relatedAnime = data?.data.relatedAnimes
  const seasons = data?.data.seasons

  return (
    <>
      <section className="filterBar order-2 flex w-2/5 flex-col items-start overflow-hidden overflow-y-scroll border border-green-400 px-[2px] text-white">
        <div className="flex w-full flex-col items-center justify-center">
          <img
            className="relative z-10 h-[440px] w-[310px]"
            src={anime?.info.poster}
            alt=""
          />
          <div className="flex flex-col space-y-4">
            <div className="flex items-center">
              <div className="w-24 font-bold">Title:</div>
              <span>{anime?.info.name}</span>
            </div>

            <div className="ml-2 flex flex-wrap gap-2">
              <div>{anime?.info.stats.type}</div>
              <div>{anime?.info.stats.rating}</div>
              <div>{anime?.info.stats.quality}</div>
              <div>{anime?.info.stats.episodes.sub}</div>
              <div>{anime?.info.stats.duration}</div>
              <div>Mal: {anime?.moreInfo.malscore}</div>
            </div>

            <div className="flex items-center">
              <div className="w-24 font-bold">Episodes:</div>
              <div>
                {anime?.info.stats.episodes.sub}{' '}
                {anime?.info.stats.episodes.dub}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 font-bold">Status:</div>
              <div>{anime?.moreInfo.status}</div>
            </div>

            <div className="flex">
              <div className="w-24 font-bold">Genres:</div>
              <div className="flex flex-wrap gap-2">
                {anime?.moreInfo.genres.map(genre => (
                  <Badge
                    variant="outline"
                    color="black"
                    key={genre}
                    className="hover:bg-black"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Characters id={anime?.info.malId} />
        {seasons && <AnimeSeasons animes={seasons} key={`${id}SeasonAnime`} />}
        {relatedAnime && (
          <AnimeRelation animes={relatedAnime} key={`${id}RelatedAnime`} />
        )}
      </section>
    </>
  )
}

export default AnimeTitleInfo
