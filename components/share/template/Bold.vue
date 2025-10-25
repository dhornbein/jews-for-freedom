<template>
  <div class="relative z-10 h-full flex flex-col p-12">
    <!-- Logo -->
    <div class="mb-auto">
      <NuxtImg
        src="/logo-long.png"
        alt="Jews for Freedom"
        class="h-12 w-auto"
      />
    </div>

    <!-- Body Text -->
    <p
      v-if="settings.content.body"
      contenteditable="true"
      @blur="handleBodyEdit"
      class="text-4xl leading-relaxed my-4 outline-none p-4 font-bold border-l-4 border-solid"
      :style="{
        color: settings.colors.bodyText,
        fontFamily: 'museo-slab, Georgia, serif',
        backgroundColor: settings.colors.background,
        borderColor: settings.colors.accent
      }"
      v-text="settings.content.body"
    ></p>

    <!-- Headline -->
    <h1
      contenteditable="true"
      @blur="handleHeadlineEdit"
      class="text-6xl font-bold leading-tight mb-8 outline-none border-b-4"
      :style="{
        color: settings.colors.headlineText,
        fontFamily: 'roc-grotesk-compressed, Impact, sans-serif',
        borderColor: settings.colors.accent,
        textShadow: `2px 2px 0 rgb(0 0 0 / 0.75)`
      }"
      v-text="settings.content.headline"
    ></h1>

    <!-- Bottom Section -->
    <div class="flex items-center justify-between gap-8">
      <!-- CTA Button -->
      <div
        contenteditable="true"
        @blur="handleCtaEdit"
        class="px-8 py-4 font-bold text-2xl rounded-lg outline-none"
        :style="{
          backgroundColor: settings.colors.ctaBackground,
          color: settings.colors.ctaText,
          fontFamily: 'roc-grotesk-wide, Impact, sans-serif'
        }"
        v-text="settings.content.callToAction"
      ></div>

      <!-- URL & QR -->
      <div class="flex flex-col items-end">
        <img
          v-if="settings.content.showQrCode && qrCodeDataUrl"
          :src="qrCodeDataUrl"
          alt="QR Code"
          class="w-24 h-24 border-4 rounded"
          :style="{ borderColor: settings.colors.background }"
        />
        <div
          class="text-xl font-medium px-2 py-1 rounded"
          :style="{ 
            color: settings.colors.headlineText,
            backgroundColor: settings.colors.background
          }"
        >
          {{ settings.content.url }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ShareImageSettings } from '~/composables/useShareImage'

interface TemplateBoldProps {
  settings: ShareImageSettings
  qrCodeDataUrl?: string
}

defineProps<TemplateBoldProps>()

const emit = defineEmits<{
  'update:headline': [value: string]
  'update:body': [value: string]
  'update:cta': [value: string]
}>()

function handleHeadlineEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:headline', target.textContent || '')
}

function handleBodyEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:body', target.textContent || '')
}

function handleCtaEdit(event: Event) {
  const target = event.target as HTMLElement
  emit('update:cta', target.textContent || '')
}
</script>
