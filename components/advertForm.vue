<script setup lang="js">
import {object, string} from 'yup';

const toast = useToast();

const router = useRouter();

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

const isFetching = ref(false);
const isDisabled = ref(true);
watch(() => advert.kenteken, async (newKenteken) => {
  if (newKenteken.length === 6) {
    isFetching.value = true;
    const advertKenteken = newKenteken.toUpperCase();
    const Auto = {
      autoBasis: await $fetch(`https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${advertKenteken}`),
      autoBrandstof: await $fetch(`https://opendata.rdw.nl/resource/8ys7-d773.json?kenteken=${advertKenteken}`)
    };

    // Update state
    advert.merk = Auto.autoBasis[0].merk;
    advert.model = Auto.autoBasis[0].handelsbenaming;
    advert.bouwjaar = Auto.autoBasis[0].datum_eerste_toelating.substring(0, 4);
    advert.brandstof = Auto.autoBrandstof[0].brandstof_omschrijving;
    advert.carosserie = Auto.autoBasis[0].inrichting;
    advert.kleur = Auto.autoBasis[0].eerste_kleur;
    advert.stoelen = Auto.autoBasis[0].aantal_zitplaatsen;
    advert.deuren = Auto.autoBasis[0].aantal_deuren;
    advert.vermogen_pk = Math.round(Auto.autoBrandstof[0].nettomaximumvermogen * 1.36);
    advert.vermogen_kw = Math.round(Auto.autoBrandstof[0].nettomaximumvermogen);
    advert.aantal_cilinders = Auto.autoBasis[0].aantal_cilinders;
    advert.cilinderinhoud = Auto.autoBasis[0].cilinderinhoud;
    advert.verbruik_stad = Auto.autoBrandstof[0].brandstofverbruik_stad;
    advert.verbruik_snelweg = Auto.autoBrandstof[0].brandstofverbruik_buiten;
    advert.verbruik_gecombineerd = Auto.autoBrandstof[0].brandstofverbruik_gecombineerd;
    advert.uitstoot_gecombineerd = Auto.autoBrandstof[0].co2_uitstoot_gecombineerd;
    advert.energieklasse = Auto.autoBasis[0].zuinigheidsclassificatie;
    advert.massa_ledig_voertuig = Auto.autoBasis[0].massa_ledig_voertuig;
    advert.massa_rijklaar = Auto.autoBasis[0].massa_rijklaar;
    advert.maximum_massa = Auto.autoBasis[0].technische_max_massa_voertuig;
    advert.trekmassa_ongeremd = Auto.autoBasis[0].maximum_massa_trekken_ongeremd;
    advert.trekmassa_geremd = Auto.autoBasis[0].maximum_trekken_massa_geremd;
    advert.max_massa_samenstelling = Auto.autoBasis[0].maximum_massa_samenstelling;
    isFetching.value = false;

    // Enable form
    isDisabled.value = false;
  } else {
    isDisabled.value = true;

    // Reset state
    advert.merk = '';
    advert.model = '';
    advert.uitvoering = '';
    advert.bouwjaar = '';
    advert.brandstof = '';
    advert.kilometerstand = '';
    advert.prijs = '';
    advert.transmissie = '';
    advert.carosserie = '';
    advert.kleur = '';
    advert.stoelen = '';
    advert.deuren = '';
    advert.versnellingen = '';
    advert.vermogen_pk = '';
    advert.vermogen_kw = '';
    advert.koppel = '';
    advert.aantal_cilinders = '';
    advert.cilinderinhoud = '';
    advert.aandrijving = '';
    advert.verbruik_stad = '';
    advert.verbruik_snelweg = '';
    advert.verbruik_gecombineerd = '';
    advert.uitstoot_gecombineerd = '';
    advert.energieklasse = '';
    advert.massa_ledig_voertuig = '';
    advert.massa_rijklaar = '';
    advert.maximum_massa = '';
    advert.trekmassa_ongeremd = '';
    advert.trekmassa_geremd = '';
    advert.max_massa_samenstelling = '';
  }
});

async function onSubmit() {
  console.log(advert);

  try {
    const response = await $fetch('http://localhost:3001/api/adverts/add', {
      method: 'POST',
      body: JSON.stringify(advert),
      credentials: 'include',
    });
    console.log(response);
    switch (response.message) {
      case 201:
        toast.add({
          title: 'Advertentie',
          description: 'Advertentie aangemaakt',
          color: 'primary',
          timeout: 2000,
          callback: () => router.push('/dashboard')
        });
        break;
      case 409:
        toast.add({
          title: 'Advertentie',
          description: 'Er is al een advertentie met dit kenteken.',
          color: 'red',
          timeout: 0,
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
  <UForm :schema="schema" :state="advert" class="flex flex-col gap-4 items-stretch" @submit="onSubmit">
    <UFormGroup label="Prijs" name="prijs">
      <UInput v-model="advert.prijs"/>
    </UFormGroup>
    <UFormGroup label="Kenteken" name="kenteken">
      <UInput maxlength="6" v-model="advert.kenteken"/>
    </UFormGroup>
    <UProgress v-if="isFetching" animation="carousel"/>
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