import { create } from "zustand";

const useResumeStore = create((set) => ({
  // State
  result: null,        // analysis result
  isLoading: false,    // true while the API call is in progress
  error: null,         // error message if the call fails

  // Actions
  setResult: (data) => set({ result: data }),
  setLoading: (bool) => set({ isLoading: bool }),
  setError: (msg) => set({ error: msg }),
  reset: () => set({ result: null, isLoading: false, error: null })
}))

export default useResumeStore