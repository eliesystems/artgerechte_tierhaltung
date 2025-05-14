<template>
	<QuestionaireCard topic-name="Sozialverhalten und Komfortverhalten">
		<template #content>
			<Radio
				question="Haben alle Pferde Sicht-, Hör-, Geruchskontakt zu Artgenossen?"
				question-key="TI_001"
				:answer-store="answerStore"
				:options="[
				    { label: 'Ja, soziale Interaktionen sind allen Pferden möglich', value: 'yes_all_horses' },
					{ label: 'Ja, soziale Interaktionen sind für einige Pferde möglich', value: 'yes_some_horses' },
					{ label: 'Nein', value: 'no' }
				]" />
			<RadioYesNo
				question="Sind soziale Interaktionen zwischen allen Pferden möglich (z. B. Zusammensein bzw. Zusammenstehen von Pferden, gegenseitige Fellpflege)?"
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
			<Textarea
                question="Hier können Sie sich noch Notizen machen: "
                question-key="TI_notes_social_behavior_and_comfort"
                :answer-store="answerStore" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import Radio from '../questions/Radio.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Textarea from '../questions/Textarea.vue';

defineProps({
	answerStore: {
		type: Object,
		required: true,
	},
});

</script>