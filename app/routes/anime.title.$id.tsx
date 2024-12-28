import AnimeTitleInfo from '~/components/Anime/anime-info/info'
import AnimeVideo from '~/components/Anime/anime-video/video'

const AnimeTitle = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] bg-black w-full">
      <AnimeTitleInfo />
      <section className="relative flex w-3/5 flex-col border border-green-400 text-white">
        <AnimeVideo />
      </section>
    </div>
  )
}

export default AnimeTitle
