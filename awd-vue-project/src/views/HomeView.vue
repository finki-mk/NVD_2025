<script setup>
import CardComponent from '@/components/CardComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { Paginator } from 'primevue'
import { onMounted, reactive, ref, watch, watchEffect } from 'vue'

const filters = reactive({
  search: '',
  category: '',
  price: '',
})

const products = ref([])
const filteredProducts = ref([])
const first = ref(0)
const rows = ref(30)
const showProducts = ref(false)
const totalNumberOfProducts = ref(0)

const updateFilters = (filterName, filterValue) => {
  filters[filterName] = filterValue
}

const displayProducts = (skip = 0, limit = 30) => {
  showProducts.value = true

  fetch('https://dummyjson.com/products?skip=' + skip + '&limit=' + limit)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      products.value = data.products
      filteredProducts.value = data.products
      totalNumberOfProducts.value = data.total
    })
    .catch((error) => console.log(error))
}

onMounted(() => {
  displayProducts()
})

watch(filters, () => {
  if (filters.search) {
    filteredProducts.value = products.value.filter((product) =>
      product.title.toLowerCase().includes(filters.search.toLowerCase()),
    )
  } else {
    filteredProducts.value = products.value
  }
})

watchEffect(() => {
  if (first.value != null && rows.value != null) {
    displayProducts(first.value, rows.value)
  }
  filters
})
</script>

<template>
  <NavbarComponent :updateFilters="updateFilters" />
  <div class="section">
    <h3>{{ filters.search }}</h3>
  </div>
  <div v-if="showProducts" class="products-section">
    <CardComponent v-for="product in filteredProducts" :key="product.id" :product="product" />
  </div>

  <div class="pagination-wrapper">
    <Paginator
      v-model:first="first"
      v-model:rows="rows"
      :totalRecords="totalNumberOfProducts"
      :rowsPerPageOptions="[10, 20, 30]"
    ></Paginator>
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

.pagination-wrapper {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
