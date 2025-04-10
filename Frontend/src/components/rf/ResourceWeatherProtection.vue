<template>
    <QuestionaireCard topic-name="Witterungsschutz">
        <template #content>
            <RadioYesNo
                question="Gibt es einen natürlichen bzw. natürlich gewachsenen oder künstlichen Witterungsschutz?"
                question-key="RF_022"
                :store="resourceStore" />
            <Radio
                question="Gibt es einen künstlichen Witterungsschutz?"
                question-key="RF_023"
                :store="resourceStore"
                :options="[
                    { label: 'Ja', value: 'yes' },
                    { label: 'Nein', value: 'no' },
                    { label: 'Ja, ich habe mehr als einen Unterstand', value: 'yes_more' }
                ]" />
            <RadioYesNo
                question="Können alle Pferde gleichzeitig den künstlichen Witterungsschutz aufsuchen?"
                question-key="RF_024"
                :store="resourceStore" />
        </template>
    </QuestionaireCard>
</template>

<script setup lang="ts">
import QuestionaireCard from '../common/QuestionaireCard.vue';
import RadioYesNo from '../questions/RadioYesNo.vue';
import Radio from '../questions/Radio.vue'

defineProps({
    resourceStore: {
        type: Object,
        required: true,
    },
})

</script>