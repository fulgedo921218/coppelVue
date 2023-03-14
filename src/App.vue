<template>
  <v-app>
    <v-container>
      <ul>
        <li>
          <router-link to="/empleados">Empleados</router-link>
        </li>
        <li>
          <router-link to="/roles">Roles</router-link>
        </li>
        <li>
          <router-link to="/entregas">Entregas</router-link>
        </li>
      </ul>
    </v-container>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
