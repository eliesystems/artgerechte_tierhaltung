<template>
	<QuestionaireCard topic-name="Sozialverhalten und Komfortverhalten">
		<template #content>
			<RadioYesNo
				question="Haben alle Pferde Sicht-, Hör-, Geruchskontakt zu Artgenossen?"
				question-key="TI_001"
				:store="wellbeingStore" />
			<RadioYesNo
				question="Können soziale Interaktionen zwischen allen Pferden beobachtet werden (z. B. Zusammensein bzw. Zusammenstehen von Pferden, gegenseitige Fellpflege)?"
				question-key="TI_002"
				:store="wellbeingStore" />
			<RadioYesNo
				question="Gibt es Abwehrverhalten zwischen den Pferden (z. B. Verdrängung an den Fressplätze)?"
				question-key="TI_003"
				:store="wellbeingStore" />
			<RadioYesNo
				question="Wird Komfortverhalten bei allen Pferden beobachtet (z. B. scheuern, wälzen, sonnen)?"
				question-key="TI_004"
				:store="wellbeingStore" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

defineProps({
	wellbeingStore: {
		type: Object,
		required: true,
	},
});

</script>