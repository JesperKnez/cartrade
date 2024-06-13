<template>
  <UBreadcrumb :links="links" class="mt-6"/>
  <main class=" mx-auto mt-4 grid grid-cols-3 gap-6">
    <Filters @submitFilters="handleFilters" :filters="filters" class="col-span-1 border-r-4 border-green-500"/>
    <AdvertGrid :filters="filters" class="col-span-2"/>
  </main>
</template>
<script setup>
const links = [
  {
    label: 'Home',
    to: '/'
  }
]

// Filter state
const filters = reactive({})

const handleFilters = (filterData) => {
  filters.merk = filterData.merk;
  filters.model = filterData.model;

  console.log('Filter properties changed', toRaw(filters));
}
</script>