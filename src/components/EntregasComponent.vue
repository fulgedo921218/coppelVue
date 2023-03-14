<template>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :loading="loadin"
      loading-text="Cargando..."
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >            
          <v-toolbar-title>entregas</v-toolbar-title>         
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
</template>
<script>
  import axios from "axios";
  export default {
    data: () => ({
      search: '',
      headers: [
        { text: 'Empleado', value: 'nombre_empleado' },
        { text: 'Rol', value: 'nombre_rol' },
        { text: 'Pago por entrega', value: 'pagoPorEntrega' },
        { text: 'Cant. entregas', value: 'entregas' },
        { text: 'Pago Total', value: 'pago_total' },
        { text: 'Fecha', value: 'fecha_entrega' },
      ],
      desserts: [],
      loadin:false,
    }),

    created () {
      this.initialize();
    },

    methods: {
        initialize () {
            this.loadin = true;
            axios.get('http://127.0.0.1:8000/api/entregas').then((response) => {
                this.desserts = response.data.data;
                console.log(this.desserts)
                this.loadin = false;
            })
        },
    },
  }
</script>