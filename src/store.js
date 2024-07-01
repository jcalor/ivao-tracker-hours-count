import { create } from 'zustand'

const useStore = create((set) => ({
    vid: "",
    atcPosition: "",
    data: [],
    totalTime: 0,
    setVid: (vid) => set({ vid }),
    setAtcPosition: (atcPosition) => set({ atcPosition }),
    setData: (data) => set({ data }),
    setTotalTime: (totalTime) => set({ totalTime }),
}))

export default useStore