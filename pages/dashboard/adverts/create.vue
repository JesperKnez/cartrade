<script setup lang="js">
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
</script>

<template>
  <main class="grid grid-cols-12 fixed overflow-hidden inset-0">

    <div class="col-span-3 bg-cool-900 border-gray-800 border-solid border-r-2 p-4 ">
      <h1 class="font-bold text-5xl">CarTrade</h1>
      <UDivider class="my-4"/>
      <UVerticalNavigation class="h-full" :links="links"/>
    </div>
    <section class="col-span-9 bg-slate-950 px-4 py-8 overflow-auto flex flex-col gap-6">
      <AdvertForm/>
    </section>
  </main>
</template>

<style scoped>

</style>