<template>
  <NuxtImg 
    :src="src" 
    :alt="alt"
    :style="{ shapeOutside: `url('${src}')`, shapeImageThreshold: threshold, shapeMargin: '1rem' }" 
    class="shape"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  threshold?: number
}

withDefaults(defineProps<Props>(), {
  alt: '',
  threshold: 0.2
})
</script>

<style scoped>
.shape {
  shape-image-threshold: 0.2;
}
</style>
