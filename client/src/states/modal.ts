import { create } from 'zustand'

export interface WeightResponseType {
  name: string
  versions: {
    name: string
    versionId: number
    filename: string
    size: number
    downloadUrl: string
  }[]
}

export type VersionType = WeightResponseType['versions'][number]

export interface MainModalState {
  isOpen: boolean
  url?: string
  currentStep: number
  type: 'checkpoint' | 'lora' | 'lycoris' | 'textual-inversion' | 'vae'
  selectedVersion?: VersionType
}

export interface MainModalAction {
  setModalOpen: () => void
  setModalClose: () => void
  setUrl: (url: string) => void
  setType: (type: MainModalState['type']) => void
  increaseStep: () => void
  decreaseStep: () => void
  initializeStep: () => void
  setVersion: (url: VersionType) => void
}

const initialModalState: MainModalState = {
  isOpen: false,
  currentStep: 1,
  type: 'checkpoint',
}

export const useMainModalStore = create<MainModalState & MainModalAction>(
  (set, get) => ({
    ...initialModalState,
    setUrl: (url) => set({ url }),
    setModalOpen: () => set({ isOpen: true }),
    setModalClose: () => set({ isOpen: false }),
    increaseStep: () => set({ currentStep: get().currentStep + 1 }),
    decreaseStep: () => set({ currentStep: get().currentStep - 1 }),
    initializeStep: () => set({ currentStep: 1 }),
    setType: (type) => set({ type }),
    setVersion: (v) => set({ selectedVersion: v }),

    reset: () => set(initialModalState),
  })
)
