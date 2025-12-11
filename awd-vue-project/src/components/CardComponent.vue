<script setup>
import { Card } from 'primevue'

const props = defineProps(['product'])
</script>

<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <img alt="user header" :src="props.product.images[0]" style="width: 280px; height: 230px" />
    </template>
    <template #title>{{ props.product.title }}</template>
    <template #subtitle>{{ props.product.category }}</template>
    <template #content>
      <p class="m-0">
        {{ props.product.description }}
      </p>
    </template>
  </Card>
</template>
