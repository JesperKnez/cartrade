<template>
    <div class="grid grid-cols-1 gap-6">
        <Advert v-for="Advert in Adverts" :key="Advert.id" :id="Advert.id" :kenteken="Advert.kenteken" :merk="Advert.merk" :model="Advert.model" :uitvoering="Advert.uitvoering" :bouwjaar="Advert.bouwjaar" :brandstof="Advert.brandstof" :kilometerstand="Advert.kilometerstand" :prijs="Advert.prijs" :transmissie="Advert.transmissie"/>
    </div>
</template>
<script setup lang="js">
const {data: Adverts} = useAsyncData('adverts', async () => {
    const advertenties = await Promise.all([$fetch('http://localhost:3001/api/adverts/all')]);

    return advertenties[0];
})
</script>