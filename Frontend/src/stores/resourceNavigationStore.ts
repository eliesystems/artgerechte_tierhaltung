import { defineStore } from 'pinia';
import { useResourceStore } from './resourceStore';

export const useNavigationStore = defineStore('resourceNavigation', {
	state: () => ({
    	currentQuestionnaire: 'companyStructure',
    	resourceStore: useResourceStore(),
    	questionnaireOrder: [
			'companyStructure',
			'infrastructure',
			'singleBox',
			'groupBox',
			'grazing',
			'weatherProtection',
			'outlet',
			'groundSecurityStableAisle',
			'climateAndLight',
			'stableBedding',
			'fence',
		],
	}),

  	actions: {
    	setCurrentQuestionnaire(questionnaire: string) {
      		this.currentQuestionnaire = questionnaire;
    	},

    	shouldSkipQuestionnaire(current: string) {
			const answer = this.resourceStore.getAnswerByKey('RF_008_1') || [];
			if (current === 'singleBox') {
				return !answer.includes('individual_stabling');
			}
			if (current === 'groupBox') {
				return !answer.includes('group_housing');
			}
			return false;
		},

   		getNextQuestionnaire(current: string) {
      		const currentIndex = this.questionnaireOrder.indexOf(current);
      		let nextIndex = currentIndex + 1;

		    while (nextIndex < this.questionnaireOrder.length && this.shouldSkipQuestionnaire(this.questionnaireOrder[nextIndex])) {
        		nextIndex++;
      		}

      		return this.questionnaireOrder[nextIndex] || null;
    	},

    	getPreviousQuestionnaire(current: string) {
      		const currentIndex = this.questionnaireOrder.indexOf(current);
      		let previousIndex = currentIndex - 1;

      		while (previousIndex >= 0 && this.shouldSkipQuestionnaire(this.questionnaireOrder[previousIndex])) {
        		previousIndex--;
      		}

      		return this.questionnaireOrder[previousIndex] || null;
    	},
  	},
});
