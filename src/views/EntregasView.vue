<template>
    <v-container>
        <entregas></entregas>
    </v-container>
</template>
<script>
    import EntregasComponent from '../components/EntregasComponent.vue';
    export default{
        name: 'Entregas',
        components:{
            'entregas': EntregasComponent
        }
    }
</script>