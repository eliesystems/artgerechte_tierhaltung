<template>
	<QuestionaireCard topic-name="Sozialverhalten und Komfortverhalten">
		<template #content>
			<RadioYesNo
				question="Haben alle Pferde Sicht-, Hör-, Geruchskontakt zu Artgenossen?"
				question-key="TI_001"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Können soziale Interaktionen zwischen allen Pferden beobachtet werden (z. B. Zusammensein bzw. Zusammenstehen von Pferden, gegenseitige Fellpflege)?"
				question-key="TI_002"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Gibt es Abwehrverhalten zwischen den Pferden (z. B. Verdrängung an den Fressplätze)?"
				question-key="TI_003"
				:answer-store="answerStore" />
			<RadioYesNo
				question="Wird Komfortverhalten bei allen Pferden beobachtet (z. B. scheuern, wälzen, sonnen)?"
				question-key="TI_004"
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