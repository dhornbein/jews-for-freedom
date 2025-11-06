<template>
  <NuxtImg 
    :src="src" 
    :alt="alt"
    :style="{ shapeOutside: `url('${src}')`, shapeImageThreshold: threshold, shapeMargin: margin }" 
    class="shape"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  threshold?: number
  margin?: string
}

withDefaults(defineProps<Props>(), {
  alt: '',
  threshold: 0.2,
  margin: '0.5em'
})
</script>

<style scoped>
.shape {
  shape-image-threshold: 0.2;
}
</style>
