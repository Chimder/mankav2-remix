import { Link, useParams } from '@remix-run/react'
import { getFirstTitle } from '../cards/cards-list'
import { mangaApi } from '~/hooks/api/mangadex/manga'
import { PATH } from '~/shared/constants/path-constants'

const Relation = () => {
  const { id: mangaId } = useParams()
  const { data: manga, isFetching, isLoading } = mangaApi.useMangaByID(mangaId)

  const mangasIds = manga?.data?.relationships
    ?.map(id => id.id)
    .filter((id): id is string => id !== undefined)

  const { data: relations, isFetching: isRelationsFetching } =
    mangaApi.useMangaSearchMany({
      ids: mangasIds,
    })

  // function backgroundImageUrl(manga: Manga) {
  //   return `/api/proxy?url=https://mangadex.org/covers/${manga.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}`
  // }

  if (
    !relations?.data?.length ||
    isFetching ||
    isRelationsFetching ||
    isLoading
  )
    return null
  return (
    <div className="m-1 flex flex-col items-center border-1 border-yellow-800">
      <h1>Relation Manga</h1>
      <ul className="flex flex-row flex-wrap justify-center gap-3">
        {relations?.data?.map(manga => (
          <Link
            className="flex w-32 flex-col items-center"
            to={`${PATH.MANGA.getTitlePath(manga.id)}?name=${getFirstTitle(manga.attributes?.title)}`}
            key={manga.id}
          >
            <div className="mb-2 h-40 w-32 overflow-hidden rounded-lg">
              <img
                className="h-full w-full object-cover"
                src={`${import.meta.env.VITE_IMG_PROXY!}/img/mangadex.org/covers/${manga.id}/${manga?.relationships?.find(obj => obj.type === 'cover_art')?.attributes?.fileName}.256.jpg`}
                loading="lazy"
                alt={getFirstTitle(manga.attributes?.title)}
              />
            </div>
            <div className="line-clamp-2 text-center text-sm">
              {getFirstTitle(manga.attributes?.title)}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Relation
