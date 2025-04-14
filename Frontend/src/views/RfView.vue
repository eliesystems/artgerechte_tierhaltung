<template>
	<div class="max-w-4xl mx-auto flex flex-col flex-grow">
		<div v-if="answerLoaded && currentQuestionnaireComponent" class="max-w-4xl mx-auto px-12 py-2 flex-grow">
			<component :is="currentQuestionnaireComponent" :resource-store="resourceStore" />
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
				Speichern und weiter zum Management
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import ResourceSingleBox from '@/components/rf/ResourceSingleBox.vue';
import ResourceGroupBox from '@/components/rf/ResourceGroupBox.vue';
import ResourceInfrastructure from '@/components/rf/ResourceInfrastructure.vue';
import ResourcesCompanyStructureAndAreas from '@/components/rf/ResourcesCompanyStructureAndAreas.vue';
import ResourceGrazing from '@/components/rf/ResourceGrazing.vue';
import ResourceWeatherProtection from '@/components/rf/ResourceWeatherProtection.vue';
import ResourceOutlet from '@/components/rf/ResourceOutlet.vue';
import ResourceGroundSecurityStableAisle from '@/components/rf/ResourceGroudSecurityStableAisle.vue';
import ResourceClimateAndLight from '@/components/rf/ResourceClimateAndLight.vue';
import ResourceStableBedding from '@/components/rf/ResourceStableBedding.vue';
import ResourceFence from '@/components/rf/ResourceFence.vue';
import ResourceNotes from '@/components/rf/ResourceNotes.vue';

import { computed, onMounted, ref } from 'vue';
import { useNavigationStore } from '@/stores/resourceNavigationStore';
import { useResourceStore } from '@/stores/resourceStore';
import { useRouter } from 'vue-router';
import { getAnswers, createAnswers } from '@/composables/services/answer';
import type { CreateAnswerDto } from '@/composables/model/answerDtos';


const navigationStore = useNavigationStore();
const resourceStore = useResourceStore();
const router = useRouter();
const farmId = router.currentRoute.value.query.farmId as string;
const answerLoaded = ref(false);

const questionnaireComponents = {
	companyStructure: ResourcesCompanyStructureAndAreas,
	infrastructure: ResourceInfrastructure,
	singleBox: ResourceSingleBox,
	groupBox: ResourceGroupBox,
	grazing: ResourceGrazing,
	weatherProtection: ResourceWeatherProtection,
	outlet: ResourceOutlet,
	groundSecurityStableAisle: ResourceGroundSecurityStableAisle,
	climateAndLight: ResourceClimateAndLight,
	stableBedding: ResourceStableBedding,
	fence: ResourceFence,
	notes: ResourceNotes,
};

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
	resourceStore.resetStore();
	router.push('/home');
};

const saveResources = async () => {
    if (!farmId) {
        console.error("Farm ID is missing");
        return;
    }

    const answersToSave = Object.entries(resourceStore.answers).map(([key, value]) => {
		const answerDto: CreateAnswerDto = {
			farm_id: farmId,
			question_key: key,
			section: 'resources'
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

	resourceStore.resetStore();
	navigationStore.reset();
    router.push({ name: 'mf', query: { farmId: farmId } });
};


onMounted(async () => {
	try {
		const response = await getAnswers(farmId, 'resources');

		if (response.length > 0) {
			response.forEach(answer => {
				console.log(answer);
        		// Check for string_answer
        		if (answer.string_answer !== undefined && answer.string_answer !== '') {
           			resourceStore.saveAnswer(answer.question_key, answer.string_answer);
        		}

        		// Check for string_array_answer (non-empty array)
        		else if (Array.isArray(answer.string_array_answer) && answer.string_array_answer.length > 0) {
            		resourceStore.saveAnswer(answer.question_key, answer.string_array_answer);
        		}

       			// Check for numeric_answer
        		else if (answer.numeric_answer !== undefined && !isNaN(answer.numeric_answer)) {
            		resourceStore.saveAnswer(answer.question_key, answer.numeric_answer);
        		}

        		// Check for numeric_array_answer (non-empty array)
        		else if (Array.isArray(answer.numeric_array_answer) && answer.numeric_array_answer.length > 0) {
            		resourceStore.saveAnswer(answer.question_key, answer.numeric_array_answer);
        		}
    		});
		};
		answerLoaded.value = true;
	} catch (error) {
		console.error('Error fetching answers');
	}
});

</script>