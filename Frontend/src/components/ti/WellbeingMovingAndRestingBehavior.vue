<template>
	<QuestionaireCard topic-name="Bewegungsverhalten und Ruheverhalten">
		<template #content>
			<RadioYesNo
				question="Werden bei allen Pferden regelmäßig und unabhängig von der Witterung alle drei Gangarten in der freien Bewegung beobachtet?"
				question-key="TI_009"
				:answer-store="answerStore" />
			<RadioYesNo
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
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';


defineProps({
	answerStore: {
		type: Object,
		required: true,
	},
});
</script>