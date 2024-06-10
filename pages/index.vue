<template>
   <UBreadcrumb :links="links" class="mt-6" />
    <main class="lg:max-w-7xl sm:max-w-full mx-auto mt-4 grid grid-cols-3 gap-6">
        <Filters class="col-span-1 border-r-4 border-green-500" />
        <AdvertGrid class="col-span-2" />
    </main>
</template>
<script setup>
  const links = [
    {
      label: 'Home',
      to: '/'
    }
  ]
</script>