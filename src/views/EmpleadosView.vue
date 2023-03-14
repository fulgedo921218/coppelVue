<template>
    <v-container>
        <empleado></empleado>
    </v-container>
</template>
<script>
    import EmpleadoComponent from '../components/EmpleadoComponent';
    export default{
        name: 'empleados',
        components:{
            'empleado': EmpleadoComponent
        }
    }
</script>
<style scoped>
</style>