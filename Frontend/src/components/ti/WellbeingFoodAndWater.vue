<template>
	<QuestionaireCard topic-name="Futter- und Wasseraufnahme">
		<template #content>
			<RadioYesNo
				question="Haben alle Pferde ausreichend Ruhe und Zeit für die Wasseraufnahme?"
				question-key="TI_005"
				:store="wellbeingStore" />
			<RadioYesNo
				question="Haben alle Pferde gleichzeitig Zugang zu Raufutter?"
				question-key="TI_006"
				:store="wellbeingStore" />
			<RadioYesNo
				question="Haben alle Pferde ausreichend Ruhe und Zeit für die Futteraufnahme?"
				question-key="TI_007"
				:store="wellbeingStore" />
			Wie verteilen sich die Pferde auf die Kategorien des Body Condition Scores (BCS)?
			Hier fehlen noch Bilder
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
})
</script>