<script setup>
// async function getCarData(){
//     const {data: autoBasis} = await useFetch('https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=35PFNN');
//     const{data: autoBrandstof} = await useFetch('https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=35PFNN');

//     console.log(autoBasis[0], autoBrandstof[0])
//     return [autoBasis[0], autoBrandstof[0]];
// }
const {data: Auto} = useAsyncData('auto', async () => {
    const [autoBasis, autoBrandstof] = await Promise.all([$fetch('https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=35PFNN'), $fetch('https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=35PFNN')]);

    return {
        autoBasis: autoBasis[0],
        autoBrandstof: autoBrandstof[0]
    }
})

</script>
<template lang="">
    <div class="bg-white shadow rounded-lg px-6 py-4">
        <div class="flex justify-between items-start">
            <div>
                <h3 class="text-2xl font-bold flex items-center gap-2">{{Auto.autoBasis.merk}} {{Auto.autoBasis.handelsbenaming}} <span class="text-base font-medium">GLS 1.6i</span></h3>
                <h4 class="text-xl font-semibold"><span class="text-green-500">€</span> 20000,-</h4>
            </div>
            <div class="flex justify-between items-center gap-2">
                <button title="Opslaan" class="bg-green-500 hover:bg-green-800 ease-in-out duration-100 text-white p-3 rounded-full aspect-square flex items-center"><Icon name="mdi:star-plus"/></button>
                <button title="Delen" class="bg-green-800 hover:bg-green-500 ease-in-out duration-100 text-white p-3 rounded-full aspect-square flex items-center"><Icon name="mdi:share-variant"/></button>
            </div>
        </div>
        <div class="grid grid-cols-3 justify-between gap-4 mt-4">
            <img src="/placeholder.png" alt="auto" class="rounded-lg col-span-1"/>
            <div class="col-span-2">
                <ul class="list-none">
                    <li class="text-lg font-semibold font-sans">Kenteken: <span class="text-base font-normal">{{Auto.autoBasis.kenteken}}</span></li>
                    <li class="text-lg font-semibold font-sans">Bouwjaar: <span class="text-base font-normal">{{Auto.autoBasis.datum_eerste_toelating}}</span></li>
                    <li class="text-lg font-semibold font-sans">Carosserie: <span class="text-base font-normal">{{Auto.autoBasis.inrichting}}</span></li>
                    <li class="text-lg font-semibold font-sans">Brandstof: <span class="text-base font-normal">{{Auto.autoBrandstof.brandstof_omschrijving}}</span></li>
                    <li class="text-lg font-semibold font-sans">Vermogen: <span class="text-base font-normal">{{ Math.round(Auto.autoBrandstof.nettomaximumvermogen * 1.34102) }} PK / {{Auto.autoBrandstof.nettomaximumvermogen}} kW</span></li>
                </ul>
                <!-- <pre class="text-xl font-mono font-medium">
                    {{Auto}}
                </pre> -->
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>