<template>
  <section 
    ref="sectionRef" 
    class="relative overflow-hidden"
    :class="{ 'is-visible': isVisible }"
  >
    <!-- Background Layer (slowest) -->
    <div 
      class="absolute inset-0 bg-repeat-x bg-bottom bg-contain march-slow"
      :style="{ 
        backgroundImage: 'url(/img/fists-bg.png)',
        transform: `translateY(${backgroundOffset}%)` 
      }"
    />

    <!-- Midground Layer (medium speed) -->
    <div 
      class="absolute inset-0 bg-repeat-x bg-left-bottom bg-contain march-medium"
      :style="{ 
        backgroundImage: 'url(/img/fists-mg.png)',
        transform: `translateY(${midgroundOffset}%)` 
      }"
    />

    <!-- Foreground Layer (fastest) -->
    <div 
      class="absolute inset-0 bg-repeat-x bg-right-bottom bg-contain march-fast"
      :style="{ 
        backgroundImage: 'url(/img/fists-fg.png)',
        transform: `translateY(${foregroundOffset}%)` 
      }"
    />
  </section>
</template>

<style scoped>
@keyframes march {
  0%, 100% {
    background-position-x: 0;
    background-position-y: bottom -20px;
  }
  50% {
    background-position-x: 10px;
    background-position-y: bottom 0px;
  }
}

.march-slow,
.march-medium,
.march-fast {
  animation-play-state: paused;
}

.is-visible .march-slow {
  animation: march 7s ease-in-out infinite;
}

.is-visible .march-medium {
  animation: march 5.5s ease-in-out infinite;
  animation-delay: -0.5s;
}

.is-visible .march-fast {
  animation: march 4s ease-in-out infinite;
  animation-delay: -1s;
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .march-slow,
  .march-medium,
  .march-fast {
    animation: none !important;
  }
}
</style>

<script setup lang="ts">
import { useScroll, useElementBounding, useWindowSize, useElementVisibility } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const { y: scrollY } = useScroll(window, { behavior: 'auto' })
const { top } = useElementBounding(sectionRef)
const { height: windowHeight } = useWindowSize()
const isVisible = useElementVisibility(sectionRef)

// Calculate progress: 0 when entering viewport, 1 when sectionTop reaches 1/4 viewport height
const scrollProgress = computed(() => {
  const viewportHeight = windowHeight.value
  const sectionTop = top.value
  
  // Start: sectionTop == viewportHeight (element enters bottom of viewport)
  // End: sectionTop == viewportHeight * 0.25 (element at 1/4 from top)
  const start = viewportHeight - 100
  const end = viewportHeight * 0.15
  const distance = start - end // How far we need to travel
  
  const progress = (start - sectionTop) / distance
  
  // Clamp between 0 and 1
  return Math.max(0, Math.min(1, progress))
})

// Each layer starts at different times and all end at 0%
const backgroundOffset = computed(() => {
  // Starts at progress 0, ends at progress 0.6
  const layerProgress = Math.max(0, Math.min(1, scrollProgress.value / 0.6))
  return 100 - (layerProgress * 100)
})

const midgroundOffset = computed(() => {
  // Starts at progress 0.2, ends at progress 0.8
  const layerProgress = Math.max(0, Math.min(1, (scrollProgress.value - 0.2) / 0.6))
  return 100 - (layerProgress * 100)
})

const foregroundOffset = computed(() => {
  // Starts at progress 0.4, ends at progress 1.0
  const layerProgress = Math.max(0, Math.min(1, (scrollProgress.value - 0.4) / 0.6))
  return 100 - (layerProgress * 100)
})
</script>
