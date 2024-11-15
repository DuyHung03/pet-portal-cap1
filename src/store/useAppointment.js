import { create } from 'zustand';

export const useAppointment = create((set) => ({
    pet: null,
    petOwner: null,
    doctor: null,

    setPet: (newPet) => set(() => ({ pet: newPet })),
    setPetOwner: (newPetOwner) => set(() => ({ petOwner: newPetOwner })),
    setDoctor: (newDoctor) => set(() => ({ doctor: newDoctor })),
}));
