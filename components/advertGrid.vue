<template>
  <div class="grid grid-cols-1 gap-6">
    <Advert v-for="Advert in Adverts" :key="Advert.id" :id="Advert.id" :kenteken="Advert.kenteken" :merk="Advert.merk"
            :model="Advert.model" :uitvoering="Advert.uitvoering" :bouwjaar="Advert.bouwjaar"
            :brandstof="Advert.brandstof" :kilometerstand="Advert.kilometerstand" :prijs="Advert.prijs"
            :transmissie="Advert.transmissie"/>
  </div>
</template>
<script setup lang="js">
const filters = defineProps(['filters'])
const {data: Adverts, refresh} = useAsyncData('adverts', async () => {
  const advertenties = await Promise.all([$fetch('http://localhost:3001/api/adverts/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(filters),
    credentials: 'include'
  })]);

  return advertenties[0];
})

watchEffect(() => {
  if (filters && Object.keys(toRaw(filters).filters).length > 0) {
    console.log('Filters changed', toRaw(toRaw(filters).filters));
    refresh();
  } else {

  }
});
</script>