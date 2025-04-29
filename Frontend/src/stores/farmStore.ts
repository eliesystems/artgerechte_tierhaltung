import type { Farm } from "@/composables/model/farmDtos"
import { defineStore } from "pinia"

export const usefarmsStore = defineStore('farms', {
    state: () => ({
        farms: [] as Farm[],
    }),

    actions: {
        setFarms(farms: Farm[]) {
            this.farms = farms;
        }
    },

    persist: true,
});