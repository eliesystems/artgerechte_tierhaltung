<template>
	<QuestionaireCard topic-name="Bewegungsverhalten und Ruheverhalten">
		<template #content>
			<RadioYesNo
				question="Werden alle Pferde regelmäßig und unabhängig von der Witterung in allen drei Gangarten in der freien Bewegung beobachtet - sofern sie körperlich dazu in der Lage sind?"
				question-key="TI_009"
				:answer-store="answerStore" />
			<RadioYesNo
				v-if="!selectedHousing.includes('individual_stabling')"
				question="Haben alle Pferde zeitgleich, uneingeschränkten und ganzjährig Zugang zu den Liegeflächen im Ruhebereich?"
				question-key="TI_010"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Werden alle Pferde beim Liegen in Bauchlage beobachtet?"
				question-key="TI_011"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Werden alle Pferde beim Liegen in gestreckter Seitenlage beobachtet?"
				question-key="TI_012"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Können die Pferde ihr arttypisches Aufsteh-/Ablegeverhalten ausüben?"
				question-key="TI_013"
				:answer-store="answerStore" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';


const props = defineProps({
	answerStore: {
		type: Object,
		required: true,
	},
});

const selectedHousing = computed(() => props.answerStore.getAnswerByKey('MF_008_1') ?? []);
</script>