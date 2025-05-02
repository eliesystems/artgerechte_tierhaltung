<template>
	<QuestionaireCard topic-name="Sonstiges">
		<template #content>
			<RadioYesNo
				question="Haben sich in der Vergangenheit Verhaltensänderungen bei den Pferden gezeigt?"
				question-key="TI_016"
				:answer-store="answerStore" />
			<Textarea
				v-if="behavioralChange === 'yes'"
				question="Welche Veränderungen wurden festgestellt, über welchen Zeitraum, und welche Maßnahmen wurden ergriffen?"
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

const props = defineProps({
	answerStore: {
		type: Object,
		required: true,
	}
});

const behavioralChange = computed(() => props.answerStore.getAnswerByKey('TI_016') ?? '');
</script>