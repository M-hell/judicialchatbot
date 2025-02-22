import { create } from "zustand";

const useUserStore = create((set) => ({
    _id: "",
    email: "",
    name: "",
    nationality: "",
    sex: "",
    token: "",
    
    setUser: ({ _id, email, name, nationality, sex,token }) => set({ _id, email, name, nationality, sex,token }),
    logout: () => set({ _id: null, email: "", name: "", nationality: "", sex: "", token: "" }),
}));

export default useUserStore;
