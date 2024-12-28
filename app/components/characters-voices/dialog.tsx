import { ReactNode } from 'react'

import Characters from './character'
import Voices from './voices'
import { usePersoneStore } from '~/store/characters-people'
import { jikanCharacterPeopleApi } from '~/hooks/api/jikan/characters'
import { CharacterFull, GetCharacterFullById200, GetPersonFullById200, PersonFull } from '~/shared/api/jikan/generated'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

type Props = {
  children?: ReactNode
  isOpen?: boolean
  setIsOpen: (isOpen: boolean) => void
}

function DialogCharactersPeople({ isOpen, setIsOpen }: Props) {
  const personeId = usePersoneStore().id
  const personeType = usePersoneStore().type

  const { data } = jikanCharacterPeopleApi.usePersoneById({
    id: personeId,
    type: personeType,
  }) as {
    data: GetCharacterFullById200 | GetPersonFullById200 | undefined
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  console.log('DADTTA', data)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="flex h-[90vh] w-[80vw] max-w-[1200px] flex-col items-center justify-center p-2"
        onPointerDownOutside={handleClose}
        onEscapeKeyDown={handleClose}
      >
        <DialogTitle></DialogTitle>

        {personeType === 'voices' ? (
          <Voices
            handleClose={handleClose}
            key={`voices`}
            voices={data?.data as PersonFull}
          />
        ) : (
          <Characters
            handleClose={handleClose}
            key={`characters`}
            character={data?.data as CharacterFull}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DialogCharactersPeople
