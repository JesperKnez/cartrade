<template>
  <div class="py-6 grid grid-cols-2 items-center">
    <div class="logo col-span-1">
      <h1>Cartrade</h1>
    </div>
    <div class="profile col-span-1 flex justify-end items-center gap-4">
      <theme-switcher></theme-switcher>
      <UButton v-if="showLoginButton && !isLoggedIn" to="/login">Inloggen</UButton>
      <UAvatar icon="i-heroicons-user" size="sm" v-if="isLoggedIn"/>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const showLoginButton = computed(() => route.path !== '/login');

const isLoggedIn = ref(false);

const user = useCookie('user');
const username = user.value?.username;

if (user.value !== undefined) {
  isLoggedIn.value = user.value.loggedIn;
}
</script>
