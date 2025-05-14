import { defineStore } from 'pinia';
import { useTemporaryAnswerStore } from './temporaryAnswerStore';

export const useNavigationStore = defineStore('resourceNavigation', {
	state: () => ({
    	currentQuestionnaire: 'companyStructure',
		store: useTemporaryAnswerStore(),
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

    	shouldSkipQuestionnaire(current: string) {
			const selectedHousing = this.store.getAnswerByKey('RF_008') || [];
			if (current === 'singleBox') {
				return !selectedHousing.includes('individual_stabling');
			}
			if (current === 'groupBox') {
				return !selectedHousing.includes('group_housing');
			}
			if (current === 'outlet') {
				return selectedHousing.includes('year_round_pasture');
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
