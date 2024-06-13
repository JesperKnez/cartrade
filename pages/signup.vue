<script setup lang="js">
import {object, string} from 'yup';

const toast = useToast();

const router = useRouter();

const schema = object({
  username: string().required('Verplicht veld'),
  email: string().required('Verplicht veld').email('Ongeldig e-mailadres'),
  password: string().required('Verplicht veld').min(8, 'Wachtwoord moet minimaal 8 karakters bevatten')
});

const form = ref();
const onSubmit = async () => {
  try {
    const response = await $fetch('http://localhost:3001/api/accounts/add', {
      method: 'POST',
      body: JSON.stringify(state)
    });
    switch (response.message) {
      case 201:
        toast.add({
          title: 'Registratie',
          description: 'U bent succesvol geregistreerd.',
          color: 'primary',
          timeout: 2000,
          callback: () => router.push('/login')
        });
        break;
      case 409:
        toast.add({
          title: 'Registratie',
          description: 'Gebruikersnaam of e-mailadres is al in gebruik. Probeer het opnieuw.',
          color: 'red',
          timeout: 0,
        });
        break;
      default:
        toast.add({
          title: 'Registratie',
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
  email: '',
  password: ''
});

</script>

<template>
  <main class="grid my-16 place-content-center">
    <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Gebruikersnaam" name="username">
        <UInput v-model="state.username"/>
      </UFormGroup>
      <UFormGroup label="E-mailadres" name="email">
        <UInput v-model="state.email" type="email"/>
      </UFormGroup>
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password"/>
      </UFormGroup>
      <p class="text-regular">Heb je al een account?
        <NuxtLink to="/login" class="text-primary underline">Inloggen</NuxtLink>
      </p>
      <UButton type="submit" class="w-full justify-center">
        Registreren
      </UButton>
    </UForm>
  </main>
</template>

<style scoped>

</style>