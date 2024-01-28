import { create } from 'zustand'
import { EditorState } from '../types'

interface State {
  state: EditorState
}

export const useEditorStore = create<State>((set) => ({
  state: 'editing',
}))
