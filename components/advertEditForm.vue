<script setup lang="js">
import {object, string} from 'yup';

const props = defineProps(['id']);

const toast = useToast();

const router = useRouter();

const id = props.id;
const schema = object({
  prijs: string().required('Verplicht veld'),
  kenteken: string().required('Verplicht veld').min(6, 'Kenteken moet 6 karakters bevatten'),
  kilometerstand: string().required('Verplicht veld'),
  koppel: string().required('Verplicht veld'),
  transmissie: string().required('Verplicht veld'),
  versnellingen: string().required('Verplicht veld'),
  aandrijving: string().required('Verplicht veld'),
  brandstof: string().required('Verplicht veld'),
  uitvoering: string().required('Verplicht veld')

});

const advert = reactive({
  id: id,
  kenteken: '',
  merk: '',
  model: '',
  uitvoering: '',
  bouwjaar: '',
  brandstof: '',
  kilometerstand: '',
  prijs: '',
  transmissie: '',
  carosserie: '',
  kleur: '',
  stoelen: '',
  deuren: '',
  versnellingen: '',
  vermogen_pk: '',
  vermogen_kw: '',
  koppel: '',
  aantal_cilinders: '',
  cilinderinhoud: '',
  aandrijving: '',
  verbruik_stad: '',
  verbruik_snelweg: '',
  verbruik_gecombineerd: '',
  uitstoot_gecombineerd: '',
  energieklasse: '',
  massa_ledig_voertuig: '',
  massa_rijklaar: '',
  maximum_massa: '',
  trekmassa_ongeremd: '',
  trekmassa_geremd: '',
  max_massa_samenstelling: ''
});

const aandrijvingen = [{value: 'FWD', label: 'Voor'}, {value: 'RWD', label: 'Achter'}, {
  value: '4WD',
  label: '4x4'
}];

const brandstof = ['Benzine', 'Diesel'];

const transmissie = [{value: 0, label: 'Handgeschakeld'}, {value: 1, label: 'Automaat'}];

const isDisabled = ref(true);

onMounted(async () => {
  const fetchedAdvert = await $fetch(`http://localhost:3001/api/adverts/get`, {
    method: 'POST',
    body: JSON.stringify({
      id: id
    })
  });

  // Loop over the keys of the fetched advert data
  for (const key in fetchedAdvert) {
    // Check if the key exists in the advert object
    if (advert.hasOwnProperty(key)) {
      // Assign the fetched value to the advert object
      advert[key] = fetchedAdvert[key];
    }
  }
  console.log(fetchedAdvert);
  // Enable the form
  isDisabled.value = false;
});

async function onSubmit() {
  console.log(advert);

  try {
    const response = await $fetch('http://localhost:3001/api/adverts/edit', {
      method: 'POST',
      body: JSON.stringify(advert),
      credentials: 'include',
    });
    console.log(response);
    switch (response.message) {
      case 200:
        toast.add({
          title: 'Advertentie',
          description: 'Advertentie gewijzigd',
          color: 'primary',
          timeout: 4000,
          callback: () => router.push('/dashboard')
        });
        break;
      default:
        toast.add({
          title: 'Advertentie',
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
</script>

<template>
  <UForm :schema="schema" :state="advert" class="flex flex-col gap-4 items-stretch"
         @submit="onSubmit">
    <UFormGroup label="Prijs" name="prijs">
      <UInput v-model="advert.prijs"/>
    </UFormGroup>
    <UFormGroup label="Kenteken" name="kenteken">
      <UInput disabled maxlength="6" v-model="advert.kenteken"/>
    </UFormGroup>
    <UDivider label="Basisgegevens"/>
    <div class="flex gap-4 w-full items-center flex-wrap">
      <UFormGroup label="Merk">
        <UInput disabled v-model="advert.merk"/>
      </UFormGroup>
      <UFormGroup label="Model">
        <UInput disabled v-model="advert.model"/>
      </UFormGroup>
      <UFormGroup label="Uitvoering" name="uitvoering" class="flex-grow">
        <UInput :disabled="isDisabled" v-model="advert.uitvoering"/>
      </UFormGroup>
    </div>
    <div class="flex gap-4 w-full items-center flex-wrap">
      <UFormGroup label="Carosserie" class="flex-grow">
        <UInput disabled v-model="advert.carosserie"/>
      </UFormGroup>
      <UFormGroup label="Kleur" class="flex-grow">
        <UInput disabled v-model="advert.kleur"/>
      </UFormGroup>
      <UFormGroup label="Aantal stoelen" class="flex-grow">
        <UInput disabled v-model="advert.stoelen"/>
      </UFormGroup>
      <UFormGroup label="Aantal deuren" class="flex-grow">
        <UInput disabled v-model="advert.deuren"/>
      </UFormGroup>
    </div>
    <UDivider label="Voertuiggeschiedenis"/>
    <div class="flex gap-4 w-full items-center flex-wrap">
      <UFormGroup label="Bouwjaar" class="flex-grow">
        <UInput disabled v-model="advert.bouwjaar"/>
      </UFormGroup>
      <UFormGroup label="Kilometerstand" class="flex-grow" name="kilometerstand">
        <UInput :disabled="isDisabled" v-model="advert.kilometerstand"/>
      </UFormGroup>
    </div>
    <UDivider label="Technische gegevens"/>
    <div class="grid grid-cols-4 gap-x-4 w-full items-center flex-wrap">
      <UFormGroup label="Transmissie" name="transmissie">
        <USelect :disabled="isDisabled" :options="transmissie" v-model="advert.transmissie"/>
      </UFormGroup>
      <UFormGroup label="Aantal versnellingen" name="versnellingen">
        <UInput :disabled="isDisabled" v-model="advert.versnellingen"/>
      </UFormGroup>
      <UFormGroup label="Vermogen PK">
        <UInput disabled v-model="advert.vermogen_pk"/>
      </UFormGroup>
      <UFormGroup label="Vermogen KW">
        <UInput disabled v-model="advert.vermogen_kw"/>
      </UFormGroup>
      <UFormGroup label="Koppel" name="koppel">
        <UInput :disabled="isDisabled" v-model="advert.koppel"/>
      </UFormGroup>
      <UFormGroup label="Aantal cilinders">
        <UInput disabled v-model="advert.aantal_cilinders"/>
      </UFormGroup>
      <UFormGroup label="Cilinderinhoud">
        <UInput disabled v-model="advert.cilinderinhoud"/>
      </UFormGroup>
      <UFormGroup label="Aandrijving" name="aandrijving">
        <USelect :disabled="isDisabled" :options="aandrijvingen" v-model="advert.aandrijving"/>
      </UFormGroup>
    </div>
    <UDivider label="Energie en milieu"/>
    <div class="flex gap-4 w-full items-center flex-wrap">
      <UFormGroup label="Brandstof" class="flex-grow" name="brandstof">
        <USelect :disabled="isDisabled" :options="brandstof" v-model="advert.brandstof"/>
      </UFormGroup>
      <UFormGroup label="Verbruik stad" class="flex-grow">
        <UInput disabled v-model="advert.verbruik_stad"/>
      </UFormGroup>
      <UFormGroup label="Verbruik snelweg" class="flex-grow">
        <UInput disabled v-model="advert.verbruik_snelweg"/>
      </UFormGroup>
      <UFormGroup label="Verbruik gecombineerd" class="flex-grow">
        <UInput disabled v-model="advert.verbruik_gecombineerd"/>
      </UFormGroup>
      <UFormGroup label="Uitstoot" class="flex-grow">
        <UInput disabled v-model="advert.uitstoot_gecombineerd"/>
      </UFormGroup>
      <UFormGroup label="Energieklasse" class="flex-grow">
        <UInput disabled v-model="advert.energieklasse"/>
      </UFormGroup>
    </div>
    <UDivider label="Massa en gewicht"/>
    <div class="flex gap-4 w-full items-center flex-wrap">
      <UFormGroup label="Max Massa Samenstelling" class="flex-grow">
        <UInput disabled v-model="advert.max_massa_samenstelling"/>
      </UFormGroup>
      <UFormGroup label="Massa ledig voertuig" class="flex-grow">
        <UInput disabled v-model="advert.massa_ledig_voertuig"/>
      </UFormGroup>
      <UFormGroup label="Massa rijklaar" class="flex-grow">
        <UInput disabled v-model="advert.massa_rijklaar"/>
      </UFormGroup>
      <UFormGroup label="Maximum massa" class="flex-grow">
        <UInput disabled v-model="advert.maximum_massa"/>
      </UFormGroup>
      <UFormGroup label="Trekmassa ongeremd" class="flex-grow">
        <UInput disabled v-model="advert.trekmassa_ongeremd"/>
      </UFormGroup>
      <UFormGroup label="Trekmassa geremd" class="flex-grow">
        <UInput disabled v-model="advert.trekmassa_geremd"/>
      </UFormGroup>
    </div>
    <UDivider/>
    <UButton class="self-start" type="submit" color="primary" label="Submit"/>
  </UForm>
</template>
<style scoped>

</style>