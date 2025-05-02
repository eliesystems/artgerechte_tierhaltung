import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('wellbeingNavigation', {
	state: () => ({
		currentQuestionnaire: 'socialBehavior',
		questionnaireOrder: [
			'socialBehavior',
			'foodAndWater',
			'movingAndRestingBehavior',
			'condition',
			'other',
			'notes',
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
