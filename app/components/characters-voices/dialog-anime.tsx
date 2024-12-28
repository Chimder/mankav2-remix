import { useNavigate } from "@remix-run/react"
import { aniwatchApi } from "~/hooks/api/aniwatch/anime"
import { PATH } from "~/shared/constants/path-constants"
import { Dialog, DialogContent } from "../ui/dialog"


type Props = {
  name: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleClose: () => void
}
export default function DialogAnime({
  isOpen,
  setIsOpen,
  handleClose,
  name,
}: Props) {
  const navigate = useNavigate()
  const { data } = aniwatchApi.useAnimeByName({ name })

  const handleAnimeClick = (animeId: string) => {
    handleClose()
    navigate(`${PATH.ANIME.getTitlePath(animeId)}`)
  }
  if (!data) return null
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="min-h-[310px] w-full max-w-[900px]">
        {/* <DialogTitle></DialogTitle> */}
        <div className="flex justify-evenly">
          {data?.map(anime => (
            <div
              key={`${anime.id}${anime.name}new`}
              onClick={() => handleAnimeClick(anime.id)}
              className="h-40 w-32"
            >
              <div className="mb-2 h-40 w-32 overflow-hidden rounded-lg">
                <img src={anime.poster} alt="" />
              </div>
              <h1>{anime.name}</h1>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
