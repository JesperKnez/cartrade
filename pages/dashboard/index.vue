<script setup lang="js">
const toast = useToast();
const links = [
  {
    label: 'Advertenties',
    href: '/dashboard/adverts',
    active: true,
  },
  {
    label: 'Favorieten',
    href: '/dashboard/favourites',
    active: false,
  },
  {
    label: 'Chat',
    href: '/dashboard/chat',
    active: false,
  }
];
const headers = useRequestHeaders(['cookie'])
const {data: adverts, refresh} = await useLazyFetch('http://localhost:3001/api/adverts/user', {
  method: 'GET',
  credentials: 'include',
  headers: headers
})
const modalOpen = ref(false)

async function deleteAdvert(id) {
  const headers = useRequestHeaders(['cookie'])
  const response = await $fetch(`http://localhost:3001/api/adverts/delete`, {
    method: 'DELETE',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify({id})
  });
  if (response.message === 205) {
    refresh();
    toast.add({
      title: 'Advertentie',
      description: 'Advertentie verwijderd',
      color: 'primary',
      timeout: 4000
    });
  } else {
    toast.add({
      title: 'Advertentie',
      description: 'Er is een fout opgetreden. Probeer het later opnieuw.',
      color: 'red',
      timeout: 0
    });
  }
}
</script>
<template>
  <main class="grid grid-cols-12 fixed overflow-hidden inset-0">

    <div class="col-span-3 bg-cool-900 border-gray-800 border-solid border-r-2 p-4 ">
      <h1 class="font-bold text-5xl">CarTrade</h1>
      <UDivider class="my-4"/>
      <UVerticalNavigation class="h-full" :links="links"/>
    </div>
    <section class="col-span-9 bg-slate-950 px-4 py-8 overflow-auto flex flex-col gap-6">
      <UButton class="self-end" color="primary" :to="`/dashboard/adverts/create`" label="Advertentie toevoegen"/>
      <UCard v-for="advert in adverts" :ui="{
        background: 'bg-white dark:bg-slate-900'
      }">
        <UModal v-model="modalOpen">
          <div class="p-4">
            <h3 class="text-3xl text-center">Weet je zeker dat je deze advertentie wilt verwijderen?</h3>
            <div class="flex justify-center gap-2 mt-4">
              <UButton color="red" @click="deleteAdvert(advert.id)" label="Ja"/>
              <UButton color="primary" @click="modalOpen = false" label="Nee"/>
            </div>
          </div>
        </UModal>
        <template #header>
          <h1>{{ advert.merk }} {{ advert.model }} {{ advert.uitvoering }}</h1>
        </template>
        <div class="flex justify-start gap-8">
          <img src="/placeholder.png" alt="Car" class="w-1/2"/>
          <ul>
            <li>Kenteken: {{ advert.kenteken }}</li>
            <li>Bouwjaar: {{ advert.bouwjaar }}</li>
            <li>Kilometerstand: {{ advert.kilometerstand }}</li>
            <li>Brandstof: {{ advert.brandstof }}</li>
            <li>Transmissie: {{ advert.transmissie }}</li>
            <li>Prijs: €{{ advert.prijs }},-</li>
          </ul>
        </div>
        <template #footer>
          <div class="flex justify-start gap-2">
            <UButton :to="`/dashboard/adverts/edit_${advert.id}`" color="primary" label="Bewerken"/>
            <UButton color="red" @click="modalOpen = true" label="Verwijderen"/>
          </div>
        </template>
      </UCard>

    </section>
  </main>
</template>