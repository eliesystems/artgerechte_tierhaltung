<template>
    <div class="container mx-auto p-4">
        <div class="flex justify-between">
            <div class="manrope-header">
                {{ topicName }}
            </div>
            <div>
                <img src="../../assets/img/EIP_Logo_Pferd.png" alt="Logo" class="w-16 h-auto">
            </div>
        </div>
        <hr class="my-2 h-px">
        <div class="manrope-h3">
            {{ topicText }}
        </div>
        <main>
           <slot name="content" />
        </main>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    topicName: {
        type: String,
        default: ''
    },
    topicText: {
        type: String,
        default: ''
    },
})
</script>