<template>
  <section 
    ref="sectionRef" 
    class="relative overflow-hidden"
    :class="{ 'is-visible': isVisible }"
  >
    <!-- Background Layer (slowest) -->
    <div 
      class="absolute inset-0 bg-no-repeat bg-bottom lg:bg-repeat-x bg-contain march-slow"
      :style="{ 
        backgroundImage: 'url(/img/fists-bg.png)',
      }"
    />

    <!-- Foreground Layer (fastest) -->
    <div 
      class="absolute inset-0 bg-no-repeat bg-bottom lg:bg-repeat-x lg:bg-right-bottom bg-contain march-fast"
      :style="{ 
        backgroundImage: 'url(/img/fists-fg.png)',
      }"
    />
  </section>
</template>

<style scoped>
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
.march-slow,
.march-fast {
  animation-play-state: paused;
}

.march-slow {
  animation: march 5s steps(6) infinite;
}

.march-fast {
  animation: march 2.5s steps(6) infinite;
  animation-delay: -0.6s;
}

/* Only animate when visible */
.is-visible .march-slow,
.is-visible .march-fast {
  animation-play-state: running;
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .parallax-layer {
    animation: none !important;
    translate: none !important;
  }
}
</style>

<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef)
</script>
