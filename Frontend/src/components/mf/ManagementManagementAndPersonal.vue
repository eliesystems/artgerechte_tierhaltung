<template>
	<QuestionaireCard topic-name="Betriebsleitung und Personal">
		<template #content>
			<MultipleChoice
				question="Welche Qualifikationen hat die Betriebsleitung?"
				question-key="MF_001"
				:store="managementStore"
				:options="[
					{ label: 'Sachkundenachweis', value: 'certificate_of_knowledge' },
					{ label: 'Pferdewirt', value: 'horse_specialist' },
					{ label: 'Pferdewirtschaftsmeister', value: 'horse_management_master' },
					{ label: 'Landwirt', value: 'farmer' },
					{ label: 'Trainer ABC', value: 'trainer_abc' },
					{ label: 'Textfeld für spezifische Qualifikationen', value: 'specific_qualifications' },
					{ label: 'Berufliche Erfahrung in der Pferdebranche', value: 'experience_in_horse_industry' },
					{ label: 'Abschluss Pferdewissenschaften', value: 'degree_in_horse_sciences' },
					{ label: 'Abschluss Agrarwissenschaften', value: 'degree_in_agricultural_sciences' },
					{ label: 'Andere Qualifikation', value: 'other_qualification' },
					{ label: 'Keine Qualifikation', value: 'no_qualification' }
				]" />
			<Text
				v-for="(choice, index) in selectedAnswer" :key="`RF_009_${index}`"
				:question="`Seit wann besteht diese Qualifikation? ${choice.getLabel()}`"
				:question-key="`MF_002_${index}`"
				:store="managementStore"
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
			<MultipleChoice
				v-if="personal > 0"
				question="Welche Qualifikation/en hat/haben die für die Tiere verantwortliche/n Person/en (Tierbetreuer)?"
				question-key="MF_006"
				:store="managementStore"
				:options="options" />
			<Text
				v-if="personal > 0"
				v-for="(choice, index) in selectedQual" :key="`MF_007_${index}`"
				:question="`Seit wann besteht diese ${getLabel(choice)}?`"
				:question-key="`MF_007_${index}`"
				input-type="number"
				:store="managementStore" />
			<RadioYesNo
				question="Gibt es eine Vertretung oder eine Notfallvertretung für den Tierbetreuer?"
				question-key="MF_008"
				:store="managementStore" />
			<MultipleChoice
				v-if="replacement === 'yes'"
				question="Welche Qualifikationen hat die Vertretung?"
				question-key="MF_009"
				:store="managementStore"
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

const caretaker = computed(() => props.managementStore.getAnswerByKey('MF_010') ?? [])
const replacement = computed(() => props.managementStore.getAnswerByKey('MF_008') ?? '')
const selectedAnswer = computed(() => props.managementStore.getAnswerByKey('MF_001') ?? []);
const personal = computed(() => props.managementStore.getAnswerByKey('MF_004') ?? 0);
const selectedQual = computed(() => props.managementStore.getAnswerByKey('MF_006') ?? []);

function getLabel(value: string) {
  const option = options.find(opt => opt.value === value);
  return option?.label ?? value;
}

</script>