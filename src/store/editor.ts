import { create } from 'zustand'
import { EditorState } from '../types'

interface State {
  state: EditorState
  sourceCode: string
  iframeLoaded: boolean
}

interface Action {
  actions: {
    updateSourceCode: (sourceCode: string) => void
    updateEditorState: (state: EditorState) => void
    onIframeLoad: () => void
  }
}

export const useEditorStore = create<State & Action>((set) => ({
  state: 'editing',
  sourceCode: '',
  iframeLoaded: false,
  actions: {
    updateSourceCode: (sourceCode: string) => set((s) => ({ ...s, sourceCode })),
    updateEditorState: (state: EditorState) => set((s) => ({ ...s, state })),
    onIframeLoad: () => set((s) => ({ ...s, iframeLoaded: true })),
  },
}))

// states
export const useEditorState = () => useEditorStore((s) => s.state)
export const useIframeLoaded = () => useEditorStore((s) => s.iframeLoaded)
// actions
export const useEditorActions = () => useEditorStore((s) => s.actions)
