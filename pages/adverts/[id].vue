<script setup>
const route = useRoute();
const {id} = route.params;

const items = [
  'https://picsum.photos/1920/1080?random=1',
  'https://picsum.photos/1920/1080?random=2',
  'https://picsum.photos/1920/1080?random=3',
  'https://picsum.photos/1920/1080?random=4',
  'https://picsum.photos/1920/1080?random=5',
  'https://picsum.photos/1920/1080?random=6'
];

const links = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: `Advertentie ${id}`,
    to: `/adverts/${id}`
  }
]

const specificationItems = [
  {
    label: 'Basisgegevens',
    slot: 'basisgegevens'
  },
  {
    label: 'Voertuiggeschiedenis',
    slot: 'voertuiggeschiedenis'
  },
  {
    label: 'Opties',
    slot: 'opties'
  },
  {
    label: 'Technische gegevens',
    slot: 'technische_gegevens'
  },
  {
    label: 'Energie en milieu',
    slot: 'energie_en_milieu'
  },
  {
    label: 'Maten en gewichten',
    slot: 'maten_en_gewichten'
  }
]

// Fetch advert data
const {data: advert, error, pending} = useAsyncData('advert', async () => {
  const advert = await $fetch(`http://localhost:3001/api/adverts/get`, {
    method: 'POST',
    body: JSON.stringify({
      id: id
    })
  });
  return advert;
});

onMounted(() => {
  console.log(`Advert with id ${id} is mounted`);
});


</script>
<template>
  <main v-if="advert" class="mt-6">
    <UBreadcrumb :links="links"/>
    <section class="grid grid-cols-2 gap-8 items-start mt-4">
      <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-full'}" class="h-full w-full" indicators>
        <img :src="item" width="300" height="400" draggable="false" class="w-full aspect-video object-cover">
      </UCarousel>
      <div class="main-specs">
        <h1 class="text-3xl font-bold">{{ advert.merk }} {{ advert.model }}</h1>
        <h2 class="text-2xl font-medium">{{ advert.uitvoering }}</h2>
        <h3 class="text-3xl font-semibold mt-2">€{{ advert.prijs }},-</h3>
        <ul class="list-none mt-4">
          <li class="flex items-center gap-0.5">
            <span>Kenteken:</span>
            <span class="font-semibold">{{ advert.kenteken }}</span>
          </li>
          <li class="flex items-center gap-0.5">
            <span>Bouwjaar:</span>
            <span class="font-semibold">{{ advert.bouwjaar }}</span>
          </li>
          <li class="flex items-center gap-0.5">
            <span>Kilometerstand:</span>
            <span class="font-semibold">{{ advert.kilometerstand }} km</span>
          </li>
          <li class="flex items-center gap-0.5">
            <span>Transmissie:</span>
            <span class="font-semibold" v-if="advert.transmissie === 0">Handgeschakeld</span>
            <span class="font-semibold" v-else>Automaat</span>
          </li>
          <li class="flex items-center gap-0.5">
            <span>Vermogen:</span>
            <span class="font-semibold">{{ advert.vermogen_pk }} pk / {{ advert.vermogen_kw }} kW </span>
          </li>
        </ul>
        <!--        <pre>{{ advert }}</pre>-->
      </div>
    </section>
    <UDivider class="my-6"/>
    <section class="description">
      <h3 class="text-4xl font-bold">Beschrijving</h3>
      <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate delectus doloremque
        doloribus, expedita mollitia odio praesentium quia reprehenderit sapiente vel. Commodi consequuntur culpa
        debitis dolor doloribus ducimus earum eius magni minus nisi placeat possimus repellendus sed tenetur ut, veniam
        vero voluptatem? Alias aliquam consequuntur cum dignissimos, distinctio enim excepturi, facere facilis fugit
        illum incidunt magni maxime nostrum numquam, odio omnis quam qui quos ratione rem repudiandae similique sit
        tempora. Aspernatur cupiditate deleniti dolor in ipsam quidem suscipit vitae voluptas voluptatem.</p>
    </section>
    <section class="specificaties mt-6">
      <h3 class="text-4xl font-bold">Specificaties</h3>
      <UAccordion color="primary" variant="soft" size="lg" :items="specificationItems" class="my-4">
        <template #basisgegevens>
          <ul class="list-none text-lg flex flex-col gap-2">
            <li class="flex items-center gap-1">
              <span>Kenteken:</span>
              <span class="font-semibold">{{ advert.kenteken }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Carosserie:</span>
              <span class="font-semibold">{{ advert.carosserie }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Kleur:</span>
              <span class="font-semibold">{{ advert.kleur }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Aantal stoelen:</span>
              <span class="font-semibold">{{ advert.stoelen }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Aantal deuren:</span>
              <span class="font-semibold">{{ advert.deuren }}</span>
            </li>
          </ul>
        </template>
        <template #voertuiggeschiedenis>
          <ul class="list-none text-lg flex flex-col gap-2">
            <li class="flex items-center gap-1">
              <span>Kilometerstand:</span>
              <span class="font-semibold">{{ advert.kilometerstand }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Bouwjaar:</span>
              <span class="font-semibold">{{ advert.bouwjaar }}</span>
            </li>
          </ul>
        </template>
        <template #opties>
          <p>Hier komt content van een WISIWYG editor</p>
        </template>
        <template #technische_gegevens>
          <ul class="list-none text-lg flex flex-col gap-2">
            <li class="flex items-center gap-1">
              <span>Transmissie:</span>
              <span class="font-semibold" v-if="advert.transmissie === 0">Handgeschakeld</span>
              <span class="font-semibold" v-else>Automaat</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Aantal versnellingen:</span>
              <span class="font-semibold">{{ advert.versnellingen }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Vermogen:</span>
              <span class="font-semibold">{{ advert.vermogen_pk }} pk / {{ advert.vermogen_kw }} kW </span>
            </li>
            <li class="flex items-center gap-1">
              <span>Koppel:</span>
              <span class="font-semibold">{{ advert.koppel }} nm</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Aantal cilinders:</span>
              <span class="font-semibold">{{ advert.aantal_cilinders }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Cilinderinhoud:</span>
              <span class="font-semibold">{{ advert.cilinderinhoud }} cc</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Aandrijving:</span>
              <span v-if="advert.aandrijving === 'FWD'" class="font-semibold">Voor</span>
              <span v-else-if="advert.aandrijving === 'RWD'" class="font-semibold">Achter</span>
              <span v-else class="font-semibold">Vier</span>
            </li>
          </ul>
        </template>
        <template #energie_en_milieu>
          <ul class="list-none text-lg flex flex-col gap-2">
            <li class="flex items-center gap-1">
              <span>Brandstof:</span>
              <span class="font-semibold">{{ advert.brandstof }}</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Verbruik stad:</span>
              <span class="font-semibold">{{ advert.verbruik_stad }} l/100km</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Verbruik snelweg:</span>
              <span class="font-semibold">{{ advert.verbruik_snelweg }} l/100km</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Verbruik gecombineerd:</span>
              <span class="font-semibold">{{ advert.verbruik_gecombineerd }} l/100km</span>
            </li>
            <li class="flex items-center gap-1">
              <span>CO2 uitstoot:</span>
              <span class="font-semibold">{{ advert.uitstoot_gecombineerd }} g/km</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Energielabel:</span>
              <span class="font-semibold">{{ advert.energieklasse }}</span>
            </li>
          </ul>
        </template>
        <template #maten_en_gewichten>
          <ul class="list-none text-lg flex flex-col gap-2">
            <li class="flex items-center gap-1">
              <span>Massa ledig:</span>
              <span class="font-semibold">{{ advert.massa_ledig_voertuig }} kg</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Massa rijklaar:</span>
              <span class="font-semibold">{{ advert.massa_rijklaar }} kg</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Maximaal toelaatbaar gewicht:</span>
              <span class="font-semibold">{{ advert.maximum_massa }} kg</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Maximaal trekgewicht ongeremd:</span>
              <span class="font-semibold">{{ advert.trekmassa_ongeremd }} kg</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Maximaal trekgewicht geremd:</span>
              <span class="font-semibold">{{ advert.trekmassa_geremd }} kg</span>
            </li>
            <li class="flex items-center gap-1">
              <span>Maximum massa samenstelling:</span>
              <span class="font-semibold">{{ advert.max_massa_samenstelling }} kg</span>
            </li>
          </ul>
        </template>
      </UAccordion>
    </section>
  </main>
  <main v-if="!advert && !pending" class="mt-6">
    <h1 class="text-6xl font-extrabold">404</h1>
    <h2 class="text-3xl font-semibold">Advertentie niet gevonden</h2>
    <UButton to="/" class="mt-4 font-semibold">Terug naar startpagina</UButton>
  </main>
</template>