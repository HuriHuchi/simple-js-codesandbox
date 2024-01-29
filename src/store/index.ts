import { create } from 'zustand'
import { EditorState } from '../types'

interface State {
  state: EditorState
  sourceCode: string
}

interface Action {
  actions: {
    updateSourceCode: (string: string) => void
  }
}

export const useEditorStore = create<State & Action>((set) => ({
  state: 'editing',
  sourceCode: '',
  actions: {
    updateSourceCode: (sourceCode: string) => set((state) => ({ ...state, sourceCode })),
  },
}))
