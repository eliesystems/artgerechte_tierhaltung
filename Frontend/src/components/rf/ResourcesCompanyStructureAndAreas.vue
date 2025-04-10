<template>
    <QuestionaireCard topic-name="Betriebsstruktur und Flächen" topic-text="Beantworten Sie die folgenden Fragen...">
        <template #content>
            <Radio
                question="Welche Betriebsform liegt vor?"
                question-key="RF_001"
                :store="resourceStore"
                :options="[
                    { label: 'Gewerbliche Pferdehaltung', value: 'commercial_keeping' },
                    { label: 'Private Pferdehaltung', value: 'private_keeping' },
                    { label: 'Landwirtschaftlicher Betrieb', value: 'agricultural_business' }
                    ]" />
            <MultipleChoice
                question="Welche Betriebszweige sind vorhanden?"
                question-key="RF_002"
                :store="resourceStore"
                :options="[
                    { label: 'Pensionspferdehaltung', value: 'boarding_horses' },
                    { label: 'Zucht und Aufzucht (als Pensionsbetrieb)', value: 'breeding_boarding' },
                    { label: 'Haltung von Hengsten', value: 'stallion_housing' },
                    { label: 'Reitschulbetrieb', value: 'riding_school' },
                    { label: 'Weidehaltung', value: 'pasture_holding' },
                    { label: 'Turnier- und Ausbildungsbetrieb', value: 'competition_training' },
                    { label: 'Rekonvaleszenzbetriebe für Pferde', value: 'rehabilitation' },
                    { label: 'Haltung von alten Pferden oder Pferden mit besonderen Bedürfnissen', value: 'special_needs_horses' },
                    { label: 'Anderer Betriebszweig', value: 'other' }
                ]"/>
            <Text
                question="Wie viel landwirtschaftliche Nutzfläche hat der Betrieb (ha)?"
                question-key="RF_003"
                placeholder-text="landwirtschaftliche Nutzfläche in ha"
                input-type="number"
                :store="resourceStore" />
            <Text
                question="Wie viel dieser Fläche steht dauerhaft der Pferdehaltung zur Verfügung (in ha)?"
                question-key="RF_004"
                placeholder-text="Fläche für die Pferdehaltung in ha"
                input-type="number"
                :store="resourceStore" />
            <Text
                question="Wie viel Weidefläche steht den Pferden zur Verfügung (ha)?"
                question-key="RF_005"
                placeholder-text="Weiderfläche der Pferde in ha"
                input-type="number"
                :store="resourceStore" />
            <Text
                question="Wie viele Auslaufflächen (ohne Weideflächen) gibt es?"
                question-key="RF_006"
                placeholder-text="Anzahl der Auslaufflächen (ohne Weideflächen)"
                input-type="number"
                :store="resourceStore" />
            <AreaSize
                v-if="areaCount > 0"
                question="Welche Größe haben diese Flächen jeweils?"
                question-key="RF_007"
                :area-count=areaCount
                :store="resourceStore"
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
    resourceStore: {
        type: Object,
        required: true,
    },
});

const areaCount = computed(() => props.resourceStore.getAnswerByKey('RF_006') ?? 0);
</script>