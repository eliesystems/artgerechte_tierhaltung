<template>
	<QuestionaireCard topic-name="Betriebsleitung und Personal">
		<template #content>
			<MultipleChoice
				question="Welche Qualifikationen hat die Betriebsleitung?"
				question-key="MF_001"
				:store="managementStore"
				:options="[
					{ label: 'Sachkundenachweis', value: 'certificate_of_knowledge' },
					{ label: 'Pferdewirt', value: 'horse_specialist' },
					{ label: 'Pferdewirtschaftsmeister', value: 'horse_management_master' },
					{ label: 'Landwirt', value: 'farmer' },
					{ label: 'Trainer ABC', value: 'trainer_abc' },
					{ label: 'Textfeld für spezifische Qualifikationen', value: 'specific_qualifications' },
					{ label: 'Berufliche Erfahrung in der Pferdebranche', value: 'experience_in_horse_industry' },
					{ label: 'Abschluss Pferdewissenschaften', value: 'degree_in_horse_sciences' },
					{ label: 'Abschluss Agrarwissenschaften', value: 'degree_in_agricultural_sciences' },
					{ label: 'Andere Qualifikation', value: 'other_qualification' },
					{ label: 'Keine Qualifikation', value: 'no_qualification' }
				]" />
			<Text
				question="Seit wann besteht diese Qualifikation?"
				question-key="MF_002"
				:store="managementStore"
				input-type="number" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import Text from '../questions/Text.vue';
import { computed } from 'vue';

const props = defineProps({
	managementStore: {
		type: Object,
		required: true,
	},
});

const selectedAnswer = computed(() => props.managementStore.getAnswerByKey('MF_001') ?? []);

</script>