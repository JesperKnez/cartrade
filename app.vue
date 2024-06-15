<template>
  <UContainer v-if="!isDashboard">
    <Navigation/>
    <UDivider/>
    <NuxtPage/>
  </UContainer>
  <!--If the route belongs to the dashboard, render the page directly without the container-->
  <template v-else>
    <NuxtPage/>
  </template>
  <UNotifications/>
</template>
<script setup>
const route = useRoute();
const isDashboard = computed(() => route.path.startsWith('/dashboard'));
</script>
<style>
* {
  box-sizing: border-box;
}
</style>
