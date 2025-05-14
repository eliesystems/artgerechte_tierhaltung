<template>
	<QuestionaireCard topic-name="Betriebsleitung und Personal">
		<template #content>
			<MultipleChoice
				question="Welche Qualifikationen hat die Betriebsleitung?"
				question-key="MF_001"
				:answer-store="answerStore"
				:options="options" />
			<Text
				v-for="(choice, index) in selectedAnswer" :key="`MF_009_${index}`"
				:question="`Seit wann besteht diese Qualifikation? ${getLabel(choice)}`"
				:question-key="`MF_002_${index}`"
				:answer-store="answerStore"
				placeholder-text="Tragen Sie bitte die Jahreszahl ein."
				input-type="number" />
			<Radio
				question="Wird an Weiterbildungsangeboten teilgenommen?"
				question-key="MF_003"
				:answer-store="answerStore"
				:options="[
					{ label: '1x/Jahr', value: 'once_per_year' },
					{ label: '2x/Jahr', value: 'twice_per_year' },
					{ label: '>2x/Jahr', value: 'more_than_twice_per_year' },
					{ label: 'Nein, keine Zeit', value: 'no_time' },
					{ label: 'Nein, keine passenden Angebote', value: 'no_suitable_offers' }
				]" />
			<Text
				question="Wie viele Mitarbeiter gibt es für den Betriebszweig der Pferdehaltung (Anzahl der Personen)?"
				question-key="MF_004"
				input-type="number"
				placeholder-text="Bitte tragen Sie die Anzahl der Mitarbeiter ein."
				:answer-store="answerStore" />
			<MultipleChoice
				question="Wer führt die tägliche Tierkontrolle durch?"
				question-key="MF_005"
				:answer-store="answerStore"
				:options="[
					{ label: 'Betriebsleiter', value: 'farm_manager' },
					{ label: 'Auszubildende', value: 'trainee' },
					{ label: 'Mitarbeiter', value: 'staff' },
					{ label: 'Pferdebesitzer', value: 'horse_owner' }
				]" />
			<div v-for="index in personal" :key="index">
				<MultipleChoice
					question="Welche Qualifikation/en hat/haben die für die Tiere verantwortliche/n Person/en (Tierbetreuer)?"
					:question-key="`MF_006_${index}`"
					:answer-store="answerStore"
					:options="options" />
				<div v-for="choice in getSelectedQuals(index)" :key="`MF_007_${index}_${choice}`">
					<Text
						:question="`Seit wann besteht ${getLabel(choice)}?`"
						:question-key="`MF_007_${index}_${choice}`"
						input-type="number"
						placeholder-text="Tragen Sie bitte die Jahreszahl ein."
						:answer-store="answerStore" />
				</div>
			</div>
			<RadioYesNo
				question="Gibt es eine Vertretung oder eine Notfallvertretung für den Tierbetreuer?"
				question-key="MF_008"
				:answer-store="answerStore" />
			<MultipleChoice
				v-if="replacement === 'yes'"
				question="Welche Qualifikationen hat die Vertretung?"
				question-key="MF_009"
				:answer-store="answerStore"
				:options="options" />
			<MultipleChoice
				question="Wer ist verantwortlich für das Grünlandmanagement?"
				question-key="MF_010"
				:answer-store="answerStore"
				:options="[
				    { label: 'Betriebsleiter', value: 'farm_manager' },
					{ label: 'Auszubildende', value: 'apprentice' },
					{ label: 'Mitarbeiter', value: 'employee' },
					{ label: 'Lohnunternehmer', value: 'contractor' },
					{ label: 'Sonstige', value: 'other' },
					{ label: 'Niemand', value: 'none' }
				]" />
			<MultipleChoice
				question="Wer ist verantwortlich für die Anlagenpflege?"
				question-key="MF_010+1"
				:answer-store="answerStore"
				:options="[
				    { label: 'Betriebsleiter', value: 'farm_manager' },
					{ label: 'Auszubildende', value: 'apprentice' },
					{ label: 'Mitarbeiter', value: 'employee' },
					{ label: 'Lohnunternehmer', value: 'contractor' },
					{ label: 'Sonstige', value: 'other' },
					{ label: 'Niemand', value: 'none' }
				]" />
			<MultipleChoice
				v-if="caretaker.size > 0"
				question="Welche Qualifikation hat diese Person?"
				question-key="MF_011"
				:answer-store="answerStore"
				:options="options" />
		</template>
	</QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import Text from '../questions/Text.vue';
import Radio from "../questions/Radio.vue"
import { computed } from 'vue';
import RadioYesNo from '../questions/RadioYesNo.vue';

const props = defineProps({
	answerStore: {
		type: Object,
		required: true,
	},
});

const options = [
    { label: 'Ausbildung zum Pferdewirt', value: 'horse_management_training' },
    { label: 'Ausbildung zum Landwirt', value: 'farmer_training' },
    { label: 'Pferdewirtschaftsmeister', value: 'horse_management_master' },
    { label: 'Agrarbetriebswirt', value: 'agriculture_business_manager' },
    { label: 'Studium Agrarwissenschaften / Pferdewissenschaften (B.Sc., M.Sc.)', value: 'agrarian_horse_sciences_degree' },
    { label: 'Studium Tierwissenschaften/Nutztierwissenschaften (B.Sc., M.Sc.)', value: 'animal_sciences_degree' },
    { label: 'Studium Pferdemanagement / Pferdewirtschaft (B.A. / B.Sc.)', value: 'horse_management_degree' },
    { label: 'Tiermedizin (Staatsexamen / Dr. med. vet.)', value: 'veterinary_medicine_degree' },
    { label: 'Sachkundenachweis Pferdehaltung', value: 'horse_management_certification' },
    { label: 'Langjährige praktische Erfahrung in der Pferdehaltung', value: 'long_term_experience' },
    { label: 'Keine fachspezifische Ausbildung', value: 'none' }
]

const caretaker = computed(() => props.answerStore.getAnswerByKey('MF_010_1') ?? [])
const replacement = computed(() => props.answerStore.getAnswerByKey('MF_008') ?? '')
const selectedAnswer = computed(() => {
	const selected: string[] = props.answerStore.getAnswerByKey('MF_001_1') ?? [];
	return selected.filter(answer => answer !== 'none');
});
const personal = computed(() => props.answerStore.getAnswerByKey('MF_004') ?? 0);
function getSelectedQuals(personIndex: number): string[] {
	const result: Set<string> = new Set();

	const baseKey = `MF_006_${personIndex}`;
	const selected = props.answerStore.getAnswerByKey(baseKey + '_1');

	if (!selected) return [];

	for (const answer of selected) {
		if (answer === 'none') continue;
		result.add(answer);
	}

	return Array.from(result);
}

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
}

</script>