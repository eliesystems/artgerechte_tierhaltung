<template>
  <main>
    <div class="flex justify-center bg-gray-100">
      <div class="w-full max-w-screen-lg bg-white">
        <div class="flex justify-start mt-4 ml-4">
          <img src="../assets/img/EIP_Logo_Pferd.png" alt="Logo" class="w-16 h-auto">
        </div>
        <div class="w-full flex flex-col md:flex-row items-stretch h-screen">
          <div class="w-full md:w-1/3 bg-white p-4 hidden md:block">
            <img src="../assets/img/test.png" alt="grasing horse" class="w-full h-auto rounded-lg shadow-lg">
          </div>
          <div class="w-full md:w-2/3 bg-white p-4 flex flex-col justify-between">
            <h1 class="text-2xl font-bold mb-4 text-center md:text-left">
              Eine Farm auswählen um weiterzumachen oder eine Farm erstellen
            </h1>
            <FarmSelect />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import FarmSelect from '@/components/FarmSelect.vue';


</script>