import { defineStore } from "pinia";

export const useAnswerStore = defineStore("answers", {
    state: () => ({
        answers: {} as Record<string, Record<string,  { value: any; id?: number; dirty?: boolean }>>,
        tempId: -1,
    }),

    actions: {
        getNextTempId() {
            return this.tempId--;
        },

        saveAnswer(farmId: string, key: string, payload: { value: any; id?: number }) {
            this.saveOrUpdateAnswer(farmId, key, payload, true);
        },
        
        updateAnswer(farmId: string, key: string, payload: { value: any; id: number }) {
            this.saveOrUpdateAnswer(farmId, key, payload, false);
        },
        
        saveOrUpdateAnswer(farmId: string, key: string, payload: { value: any; id?: number }, dirty: boolean) {
            if (!this.answers[farmId]) {
                this.answers[farmId] = {};
            }
        
            if (!this.answers[farmId][key]) {
                this.answers[farmId][key] = payload.id
                    ? { value: payload.value, id: payload.id, dirty }
                    : { value: payload.value, dirty };
            } else {
                if (payload.id !== undefined) {
                    this.answers[farmId][key].id = payload.id;
                }
                this.answers[farmId][key].value = payload.value;
                this.answers[farmId][key].dirty = dirty;
            }
        },

        getAnswerByKey(farmId: string, key: string) {
            return this.answers[farmId]?.[key];
        },

        getAnswersByFarmId(farmId: string) {
            return this.answers[farmId];
        },

        getAnswersByFarmIdAndSection(farmId: string, section: string) {
            const farmAnswers = this.answers[farmId] ?? {};
            return Object.fromEntries(
              Object.entries(farmAnswers)
                .filter(([key]) => this.getSectionFromKey(key) === section)
            );
        },

        
        deleteAnswer(farmId: string, key: string) {
            if (this.answers[farmId]) {
                delete this.answers[farmId][key];
            }
        },
      
        resetStore() {
            this.answers = {};
        },

        getSectionFromKey(key: string): "resources" | "management" | "animal_welfare" {
            if (key.startsWith('RF_')) {
                return 'resources';
            } else if (key.startsWith('MF_')) {
                return 'management';
            } else if (key.startsWith('TI_')) {
                return 'animal_welfare';
            }
            
            throw new Error(`Unknown section for key: ${key}`);
        }
    },

    persist: true,
});