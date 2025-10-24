<template>
  <div class="min-h-screen bg-brand-background py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-brand-text mb-2">
          Create Your Share Image
        </h1>
        <p class="text-brand-text/70">
          Customize and download graphics to share on social media
        </p>
      </div>

      <!-- Editor Component -->
      <ShareImageEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Create Share Image - Jews for Freedom',
  description: 'Create and download customizable graphics to share on social media',
  robots: 'noindex, nofollow'
})
</script>
