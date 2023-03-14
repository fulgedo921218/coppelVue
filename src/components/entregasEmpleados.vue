<template>
    <v-dialog
        v-model="dialog2"
        persistent
        max-width="900px"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ dataUser.nombre }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>


                <v-data-table
                :headers="headers"
                :items="desserts"
                class="elevation-1"
                :loading="loadin"
                loading-text="Cargando..."
                :search="search"
              >
                <template v-slot:top>
                  <v-toolbar
                    flat
                  >            
                    <v-toolbar-title>Entregas</v-toolbar-title>         
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
                          Nueva entrega
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
                                  v-model="editedItem.entregas"
                                  label="Cantidad de entregas"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  v-model="editedItem.fecha_entrega"
                                  label="fecha de entrega"
                                  placeholder="2023-03-12"
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
                        <v-card-title class="text-h5">Estas seguro de eliminar esta entrega?</v-card-title>
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
                <template v-slot:item.total="{ item }">
                    {{ item.pago_total }}
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


            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="closeModal()"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import axios from "axios";
  export default {
    props: {
        dataUser: {
        },
    },
    data: () => ({
      search: '',
      dialog: false,
      dialog2: true,
      dialogDelete: false,
      headers: [
        { text: 'Total de entregas', value: 'entregas' },
        { text: 'Pago total por entregas', value: 'total' },
        { text: 'Fecha de la entrega', value: 'fecha_entrega' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      empleadoID:0,
      loadin:false,
      editedItem: {
        entregas: 0,
        fecha_entrega: '',
      },
      defaultItem: {        
        entregas: 0,       
        fecha_entrega: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva entrega' : 'Editar entrega'
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
    },

    methods: {
        initialize () {
            this.loadin = true;
            axios.get('http://127.0.0.1:8000/api/entregas/'+this.dataUser.id).then((response) => {
                this.desserts = response.data.data;
                console.log(this.desserts)
                this.loadin = false;
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
            axios.delete('http://127.0.0.1:8000/api/entregas/'+this.empleadoID).then((response) => {
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

        closeModal(){
          this.$emit('closeModalEntregas')
        },

        save () {
            this.editedItem.id_empleado = this.dataUser.id;
            this.editedItem.pago_total = this.dataUser.rol.pago_entrega * this.editedItem.entregas;
            if (this.editedIndex > -1) {
                this.loadin = true;
                axios.put('http://127.0.0.1:8000/api/entregas/'+this.empleadoID, this.editedItem).then((response) => {
                    this.initialize();
                    this.loadin = false;
                })
            } else {
                this.loadin = true;
                axios.post('http://127.0.0.1:8000/api/entregas', this.editedItem).then((response) => {
                    this.initialize();
                    this.loadin = false;
                })
            }
            this.close()
        },
    },
  }
</script>