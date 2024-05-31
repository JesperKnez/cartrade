<script setup>
const {data: auto} = await useFetch('https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=35PFNN');

</script>
<template lang="">
    <div>
        <pre class="text-xl font-mono font-medium">
            {{auto}}
        </pre>
    </div>
</template>
<style lang="">
    
</style>