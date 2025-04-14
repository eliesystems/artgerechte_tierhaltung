<template>
	<div class="max-w-4xl mx-auto flex flex-col flex-grow">
		<div v-if="answerLoaded && currentQuestionnaireComponent" class="max-w-4xl mx-auto px-12 py-2 flex-grow">
			<component :is="currentQuestionnaireComponent" :management-store="managementStore" />
		</div>
		<div class="mt-6 mb-20 px-16 flex justify-between">
			<button
				v-if="!hasPreviousQuestionnaire"
				class="hover:bg-[#dac17c] manrope-text py-2 px-4 rounded shadow flex items-center min-w-42"
				@click="goToHome">
				<span class="material-symbols-outlined">chevron_left</span>
				Abbrechen
			</button>
			<button
				v-if="hasPreviousQuestionnaire"
				class="hover:bg-[#dac17c] manrope-text py-2 px-4 rounded shadow flex items-center min-w-42"
				@click="goToPreviousQuestionnaire">
				<span class="material-symbols-outlined">chevron_left</span>
				Zurück
			</button>
			<button
				v-if="hasNextQuestionnaire"
				class="bg-[#d1a62c] hover:bg-[#dac17c] text-white manrope-text py-2 px-4 border rounded shadow flex items-center min-w-42"
				@click="goToNextQuestionnaire">
				Nächste Seite
				<span class="material-symbols-outlined">chevron_right</span>
			</button>
			<button
				v-if="!hasNextQuestionnaire"
				class="bg-[#d1a62c] hover:bg-[#dac17c] text-white manrope-text py-2 px-4 border rounded shadow flex items-center min-w-42"
				@click="saveResources">
				Speichern und weiter zu den Tierwohl Indikatoren
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import ManagementManagementAndPersonal from '@/components/mf/ManagementManagementAndPersonal.vue';
import ManagementFeeding from '@/components/mf/ManagementFeeding.vue';
import ManagementDrinking from '@/components/mf/ManagementDrinking.vue';
import ManagementControll from '@/components/mf/ManagementControll.vue';
import ManagementHealth from '@/components/mf/ManagementHealth.vue';
import ManagementNotes from '@/components/mf/ManagementNotes.vue';

import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useNavigationStore } from '@/stores/managementNavigationStore';
import { getAnswers, createAnswers } from '@/composables/services/answer';
import type { CreateAnswerDto } from '@/composables/model/answerDtos';
import { useManagementStore } from '@/stores/managementStore';

const managementStore = useManagementStore();
const navigationStore = useNavigationStore();
const router = useRouter();
const farmId = router.currentRoute.value.query.farmId as string;
const answerLoaded = ref(false);

const questionnaireComponents = {
    managementAndPersonal: ManagementManagementAndPersonal,
    feeding: ManagementFeeding,
    drinking: ManagementDrinking,
    controll: ManagementControll,
    health: ManagementHealth,
	notes: ManagementNotes
}

const currentQuestionnaireComponent = computed(() => {
	const current = navigationStore.currentQuestionnaire as keyof typeof questionnaireComponents;
	return questionnaireComponents[current] || null;
});

const goToNextQuestionnaire = () => {
	const next = navigationStore.getNextQuestionnaire(navigationStore.currentQuestionnaire);
	if (next) {
		navigationStore.setCurrentQuestionnaire(next);
	}
};

const goToPreviousQuestionnaire = () => {
	const previous = navigationStore.getPreviousQuestionnaire(navigationStore.currentQuestionnaire);
	if (previous) {
		navigationStore.setCurrentQuestionnaire(previous);
	}
};

const hasNextQuestionnaire = computed(() => {
	return navigationStore.getNextQuestionnaire(navigationStore.currentQuestionnaire) !== null;
});

const hasPreviousQuestionnaire = computed(() => {
	return navigationStore.getPreviousQuestionnaire(navigationStore.currentQuestionnaire) !== null;
});

const goToHome = () => {
	managementStore.resetStore();
	router.push('/home');
};

const saveResources = async () => {
    if (!farmId) {
        console.error("Farm ID is missing");
        return;
    }

    const answersToSave = Object.entries(managementStore.answers).map(([key, value]) => {
		const answerDto: CreateAnswerDto = {
			farm_id: farmId,
			question_key: key,
			section: 'management'
		};

        if (Array.isArray(value)) {
            if (typeof value[0] === "string") {
                answerDto.string_array_answer = value;
            } else if (typeof value[0] === "number") {
                answerDto.numeric_array_answer = value;
            }
        } else {
            if (typeof value === "string") {
                answerDto.string_answer = value;
            } else if (typeof value === "number") {
                answerDto.numeric_answer = value;
            }
        }

        return answerDto;
    });

    try {
        await createAnswers(answersToSave);
    } catch (error) {
        console.error("Error saving answers to backend:", error);
    }
	
	managementStore.resetStore();
	navigationStore.reset();
    router.push({ name: 'ti', query: { farmId: farmId } });
};


onMounted(async () => {
	try {
		const response = await getAnswers(farmId, 'management');

		if (response.length > 0) {
			response.forEach(answer => {
        		// Check for string_answer
        		if (answer.string_answer !== undefined && answer.string_answer !== '') {
                    managementStore.saveAnswer(answer.question_key, answer.string_answer);
        		}

        		// Check for string_array_answer (non-empty array)
        		else if (Array.isArray(answer.string_array_answer) && answer.string_array_answer.length > 0) {
            		managementStore.saveAnswer(answer.question_key, answer.string_array_answer);
        		}

       			// Check for numeric_answer
        		else if (answer.numeric_answer !== undefined && !isNaN(answer.numeric_answer)) {
            		managementStore.saveAnswer(answer.question_key, answer.numeric_answer);
        		}

        		// Check for numeric_array_answer (non-empty array)
        		else if (Array.isArray(answer.numeric_array_answer) && answer.numeric_array_answer.length > 0) {
            		managementStore.saveAnswer(answer.question_key, answer.numeric_array_answer);
        		}
    		});
		};
		answerLoaded.value = true;
	} catch (error) {
		console.error('Error fetching answers');
	}
});

</script>