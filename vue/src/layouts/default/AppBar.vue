<template>
  <v-app-bar title="Student Hub">
    <v-app-bar-nav-icon to="/">
      <v-icon icon="mdi-account-school" />
    </v-app-bar-nav-icon>

    <v-btn color="info">University</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';

const isExpanded = ref(true);

function setExpand(value) {
  isExpanded.value = value;
}
</script>
