<template>
    <div v-if="info !== ''" class="mt-2 flex">
        <span class="material-symbols-outlined text-blue-600 mr-1">
            info
        </span>
        <div class="text-gray-700 text-sm whitespace-pre-line">
            <div :class="!showFullInfo ? 'line-clamp-1' : ''">
                {{ info }}
            </div>
            <button
                @click="showFullInfo = !showFullInfo"
                class="text-blue-500 text-xs mt-1 underline" >
                {{ showFullInfo ? 'Weniger anzeigen' : 'Mehr anzeigen' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    info: {
        type: String,
        default: '',
    },
});

const showFullInfo = ref(false);
</script>