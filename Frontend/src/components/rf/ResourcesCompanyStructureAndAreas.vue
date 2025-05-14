<template>
    <QuestionaireCard topic-name="Betriebsstruktur und Flächen">
        <template #content>
            <Radio
                question="Welche Betriebsform liegt vor?"
                question-key="RF_001"
                :answer-store="answerStore"
                :options="[
                    { label: 'Gewerbliche Pferdehaltung', value: 'commercial_keeping' },
                    { label: 'Private Pferdehaltung', value: 'private_keeping' },
                    { label: 'Landwirtschaftlicher Betrieb', value: 'agricultural_business' }
                    ]" />
            <MultipleChoice
                question="Welche Betriebszweige sind vorhanden?"
                question-key="RF_002"
                :answer-store="answerStore"
                placeholder-text="Bitte tragen Sie die weiteren Betriebszweige ein."
                :options="[
                    { label: 'Pensionspferdehaltung', value: 'boarding_horses' },
                    { label: 'Zucht und Aufzucht (auch als Pensionsbetrieb)', value: 'breeding_boarding' },
                    { label: 'Haltung von Hengsten', value: 'stallion_housing' },
                    { label: 'Reitschulbetrieb', value: 'riding_school' },
                    { label: 'Freilandhaltung (saisonal/ganzjährig)', value: 'pasture_holding' },
                    { label: 'Turnier- und Ausbildungsbetrieb', value: 'competition_training' },
                    { label: 'Rekonvaleszenzbetriebe für Pferde', value: 'rehabilitation' },
                    { label: 'Haltung von alten Pferden oder Pferden mit besonderen Bedürfnissen (z.B. Asthma oder Hufrehe)', value: 'special_needs_horses' },
                    { label: 'Anderer Betriebszweig', value: 'other' }
                ]"/>
            <Text
                question="Wie viel landwirtschaftliche Nutzfläche hat der Betrieb?"
                question-key="RF_003"
                placeholder-text="landwirtschaftliche Nutzfläche in ha"
                input-type="number"
                :answer-store="answerStore"
                info="Landwirtschaftliche Nutzfläche bezeichnet die Fläche, die ein landwirtschaftlicher Betrieb zur Produktion landwirtschaftlicher Erzeugnisse nutzt. Diese Fläche wird in Hektar (ha) gemessen, wobei 1 Hektar 10.000 Quadratmetern entspricht. Zur landwirtschaftlichen Nutzfläche gehören:
                      • Ackerland: Flächen für den Anbau von Nutzpflanzen wie Getreide
                      • Grünland: Wiesen und Weiden
                      • Feldfutterflächen: Spezielle Flächen, die für die Futterproduktion, beispielsweise von Mais, Getreide oder Gras, angelegt werden
                      Hier sind alle Flächen gemeint, die der Futtergewinnung dienen, ebenso wie Stallgebäude, Auslaufflächen und Weideflächen." />
            <Text
                question=" Wie viel dieser Fläche steht dauerhaft der Pferdehaltung zur Verfügung?"
                question-key="RF_004"
                placeholder-text="Fläche für die Pferdehaltung in ha"
                input-type="number"
                :answer-store="answerStore"
                info="Hier sind alle Flächen gemeint, die der Futtergewinnung dienen, ebenso wie Stallgebäude, Auslaufflächen und Weideflächen, die nur für die Pferdehaltung vorgehalten sind." />
            <Text
                question="Wie viel Weidefläche steht den Pferden zur Verfügung?"
                question-key="RF_005"
                placeholder-text="Weiderfläche für die Pferde in ha"
                input-type="number"
                :answer-store="answerStore"
                info="Die Weidefläche für Pferde wird als Fläche definiert, die für die Haltung und Futteraufnahme von Pferden genutzt wird. Sie muss den spezifischen Bedürfnissen der Tiere gerecht werden. Einige wichtige Merkmale einer Weidefläche für Pferde sind:
                      • Grünlandnutzung: Die Fläche sollte genug Gras bieten, das für die Pferde geeignet ist. In der Regel sind dies Grasarten, die an die Bedingungen und Bedürfnisse von Pferden angepasst sind.
                      • Größe und Qualität der Fläche: Je nach Anzahl und Größe der Pferde kann die benötigte Weidefläche variieren. Eine gängige Faustregel besagt, dass pro Pferd mindestens 0,5 bis Ja Hektar Weidefläche zur Verfügung stehen sollte, je nachdem, wie intensiv die Weide genutzt wird und wie gut das Gras wächst.
                      • Sicherheit: Es muss gewährleistet sein, dass die Weidefläche für die Pferde sicher ist. Weitere Informationen zur sicheren Gestaltung von Weiden und Zäunen sind im Merkblatt der DLG zu finden: DLG Merkblatt 476: Zaunbau in der Pferdehaltung
                      Weitere Informationen zur Weidezaun-Gestaltung können hier abgerufen werden: Bundesanstalt für Landwirtschaft und Ernährung (BLE) – Pressemitteilung 2023" />
            <Text
                question="Wie viele Auslaufflächen (ohne Weideflächen) gibt es?"
                question-key="RF_006"
                placeholder-text="Anzahl der Auslaufflächen (ohne Weideflächen)"
                input-type="number"
                :answer-store="answerStore"
                info="Unter Auslaufflächen sind alle Flächen zu verstehen, die für die freie Bewegung vorgesehen sind. Dazu zählen z.B. befestigte und unbefestigte Flächen mit einer Mindestgröße von 150m2. Die Auslaufflächen dienen der freien Bewegung, sozialen Interaktion, dem Ausleben des natürlichen Verhaltens (wie Wälzen, Spielen, Ruhen) und dem Aufenthalt an der frischen Luft." />
            <AreaSize
                v-if="areaCount > 0"
                question="Welche Größe haben diese Flächen jeweils?"
                question-key="RF_007"
                :area-count=areaCount
                :answer-store="answerStore"
                />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import AreaSize from '../questions/AreaSize.vue';
import MultipleChoice from '../questions/MultipleChoice.vue';
import Radio from '../questions/Radio.vue';
import Text from '../questions/Text.vue';

import { computed } from 'vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});

const areaCount = computed(() => props.answerStore.getAnswerByKey('RF_006') ?? 0);
</script>