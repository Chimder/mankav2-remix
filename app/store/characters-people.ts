/* eslint-disable no-extra-semi */
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createSelectors } from './create-Selectors'

export type Persone = {
  id?: number
  type?: 'character' | 'voices'
  // chaptersLanguage?: string
}

export type PersoneAction = Persone & {
  setPersone: (id: number, type: 'character' | 'voices') => void
  resetPersone: () => void
}
export const personeStore = create<PersoneAction>()(
  immer((set, get) => ({
    id: undefined,
    type: 'character',
    setPersone: async (id, type) => {
      await set(state => {
        ;(state.id = id), (state.type = type)
      })
    },
    resetPersone: async () => {
      await set(state => {
        ;(state.id = undefined), (state.type = 'character')
      })
    },
  })),
)

export const usePersoneStore = createSelectors(personeStore)
