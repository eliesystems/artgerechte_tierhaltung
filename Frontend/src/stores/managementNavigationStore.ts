import { defineStore } from 'pinia';
import { useManagementStore } from './managementStore';

export const useNavigationStore = defineStore('managementNavigation', {
    state: () => ({
        currentQuestionnaire: 'managementAndPersonal',
        managementStore: useManagementStore(),
        questionnaireOrder: [
            'managementAndPersonal',
            'feeding',
            'drinking',
            'controll',
            'health',
        ],
    }),

    actions: {
        reset() {
			this.$reset();
		},
        
        setCurrentQuestionnaire(questionnaire: string) {
            this.currentQuestionnaire = questionnaire;
        },

        getNextQuestionnaire(current: string) {
            const currentIndex = this.questionnaireOrder.indexOf(current);
            let nextIndex = currentIndex + 1;
            return this.questionnaireOrder[nextIndex] || null;
        },

        getPreviousQuestionnaire(current: string) {
            const currentIndex = this.questionnaireOrder.indexOf(current);
            let previousIndex = currentIndex - 1;
            return this.questionnaireOrder[previousIndex] || null;
        },
    },
});
