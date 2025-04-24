<template>
	<QuestionaireCard topic-name="Betriebsleitung und Personal">
		<template #content>
			<MultipleChoice
				question="Welche Qualifikationen hat die Betriebsleitung?"
				question-key="MF_001"
				:store="managementStore"
				placeholder-text="Tragen Sie bitte die Qualifikation ein."
				:options="options" />
			<Text
				v-for="(choice, index) in selectedAnswer" :key="`RF_009_${index}`"
				:question="`Seit wann besteht diese Qualifikation? ${getLabel(choice)}`"
				:question-key="`MF_002_${index}`"
				:store="managementStore"
				placeholder-text="Tragen Sie bitte die Jahreszahl ein."
				input-type="number" />
			<Radio
				question="Wird an Weiterbildungsangeboten teilgenommen?"
				question-key="MF_003"
				:store="managementStore"
				:options="[
					{ label: '1x/Jahr', value: 'once_per_year' },
					{ label: '2x/Jahr', value: 'twice_per_year' },
					{ label: '>2x/Jahr', value: 'more_than_twice_per_year' },
					{ label: 'Nein, keine Zeit', value: 'no_time' },
					{ label: 'Nein, keine passenden Angebote', value: 'no_suitable_offers' }
				]" />
			<Text
				question="Wie viele Mitarbeiter gibt es auf dem Betrieb?"
				question-key="MF_004"
				input-type="number"
				placeholder-text="Bitte tragen Sie die Anzahl der Mitarbeiter ein."
				:store="managementStore" />
			<MultipleChoice
				question="Wer führt die tägliche Tierkontrolle durch?"
				question-key="MF_005"
				:store="managementStore"
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
					:store="managementStore"
					placeholder-text="Tragen Sie bitte die Qualifikation ein."
					:options="options" />
				<div v-for="choice in getSelectedQuals(index)" :key="`RF_007_${index}_${choice}`">
					<Text
						:question="`Seit wann besteht ${getLabel(choice)}?`"
						:question-key="`MF_007_${index}_${choice}`"
						input-type="number"
						placeholder-text="Tragen Sie bitte die Jahreszahl ein."
						:store="managementStore" />
				</div>
			</div>
			<RadioYesNo
				question="Gibt es eine Vertretung oder eine Notfallvertretung für den Tierbetreuer?"
				question-key="MF_008"
				:store="managementStore" />
			<MultipleChoice
				v-if="replacement === 'yes'"
				question="Welche Qualifikationen hat die Vertretung?"
				question-key="MF_009"
				:store="managementStore"
				placeholder-text="Tragen Sie bitte die Qualifikation ein."
				:options="options" />
			<MultipleChoice
				question="Wer führt die Pflege des Außenbereichs durch (z.B. Grünlandmanagement und Anlagenpflegen)"
				question-key="MF_010"
				:store="managementStore"
				:options="[
					{ label: 'Betriebsleiter', value: 'farm_manager' },
					{ label: 'Auszubildende', value: 'trainee' },
					{ label: 'Mitarbeiter', value: 'staff' },
					{ label: 'Lohnunternehmer', value: 'contractor' },
					{ label: 'Niemand', value: 'no_one' }
				]" />
			<MultipleChoice
				v-if="caretaker.size > 0"
				question="Welche Qualifikation hat diese Person?"
				question-key="MF_011"
				placeholder-text="Tragen Sie bitte die Qualifikation ein."
				:store="managementStore"
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
	managementStore: {
		type: Object,
		required: true,
	},
});

const options = [
	{ label: 'Sachkundenachweis', value: 'certificate_of_knowledge' },
	{ label: 'Pferdewirt', value: 'horse_specialist' },
	{ label: 'Pferdewirtschaftsmeister', value: 'horse_management_master' },
	{ label: 'Landwirt', value: 'farmer' },
	{ label: 'Berufliche Erfahrung in der Pferdebranche', value: 'experience_in_horse_industry' },
	{ label: 'Abschluss Pferdewissenschaften', value: 'degree_in_horse_sciences' },
	{ label: 'Abschluss Agrarwissenschaften', value: 'degree_in_agricultural_sciences' },
	{ label: 'Andere Qualifikation', value: 'other' },
	{ label: 'Keine Qualifikation', value: 'no_qualification' }
]

const caretaker = computed(() => props.managementStore.getAnswerByKey('MF_010_1') ?? [])
const replacement = computed(() => props.managementStore.getAnswerByKey('MF_008') ?? '')
const selectedAnswer = computed(() => props.managementStore.getAnswerByKey('MF_001_1') ?? []);
const personal = computed(() => props.managementStore.getAnswerByKey('MF_004') ?? 0);
function getSelectedQuals(personIndex: number): string[] {
	const result: Set<string> = new Set();

	const baseKey = `MF_006_${personIndex}`;
	const selected = props.managementStore.getAnswerByKey(baseKey + '_1');

	if (!selected) return [];

	for (const answer of selected) {
		if (answer === 'other') {
			const otherValue = props.managementStore.getAnswerByKey(baseKey + '_2');
			if (otherValue) result.add(otherValue);
		} else {
			result.add(answer);
		}
	}

	return Array.from(result);
}

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
}

</script>