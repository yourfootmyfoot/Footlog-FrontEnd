// src/hooks/useClubStore.js
import { create } from 'zustand';

const useClubStore = create((set) => ({
    clubName: '',
    clubCode: '',
    schedule: { days: [], times: [] },
    location: { stadiumName: '', city: '', region: '' },
    ageGender: { ageGroup: '', gender: '' },
    skillLevel: { level: '', gauge: 0 },

  // 상태 업데이트 함수
    setClubInfo: (name, code) => set({ clubName: name, clubCode: code }),
    setSchedule: (days, times) => set({ schedule: { days, times } }),
    setLocation: (stadiumName, city, region) => set({ location: { stadiumName, city, region } }),
    setAgeGender: (ageGroup, gender) => set({ ageGender: { ageGroup, gender } }),
    setSkillLevel: (level, gauge) => set({ skillLevel: { level, gauge } }),

    reset: () => set({
    clubName: '',
    clubCode: '',
    schedule: { days: [], times: [] },
    location: { stadiumName: '', city: '', region: '' },
    ageGender: { ageGroup: '', gender: '' },
    skillLevel: { level: '', gauge: 0 },
    }),
}));

export default useClubStore;
