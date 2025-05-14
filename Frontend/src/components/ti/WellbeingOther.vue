<template>
	<QuestionaireCard topic-name="Zustand der Pferde und Sonstiges">
		<template #content>
			<Radio
				question="Treten wiederholt kleine Verletzungen (z. B. Abschürfungen am Fesselgelenk, Druckstellen an den Sprunggelenken) bei den Pferden auf?"
				question-key="TI_014"
				:answer-store="answerStore"
				:options="[
					{ label: 'Ja, regelmäßig', value: 'yes' },
					{ label: 'Nein, selten', value: 'no' }
				]" />
			<RadioYesNo
				question="Gab es in den vergangenen 6 Monaten betriebliche  oder jahreszeitliche Veränderungen (z. B. bauliche Maßnahmen, Personalwechsel, Managementanpassungen), die sich auf das Verhalten oder Wohlbefinden der Pferde ausgewirkt haben könnten?"
				question-key="TI_016"
				:answer-store="answerStore" />
			<Textarea
				v-if="behavioralChange === 'yes'"
				question="Wenn ja, welche Veränderungen wurden festgestellt und welche Maßnahmen wurden ergriffen?"
				question-key="TI_017"
				:answer-store="answerStore"
				placeholder-text="Beschreiben Sie diese kurz" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Textarea from '../questions/Textarea.vue';
import Radio from '../questions/Radio.vue';

const props = defineProps({
	answerStore: {
		type: Object,
		required: true,
	}
});

const behavioralChange = computed(() => props.answerStore.getAnswerByKey('TI_016') ?? '');
</script>