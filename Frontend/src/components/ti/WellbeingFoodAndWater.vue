<template>
	<QuestionaireCard topic-name="Futter- und Wasseraufnahme">
		<template #content>
			<RadioYesNo
				question="Haben alle Pferde ausreichend Ruhe und Zeit für die Wasseraufnahme?"
				question-key="TI_005"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Haben alle Pferde gleichzeitig Zugang zu Raufutter?"
				question-key="TI_006"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Haben alle Pferde ausreichend Ruhe und Zeit für die Futteraufnahme?"
				question-key="TI_007"
				:answer-store="answerStore" />
			<Images
				question="Wie verteilen sich die Pferde auf die Kategorien des Body Condition Scores (BCS)?"
				question-key="TI_008"
				:text="true"
				:answer-store="answerStore"
				:images="[
					{ imgUrl: '/images/body_index/body_index_1.png', value: 'body_1' }
				]" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Images from '../questions/Images.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

defineProps({
	answerStore: {
		type: Object,
		required: true,
	},
})
</script>