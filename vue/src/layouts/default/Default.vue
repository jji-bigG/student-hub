<template>
  <v-app>
    <v-layout row wrap>
      <expandable-drawer />
      <!-- <default-bar /> -->
      <default-view />
    </v-layout>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
import ExpandableDrawer from './ExpandableDrawer.vue';
  import DefaultView from './View.vue'
</script>
