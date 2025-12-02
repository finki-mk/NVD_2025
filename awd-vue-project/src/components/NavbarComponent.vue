<script setup>
const props = defineProps(['navbarTitle'])
</script>

<template>
  <div class="navbar-wrapper">
    <h1>{{ props.navbarTitle || 'Hello world!' }}</h1>
    <ul>
      <li>Home</li>
      <li>Contact</li>
      <li>About us</li>
    </ul>
  </div>
</template>

<style>
.navbar-wrapper {
  background-color: rgb(26, 108, 26);
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.navbar-wrapper > ul {
  margin-right: 50px;
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar-wrapper > ul > li {
  margin-left: 20px;
}
</style>
