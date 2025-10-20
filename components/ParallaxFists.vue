<template>
  <section 
    ref="sectionRef" 
    class="relative overflow-hidden"
    :class="{ 'is-visible': isVisible }"
  >
    <!-- Background Layer (slowest) -->
    <div 
      class="absolute inset-0 bg-repeat-x bg-bottom bg-contain parallax-layer march-slow"
      :style="{ 
        backgroundImage: 'url(/img/fists-bg.png)',
        translate: `0 ${backgroundOffset}%`
      }"
    />

    <!-- Midground Layer (medium speed) -->
    <div 
      class="absolute inset-0 bg-repeat-x bg-left-bottom bg-contain parallax-layer march-medium"
      :style="{ 
        backgroundImage: 'url(/img/fists-mg.png)',
        translate: `0 ${midgroundOffset}%`
      }"
    />

    <!-- Foreground Layer (fastest) -->
    <div 
      class="absolute inset-0 bg-repeat-x bg-right-bottom bg-contain parallax-layer march-fast"
      :style="{ 
        backgroundImage: 'url(/img/fists-fg.png)',
        translate: `0 ${foregroundOffset}%`
      }"
    />
  </section>
</template>

<style scoped>
/* GPU-accelerated parallax layers */
.parallax-layer {
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Marching animation - low frame rate for aesthetic */
@keyframes march {
  0% {
    transform: translate3d(0, 0, 0);
  }
  25% {
    transform: translate3d(3px, 5px, 0);
  }
  50% {
    transform: translate3d(0, 0, 0);
  }
  75% {
    transform: translate3d(-3px, 5px, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

/* Animation layers - different speeds for depth */
.march-slow {
  animation: march 2.5s steps(4) infinite;
}

.march-medium {
  animation: march 2s steps(4) infinite;
  animation-delay: -0.3s;
}

.march-fast {
  animation: march 1.5s steps(4) infinite;
  animation-delay: -0.6s;
}

/* Only animate when visible */
.parallax-layer {
  animation-play-state: paused;
}

.is-visible .parallax-layer {
  animation-play-state: running;
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .parallax-layer {
    animation: none !important;
    transform: none !important;
  }
}
</style>

<script setup lang="ts">
import { useScroll, useElementBounding, useWindowSize, useElementVisibility, useThrottleFn } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const { y: scrollY } = useScroll(window, { behavior: 'auto' })
const { top } = useElementBounding(sectionRef)
const { height: windowHeight } = useWindowSize()
const isVisible = useElementVisibility(sectionRef)

// Throttled scroll progress to reduce calculations (60 FPS = ~16ms)
const scrollProgress = ref(0)

const updateScrollProgress = useThrottleFn(() => {
  const viewportHeight = windowHeight.value
  const sectionTop = top.value
  const start = viewportHeight - 100
  const end = viewportHeight * 0.15
  const distance = start - end
  
  const progress = (start - sectionTop) / distance
  
  // Clamp between 0 and 1
  scrollProgress.value = Math.max(0, Math.min(1, progress))
}, 16) // 60 FPS

// Watch scroll position and update progress (throttled)
watch([scrollY, top, windowHeight], () => {
  updateScrollProgress()
})

// Each layer starts at different times and all end at 0%
const backgroundOffset = computed(() => {
  const layerProgress = Math.max(0, Math.min(1, scrollProgress.value / 0.6))
  return 100 - (layerProgress * 100)
})

const midgroundOffset = computed(() => {
  const layerProgress = Math.max(0, Math.min(1, (scrollProgress.value - 0.2) / 0.6))
  return 100 - (layerProgress * 100)
})

const foregroundOffset = computed(() => {
  const layerProgress = Math.max(0, Math.min(1, (scrollProgress.value - 0.4) / 0.6))
  return 100 - (layerProgress * 100)
})
</script>
