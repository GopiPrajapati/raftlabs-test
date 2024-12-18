import { create } from 'zustand';

interface StoreState {
    bookings: string[];
    addBooking: (propertyId: string) => void;
}

const useStore = create<StoreState>((set) => ({
    bookings: [],
    addBooking: (propertyId) =>
        set((state) => ({ bookings: [...state.bookings, propertyId] })),
}));

export default useStore;

