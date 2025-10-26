<template>
  <div class="relative z-10 h-full flex flex-col items-center justify-center p-16 text-center">
    <!-- Logo -->
    <div class="mb-8">
      <NuxtImg
        src="/logo-long.png"
        alt="Jews for Freedom"
        class="h-10 w-auto mx-auto"
      />
    </div>

    <!-- Headline -->
    <h1
      contenteditable="true"
      @blur="handleHeadlineEdit"
      class="font-bold leading-tight mb-12 outline-none max-w-3xl"
      :style="{
        fontSize: `${settings.content.headlineSize}px`,
        color: settings.colors.headlineText,
        fontFamily: 'roc-grotesk-compressed, Impact, sans-serif'
      }"
      v-text="settings.content.headline"
    ></h1>

    <!-- CTA Button -->
    <button
      contenteditable="true"
      @blur="handleCtaEdit"
      class="px-10 py-5 font-bold rounded-lg outline-none mb-8"
      :style="{
        fontSize: `${settings.content.callToActionSize}px`,
        backgroundColor: settings.colors.ctaBackground,
        color: settings.colors.ctaText,
        fontFamily: 'museo-slab, Georgia, serif'
      }"
      v-text="settings.content.callToAction"
    ></button>

    <!-- URL and QR Code -->
    <div class="flex flex-col items-center gap-3">
      <div
        v-if="settings.content.showQrCode && qrCodeDataUrl"
        class="bg-white p-2 rounded"
      >
        <img :src="qrCodeDataUrl" alt="QR Code" class="w-20 h-20" />
      </div>
      <div
        class="text-lg font-medium"
        :style="{ color: settings.colors.headlineText }"
      >
        {{ settings.content.url }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShareImageSettings } from '~/composables/useShareImage'

interface TemplateMinimalProps {
  settings: ShareImageSettings
  qrCodeDataUrl?: string
}

defineProps<TemplateMinimalProps>()

const emit = defineEmits<{
  'update:headline': [value: string]
  'update:cta': [value: string]
}>()

function handleHeadlineEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:headline', target.textContent || '')
}

function handleCtaEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:cta', target.textContent || '')
}
</script>
