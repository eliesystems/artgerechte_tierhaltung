import { defineStore } from "pinia";

export const useManagementStore = defineStore("management", {
    state: () => ({
        answers: {} as Record<string, any>,
    }),

    actions: {
        saveAnswer(key: string, value: any) {
            this.answers[key] = value;
        },

        getAnswerByKey(key: string) {
            return this.answers[key];
        },

        deleteAnswer(key: string) {
            delete this.answers[key];
        },
      
        resetStore() {
            this.answers = {};
        },
    },
});