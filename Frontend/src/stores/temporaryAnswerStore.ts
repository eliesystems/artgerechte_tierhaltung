import { defineStore } from "pinia";

export const useTemporaryAnswerStore = defineStore("temporaryAnswerStore", {
    state: () => ({
        answers: {} as Record<string, { value: any, id?: number}>,
    }),

    actions: {
        saveAnswer(key: string, value: any, id?: number) {
            this.answers[key] = id !== undefined
              ? { value, id }
              : { value };
          },

        getAnswerByKey(key: string) {
            return this.answers[key]?.value;
        },

        deleteAnswer(key: string) {
            delete this.answers[key];
        },
      
        resetStore() {
            this.answers = {};
        },
    },

    persist: true,
});