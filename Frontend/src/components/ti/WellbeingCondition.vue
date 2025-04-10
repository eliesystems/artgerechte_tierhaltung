<template>
	<QuestionaireCard topic-name="Zustand der Pferde">
		<template #content>
			<Radio
				question="Treten wiederholt kleine Verletzungen (z. B. Abschürfungen am Fesselgelenk, Druckstellen an den Sprunggelenken) bei den Pferden auf?"
				question-key="TI_014"
				:store="wellbeingStore"
				:options="[
					{ label: 'Ja, regelmäßig', value: 'yes' },
					{ label: 'Nein, selten', value: 'no' }
				]" />
			<RadioYesNo
				question="Findet bei allen Pferden eine regelmäßige Hufpflege statt?"
				question-key="TI_015"
				:store="wellbeingStore" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Radio from '../questions/Radio.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';


defineProps({
	wellbeingStore: {
		type: Object,
		required: true,
	},
});
</script>