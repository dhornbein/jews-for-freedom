<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <!-- Compact Top Bar -->
    <div class="bg-white border-b border-gray-300 shadow-sm">
      <div class="flex items-center gap-2 px-4 py-2">
        <!-- Size Selector -->
        <button
          v-for="option in editor.sizeOptions"
          :key="option.value"
          @click="handleSizeClick(option.value)"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded transition-colors',
            editor.settings.size.preset === option.value
              ? 'bg-brand-primary text-white'
              : 'bg-gray-100 text-brand-text hover:bg-gray-200'
          ]"
        >
          {{ option.label }}
        </button>

        <div class="w-px h-6 bg-gray-300 mx-2"></div>

        <!-- Color Scheme Toggle -->
        <button
          @click="toggleDropdown('colors')"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded transition-colors flex items-center gap-2',
            activeDropdown === 'colors'
              ? 'bg-brand-primary text-white'
              : 'bg-gray-100 text-brand-text hover:bg-gray-200'
          ]"
        >
          <div 
            class="w-4 h-4 rounded border border-white"
            :style="{ backgroundColor: editor.settings.colors.background }"
          ></div>
          Colors
        </button>

        <!-- Background Image Toggle -->
        <button
          @click="toggleDropdown('background')"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded transition-colors',
            activeDropdown === 'background'
              ? 'bg-brand-primary text-white'
              : 'bg-gray-100 text-brand-text hover:bg-gray-200'
          ]"
        >
          Background
        </button>

        <!-- Blend Mode (only show if background image exists) -->
        <button
          v-if="editor.settings.colors.backgroundImage"
          @click="toggleDropdown('blend')"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded transition-colors',
            activeDropdown === 'blend'
              ? 'bg-brand-primary text-white'
              : 'bg-gray-100 text-brand-text hover:bg-gray-200'
          ]"
        >
          Blend: {{ editor.settings.colors.blendMode }}
        </button>

        <div class="w-px h-6 bg-gray-300 mx-2"></div>

        <!-- QR Code Toggle -->
        <label class="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
          <input
            type="checkbox"
            v-model="editor.settings.content.showQrCode"
            class="w-3.5 h-3.5 text-brand-primary rounded focus:ring-brand-primary"
          />
          QR Code
        </label>

        <!-- Template Selector -->
        <div class="ml-auto flex gap-2">
          <button
            v-for="option in editor.templateOptions"
            :key="option.value"
            @click="editor.updateTemplate(option.value)"
            :class="[
              'px-3 py-1.5 text-xs font-medium rounded transition-colors',
              editor.settings.template === option.value
                ? 'bg-brand-primary text-white'
                : 'bg-gray-100 text-brand-text hover:bg-gray-200'
            ]"
          >
            {{ option.label }}
          </button>
        </div>

        <!-- Download Button -->
        <button
          @click="handleDownload"
          :disabled="isExporting"
          class="ml-2 px-4 py-1.5 text-xs font-bold bg-brand-primary text-white rounded hover:bg-brand-primary/90 disabled:opacity-50"
        >
          {{ isExporting ? 'Exporting...' : 'Download' }}
        </button>
      </div>

      <!-- Dropdown Panels -->
      <div v-if="activeDropdown" class="border-t border-gray-200 bg-gray-50">
        <!-- Color Schemes Dropdown -->
        <div v-if="activeDropdown === 'colors'" class="px-4 py-3">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="scheme in editor.colorSchemes"
              :key="scheme.name"
              @click="handleColorSchemeClick(scheme)"
              :class="[
                'w-12 h-12 rounded border-2 transition-all flex items-center justify-center',
                editor.settings.colors.background === scheme.background
                  ? 'border-brand-text scale-110 shadow-lg'
                  : 'border-gray-300 hover:scale-105'
              ]"
              :style="{ backgroundColor: scheme.color }"
              :title="scheme.name"
            >
              <span class="sr-only">{{ scheme.name }}</span>
            </button>
          </div>
        </div>

        <!-- Background Images Dropdown -->
        <div v-if="activeDropdown === 'background'" class="px-4 py-3">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="preset in editor.backgroundImagePresets"
              :key="preset.name"
              @click="handleBackgroundImageClick(preset)"
              :class="[
                'w-12 h-12 rounded border-2 transition-all flex items-center justify-center overflow-hidden',
                editor.settings.colors.backgroundImage?.url === preset.settings.url
                  ? 'border-brand-text scale-110 shadow-lg'
                  : 'border-gray-300 hover:scale-105'
              ]"
              :title="preset.name"
            >
              <span v-if="!preset.thumbnail" class="text-xl text-gray-400">∅</span>
              <img
                v-else
                :src="preset.thumbnail"
                :alt="preset.name"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Blend Mode Dropdown -->
        <div v-if="activeDropdown === 'blend'" class="px-4 py-3">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="mode in editor.blendModeOptions"
              :key="mode.value"
              @click="handleBlendModeClick(mode.value)"
              :class="[
                'px-3 py-1.5 text-xs font-medium rounded transition-colors',
                editor.settings.colors.blendMode === mode.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-gray-100 text-brand-text hover:bg-gray-200'
              ]"
            >
              {{ mode.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Canvas Preview Area -->
    <div 
      ref="canvasContainer"
      class="flex-1 flex items-center justify-center overflow-hidden m-4"
    >
      <!-- Canvas Component -->
      <div
        ref="canvasElement"
        :class="['relative overflow-hidden', `size-${editor.settings.size.preset}`]"
        :style="{
          width: `${editor.settings.size.width}px`,
          height: `${editor.settings.size.height}px`,
          backgroundColor: editor.settings.colors.background,
          transform: `scale(${scale})`,
          transformOrigin: 'center'
        }"
      >
          <!-- Background Image with Blend Mode -->
          <div
            v-if="editor.settings.colors.backgroundImage"
            class="absolute inset-0"
            :style="{
              backgroundImage: `url('${editor.settings.colors.backgroundImage.url}')`,
              backgroundPosition: editor.settings.colors.backgroundImage.position,
              backgroundRepeat: editor.settings.colors.backgroundImage.repeat,
              backgroundSize: editor.settings.colors.backgroundImage.size,
              mixBlendMode: editor.settings.colors.blendMode as any
            }"
          ></div>

          <!-- Templates -->
          <ShareTemplateBold
            v-if="editor.settings.template === 'bold'"
            :settings="editor.settings"
            :qr-code-data-url="qrCodeDataUrl"
            @update:headline="handleHeadlineEdit"
            @update:body="handleBodyEdit"
            @update:cta="handleCtaEdit"
          />

          <ShareTemplateMinimal
            v-else-if="editor.settings.template === 'minimal'"
            :settings="editor.settings"
            :qr-code-data-url="qrCodeDataUrl"
            @update:headline="handleHeadlineEdit"
            @update:cta="handleCtaEdit"
          />
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'
import type { ColorScheme, BackgroundImagePreset } from '~/composables/useShareImage'

const editor = useShareImage()
const { exportAsJpeg, isExporting } = useImageExport()
const config = useRuntimeConfig()

const canvasElement = ref<HTMLElement>()
const canvasContainer = ref<HTMLElement>()
const qrCodeDataUrl = ref<string>()
const scale = ref(1)
const activeDropdown = ref<'colors' | 'background' | 'blend' | null>(null)

// Generate QR code on mount
onMounted(async () => {
  if (editor.settings.content.showQrCode) {
    await generateQRCode()
  }
  calculateScale()
  window.addEventListener('resize', calculateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateScale)
})

// Watch for QR code toggle and color changes
watch(
  () => [editor.settings.content.showQrCode, editor.settings.colors.ctaBackground, editor.settings.colors.ctaText],
  async ([show]) => {
    if (show) {
      await generateQRCode()
    } else {
      qrCodeDataUrl.value = undefined
    }
  }
)

// Watch for size changes
watch(
  () => editor.settings.size,
  () => {
    nextTick(() => calculateScale())
  },
  { deep: true }
)

// Watch for dropdown changes to recalculate scale
watch(
  () => activeDropdown.value,
  () => {
    nextTick(() => calculateScale())
  }
)

async function generateQRCode() {
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(config.public.siteUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: editor.settings.colors.ctaText,
        light: editor.settings.colors.ctaBackground
      }
    })
  } catch {
    // Swallow QR generation errors
  }
}

function calculateScale() {
  if (!canvasContainer.value) return
  
  const containerWidth = canvasContainer.value.clientWidth
  const containerHeight = canvasContainer.value.clientHeight
  const canvasWidth = editor.settings.size.width
  const canvasHeight = editor.settings.size.height
  
  const scaleX = containerWidth / canvasWidth
  const scaleY = containerHeight / canvasHeight
  
  scale.value = Math.min(scaleX, scaleY, 1)
}

function toggleDropdown(dropdown: 'colors' | 'background' | 'blend') {
  activeDropdown.value = activeDropdown.value === dropdown ? null : dropdown
}

function handleSizeClick(preset: 'square' | 'landscape' | 'portrait') {
  editor.updateSize(preset)
}

function handleColorSchemeClick(scheme: ColorScheme) {
  editor.updateColorScheme(scheme)
}

function handleBackgroundImageClick(preset: BackgroundImagePreset) {
  editor.updateBackgroundImage(preset)
}

function handleBlendModeClick(mode: string) {
  editor.settings.colors.blendMode = mode
}

function handleHeadlineEdit(value: string) {
  editor.settings.content.headline = value
}

function handleBodyEdit(value: string) {
  editor.settings.content.body = value
}

function handleCtaEdit(value: string) {
  editor.settings.content.callToAction = value
}

async function handleDownload() {
  if (!canvasElement.value) return
  await exportAsJpeg(canvasElement.value)
}
</script>
