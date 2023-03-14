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
          <entregas :dataUser="dataUsers"  @closeModalEntregas="closeModalEntregas()" v-if="dialog2"></entregas>
          <v-toolbar-title>Empleados</v-toolbar-title>         
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Nuevo Empleado
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                        <v-select
                        v-model="editedItem.id_rol"
                        :items="roles"
                        item-text="nombre"
                        item-value="id"
                        label="Roles"
                        dense
                        ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.vales"
                        label="Porcentaje de vales"
                      ></v-text-field>
                    </v-col>
                    
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Estas seguro de eliminar este empleado?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Si, Eliminar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.entregasEchcas="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="showEntregas(item)"
        >
            mdi-magnify
        </v-icon>
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
  import entregasComponent from './entregasEmpleados.vue';
  export default {
    data: () => ({
      search: '',
      dialog: false,
      dialog2: false,
      dialogDelete: false,
      dataUsers:{},
      headers: [
        {
          text: 'Numero',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'nombre',
        },
        { text: 'Rol', value: 'rol.nombre' },
        { text: 'Salario/hora', value: 'rol.salario_hora' },
        { text: 'Jornada/horas', value: 'rol.jornada' },
        { text: 'Dias', value: 'rol.dias' },
        { text: 'Pago/entrega', value: 'rol.pago_entrega' },
        { text: 'Bono', value: 'rol.bono' },
        {text: 'Ver Entregas', value:'entregasEchcas', sortable: false},
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      roles:[],
      editedIndex: -1,
      empleadoID:0,
      loadin:false,
      editedItem: {
        nombre: '',
        id_rol: 0,
        vales: 0,
      },
      defaultItem: {
        nombre: '',
        id_rol: 0,
        vales: 0,
      },
    }),
    components:{
        'entregas': entregasComponent
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo empleado' : 'Editar empleado'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize();
      this.getRol();
    },

    methods: {
        initialize () {
            this.loadin = true;
            axios.get('http://127.0.0.1:8000/api/empleados').then((response) => {
                this.desserts = response.data.data;
                this.loadin = false;
            })
        },

        getRol(){
            axios.get('http://127.0.0.1:8000/api/roles').then((response) => {
                this.roles = response.data;
            })
        },

        editItem (item) {
            this.empleadoID = item.id;
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.empleadoID = item.id;
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.loadin = true;
            axios.delete('http://127.0.0.1:8000/api/empleados/'+this.empleadoID).then((response) => {
                this.initialize();
                this.loadin = false;
            })
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                this.loadin = true;
                axios.put('http://127.0.0.1:8000/api/empleados/'+this.empleadoID, this.editedItem).then((response) => {
                    this.initialize();
                    this.loadin = false;
                })
            } else {
                this.loadin = true;
                axios.post('http://127.0.0.1:8000/api/empleados', this.editedItem).then((response) => {
                    this.initialize();
                    this.loadin = false;
                })
            }
            this.close()
        },

        showEntregas(item){
            this.dialog2 = true;
            this.dataUsers = item;
        },

        closeModalEntregas(){
            this.dialog2 = false;
        },
    },
  }
</script>