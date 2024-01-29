import { create } from 'zustand'
import { EditorState } from '../types'

interface State {
  state: EditorState
  sourceCode: string
}

interface Action {
  actions: {
    updateSourceCode: (sourceCode: string) => void
    updateEditorState: (state: EditorState) => void
  }
}

export const useEditorStore = create<State & Action>((set) => ({
  state: 'editing',
  sourceCode: '',
  actions: {
    updateSourceCode: (sourceCode: string) => set((s) => ({ ...s, sourceCode })),
    updateEditorState: (state: EditorState) => set((s) => ({ ...s, state })),
  },
}))
