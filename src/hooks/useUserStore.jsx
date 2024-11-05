import { create } from 'zustand';
import {persist} from 'zustand/middleware';

export const useUserStore = create(persist(
  (set) => ({
    userId: '',

    updateUserId: (id) => set(() => ({ userId: id })),

    clearUserId: () => set(() => ({ userId: null })),
  }),
  { name: 'userId' }
)
);
