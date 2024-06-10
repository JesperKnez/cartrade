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

// Fetch advert data
const {data: advert, error} = useAsyncData('advert', async () => {
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
  <UBreadcrumb v-if="advert" class="mt-6" :links="links"/>
  <main v-if="advert" class="mt-4">
    <section class="grid grid-cols-2 gap-8 items-start">
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
  </main>
</template>