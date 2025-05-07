<template>
    <QuestionaireCard topic-name="Witterungsschutz">
        <template #content>
            <RadioYesNo
                v-if="selectedHousing.includes('seasonal_pasture') || selectedGrazing === 'during_vegetation_period'"
                question="Gibt es einen natürlichen bzw. natürlich gewachsenen oder künstlichen Witterungsschutz?"
                question-key="RF_022"
                :answer-store="answerStore"
                info="Ein Witterungsschutz muss unabhängig der Rasse vorhanden sein, wenn Pferde ganzjährig oder auch außerhalb der Vegetationsperiode über einen längeren Zeitraum ganztägig (24h) auf der Weide gehalten werden. Ein Witterungsschutz bietet Schutz vor Sonne, Wind, Niederschlag.  Natürlicher Witterungsschutz:
                      • Besteht aus natürlichen Gegebenheiten wie Baumgruppen, Hecken, Böschungen, Topografie (Senken, Hügel)
                      • ist abhängig von Standort und Jahreszeit
                      Künstlicher Witterungsschutz:
                      • Von Menschen geschaffene Strukturen wie Unterstände, Weidehütten, Stallgebäude oder Wände" />
            <Radio
                v-if="selectedHousing.includes('year_round_pasture')"
                question="Gibt es einen künstlichen Witterungsschutz?"
                question-key="RF_023"
                :answer-store="answerStore"
                :options="[
                    { label: 'Ja', value: 'yes' },
                    { label: 'Nein', value: 'no' },
                    { label: 'Ja, ich habe mehr als einen Unterstand', value: 'yes_more' }
                ]"
                info="Ein Witterungsschutz muss unabhängig der Rasse vorhanden sein, wenn Pferde ganzjährig oder auch außerhalb der Vegetationsperiode über einen längeren Zeitraum ganztägig (24h) auf der Weide gehalten werden. Ein Witterungsschutz bietet Schutz vor Sonne, Wind, Niederschlag.
                      Natürlicher Witterungsschutz:
                      • Besteht aus natürlichen Gegebenheiten wie Baumgruppen, Hecken, Böschungen, Topografie (Senken, Hügel)
                      • ist abhängig von Standort und Jahreszeit
                      Künstlicher Witterungsschutz:
                      • Von Menschen geschaffene Strukturen wie Unterstände, Weidehütten, Stallgebäude oder Wände" />
            <RadioYesNo
                v-if="(selectedHousing.includes('year_round_pasture') || selectedHousing.includes('seasonal_pasture'))
                    && selectedGrazing !== 'no_access' && (naturalProtection === 'yes' || artificalProtection !== 'no')"
                question="Können alle Pferde gleichzeitig den künstlichen Witterungsschutz aufsuchen?"
                question-key="RF_024"
                :answer-store="answerStore"
                info="die Liegefläche im künstlichen Witterungsschutz > 3 x Wh2/Pferd? (Eine Reduzierung ist möglich bis 2,5 x Wh2/Pferd, wenn günstige Voraussetzungen hinsichtlich Raumstruktur und Management vorhanden sind.)" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Radio from '../questions/Radio.vue'
import { computed } from 'vue';

const props = defineProps({
    answerStore: {
        type: Object,
        required: true,
    },
});

const naturalProtection = computed(() => props.answerStore.getAnswerByKey('RF_022') ?? '');
const artificalProtection = computed(() => props.answerStore.getAnswerByKey('RF_023') ?? '');
const selectedHousing = computed(() => props.answerStore.getAnswerByKey('RF_008_1') ?? []);
const selectedGrazing = computed(() => props.answerStore.getAnswerByKey('RF_018_1') ?? '');

</script>