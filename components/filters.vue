<template>
  <div>
    <h1 class="font-sans text-7xl">Filteren</h1>
    <form @submit.prevent="onSubmit">
      <USelectMenu
          @change="onMerkChange"
          searchable
          searchable-placeholder="Zoek op merk"
          :options="merken"
          :placeholder="'Merk'"
          class="w-full mt-4"
          v-model="merk"
      ></USelectMenu>
      <USelectMenu
          searchable
          searchable-placeholder="Zoek op model"
          :options="modellen"
          :placeholder="'Model'"
          class="w-full mt-4"
          v-model="model"
          :disabled="merk === ''"
      ></USelectMenu>
      <UButton type="submit" class="w-full mt-4" :disabled="merk === '' || model === ''">Zoeken</UButton>
    </form>
  </div>
</template>
<script setup>
import {useAsyncData} from "#app";

const merk = ref('');
const merk_id = ref('*');
const model = ref('');

defineProps(['filters'])

const {data: merken} = await useAsyncData('merken', async () => {
  const merken = await Promise.all([$fetch('http://localhost:3001/api/merken/all')]);
  return merken[0];
});

const {data: modellen, refresh} = await useAsyncData('modellen', async () => {
  const modellen = await Promise.all([$fetch('http://localhost:3001/api/modellen/merk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({merk_id: merk_id.value})
  })]);
  return modellen[0];
});


const emit = defineEmits(['submitFilters']);

const onSubmit = () => {

  const filterData = {
    merk: toRaw(merk.value).label,
    model: toRaw(model.value).label ? toRaw(model.value).label : ''
  }

  emit('submitFilters', filterData);
}

const onMerkChange = (value) => {
  merk_id.value = toRaw(value).id;
  model.value = '';
  refresh();
}
</script>
<style lang="">

</style>