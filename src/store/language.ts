import { create } from "zustand";

const Language = create((set) => ({
   price_name: 'eng',
   changePriceName: (title:any) => {
        set({ price_name: title });
   }
}));




export default Language;