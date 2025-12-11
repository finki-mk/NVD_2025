<script setup>
import { IconField, InputIcon, InputText } from 'primevue'
import { ref, watch } from 'vue'

const props = defineProps(['updateFilters'])

const searchText = ref('')

watch(searchText, (newValue) => {
  props.updateFilters('search', newValue)
})
</script>

<template>
  <div class="first-navbar-section">
    <i class="pi pi-crown" style="font-size: 25px"></i>
    <ul>
      <li>Find a Store</li>
      <li>Help</li>
      <li>Join us</li>
      <li>Sign in</li>
    </ul>
  </div>

  <div class="second-navbar-section">
    <ul>
      <li>New & Featured</li>
      <li>Men</li>
      <li>Women</li>
      <li>Kids</li>
      <li>Sale</li>
    </ul>

    <div>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="searchText" placeholder="Search" />
      </IconField>
    </div>
  </div>
</template>

<style>
.first-navbar-section > ul {
  list-style: none;
  display: flex;
  align-items: center;
}

.first-navbar-section {
  display: flex;
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 30px;
  align-items: center;
}

.first-navbar-section > ul > li {
  margin-left: 15px;
}

.second-navbar-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
  background-color: white;
}

.second-navbar-section > ul {
  list-style: none;
  display: flex;
}

.second-navbar-section > ul > li {
  margin-left: 20px;
  font-size: 25px;
}
</style>
