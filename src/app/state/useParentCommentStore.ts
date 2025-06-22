import {create} from 'zustand'

const useParentCommentStore = create((set) => ({
        commentParent: {},
        setCommentParent: (data) => set(() => ({parentComment: data})),
}))

export default useParentCommentStore;