<template>
  <div class="flex gap-4 items-center">
    <a
      v-if="socialLinks.twitter"
      :href="socialLinks.twitter"
      target="_blank"
      rel="noopener noreferrer"
      class="text-brand-text/70 hover:text-brand-primary transition-colors rounded"
      aria-label="Follow us on Twitter"
    >
      <Icon name="fa7-brands:twitter" class="w-5 h-5" />
    </a>
    <a
      v-if="socialLinks.instagram"
      :href="socialLinks.instagram"
      target="_blank"
      rel="noopener noreferrer"
      class="text-brand-text/70 hover:text-brand-primary transition-colors rounded"
      aria-label="Follow us on Instagram"
    >
      <Icon name="fa7-brands:instagram" class="w-5 h-5" />
    </a>
    <a
      v-if="socialLinks.bluesky"
      :href="socialLinks.bluesky"
      target="_blank"
      rel="noopener noreferrer"
      class="text-brand-text/70 hover:text-brand-primary transition-colors rounded"
      aria-label="Follow us on Bluesky"
    >
      <Icon name="fa7-brands:bluesky" class="w-5 h-5" />
    </a>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const socialLinks = config.public.socialLinks
</script>
