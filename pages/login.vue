<script setup lang="js">
import {object, string} from 'yup';

const toast = useToast();
const router = useRouter();

const schema = object({
  username: string().required('Verplicht veld'),
  password: string().required('Verplicht veld').min(8, 'Wachtwoord moet minimaal 8 karakters bevatten')
});

const form = ref();
const onSubmit = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/accounts/login', {
      method: 'POST',
      body: JSON.stringify(state),
      credentials: 'include',
    });
    console.log(response);
    switch (response.message) {
      case 200:
        toast.add({
          title: 'Inloggen',
          description: 'U bent succesvol ingelogd. U wordt zodadelijk doorverwezen.',
          color: 'primary',
          timeout: 4000,
          callback: () => router.push('/dashboard')
        });
        break;
      case 404:
        toast.add({
          title: 'Inloggen',
          description: 'Account niet gevonden. Controleer de gebruikersnaam',
          color: 'red',
          timeout: 0,
        });
        break;
      case 401:
        toast.add({
          title: 'Inloggen',
          description: 'Wachtwoord onjuist, probeer het opnieuw',
          color: 'red',
          timeout: 0
        });
        break;
      default:
        toast.add({
          title: 'Inloggen',
          description: 'Er is een fout opgetreden. Probeer het later opnieuw.',
          color: 'red',
          timeout: 0
        });
        break;
    }
  } catch (error) {
    console.error(error);
  }
}
const state = reactive({
  username: '',
  password: ''
});

</script>

<template>
  <main class="grid my-16 place-content-center">
    <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Gebruikersnaam" name="username">
        <UInput v-model="state.username"/>
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password"/>
      </UFormGroup>

      <UButton type="submit" class="w-full justify-center">
        Inloggen
      </UButton>
    </UForm>
    <p class="text-regular">Nog geen account?
      <NuxtLink to="/signup" class="text-primary underline">Maak een account aan.</NuxtLink>
    </p>
  </main>
</template>

<style scoped>

</style>