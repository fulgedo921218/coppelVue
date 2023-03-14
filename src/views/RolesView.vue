<template>
    <v-container>
        <roles></roles>
    </v-container>
</template>
<script>
    import RolesComponent from '../components/RolesComponent';
    export default{
        name: 'Roles',
        components:{
            'roles': RolesComponent
        }
    }
</script>