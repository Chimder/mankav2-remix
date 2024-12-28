
import { SourcesData } from '~/hooks/api/aniwatch/types'
import VideoPlayer from './video-player'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'

type Props = {
  source?: SourcesData
  isLoading: boolean
  isOpen?: boolean
  setIsOpen: (isOpen: boolean) => void
}
function VideoDialog({ source, isLoading, isOpen, setIsOpen }: Props) {
  function handleClose() {
    setIsOpen(false)
  }

  // if (isLoading) return <div>Loading</div>

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="flex h-[90vh] w-[80vw] max-w-[1200px] flex-col items-center justify-center p-2"
        onPointerDownOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <div className="w-full">
          <VideoPlayer {...source} />
        </div>
        <DialogTitle></DialogTitle>
      </DialogContent>
    </Dialog>
  )
}

export default VideoDialog
