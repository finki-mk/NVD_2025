<script setup>
import { onMounted, ref, watch } from 'vue'
import NavbarComponent from './components/NavbarComponent.vue'

const search = ref('')

const products = ref([])
const filteredProducts = ref([])

const showProducts = ref(false)

const displayProducts = () => {
  showProducts.value = true

  fetch('https://dummyjson.com/products')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      products.value = data.products
      filteredProducts.value = data.products
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  displayProducts()
})

watch(search, () => {
  if (search.value) {
    filteredProducts.value = products.value.filter((product) =>
      product.title.toLowerCase().includes(search.value.toLowerCase()),
    )
  } else {
    filteredProducts.value = products.value
  }
})
</script>

<template>
  <NavbarComponent navbarTitle="Product E-Shop" />

  <input type="text" id="search-bar" v-model="search" />
  <div class="section">
    <h3>{{ search }}</h3>
  </div>
  <!-- <button v-if="!showProducts" @click="displayProducts">Display all products</button> -->
  <div v-if="showProducts" class="products-section">
    <div v-for="product in filteredProducts" :key="product.id" class="card">
      {{ product.title }}
    </div>
  </div>
</template>

<style>
.section {
  margin-top: 30px;
}

.products-section {
  background-color: #f3f3f3;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  row-gap: 30px;
  padding: 30px;
}

.card {
  background-color: white;
  border: 1px solid black;
  width: 280px;
  height: 250px;
}
</style>
