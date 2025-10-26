<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Controls (Left Column) -->
    <div class="lg:col-span-1">
      <div class="space-y-6 bg-white p-6 rounded-lg shadow-lg sticky top-4">
        <h2 class="text-2xl font-bold text-brand-text">Customize Your Image</h2>

        <!-- Template Selector -->
        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            Template
          </label>
          <div class="flex gap-2">
            <button
              v-for="option in editor.templateOptions"
              :key="option.value"
              @click="editor.updateTemplate(option.value)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                editor.settings.template === option.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-background text-brand-text hover:bg-brand-background/80'
              ]"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Size Selector -->
        <div>
          <label class="block text-sm font-medium text-brand-text mb-2">
            Size
          </label>
          <div class="flex gap-2">
            <button
              v-for="option in editor.sizeOptions"
              :key="option.value"
              @click="editor.updateSize(option.value)"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm',
                editor.settings.size.preset === option.value
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-background text-brand-text hover:bg-brand-background/80'
              ]"
            >
              {{ option.label }}<br>
              <span class="text-xs opacity-75">{{ option.width }}×{{ option.height }}</span>
            </button>
          </div>
        </div>

        <!-- Content Fields -->
        <div>
          <div class="flex justify-between">
            <label class="block text-sm font-medium text-brand-text mb-2">
              Headline
            </label>
            <button
              class="text-sm text-brand-primary hover:text-brand-primary-dark"
              @click="editor.settings.content.headline = ''"
            >
              Clear
            </button>
          </div>
          <input
            type="text"
            v-model="editor.settings.content.headline"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <div>
          <div class="flex justify-between">
            <label class="block text-sm font-medium text-brand-text mb-2">
              Body Text
            </label>
            <button
              class="text-sm text-brand-primary hover:text-brand-primary-dark"
              @click="editor.settings.content.body = ''"
            >
              Clear
            </button>
          </div>
          <textarea
            v-model="editor.settings.content.body"
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
          ></textarea>
        </div>

        <div>
          <div class="flex justify-between">
            <label class="block text-sm font-medium text-brand-text mb-2">
              Call to Action
            </label>
            <button
              class="text-sm text-brand-primary hover:text-brand-primary-dark"
              @click="editor.settings.content.callToAction = ''"
            >
              Clear
            </button>
          </div>
          <input
            type="text"
            v-model="editor.settings.content.callToAction"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          />
        </div>

        <!-- QR Code Toggle -->
        <div class="flex items-center gap-3">
          <input
            type="checkbox"
            id="show-qr"
            v-model="editor.settings.content.showQrCode"
            class="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
          />
          <label for="show-qr" class="text-sm font-medium text-brand-text">
            Show QR Code
          </label>
        </div>

        <!-- Color Scheme Selector -->
        <div>
          <h3 class="text-lg font-semibold text-brand-text mb-3">Color Scheme</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="scheme in editor.colorSchemes"
              :key="scheme.name"
              @click="editor.updateColorScheme(scheme)"
              :class="[
                'w-16 h-16 rounded-lg border-4 transition-all flex items-center justify-center',
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

        <!-- Background Image Selector -->
        <div>
          <h3 class="text-lg font-semibold text-brand-text mb-3">Background Image</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="preset in editor.backgroundImagePresets"
              :key="preset.name"
              @click="editor.updateBackgroundImage(preset)"
              :class="[
                'w-16 h-16 rounded-lg border-4 transition-all flex items-center justify-center overflow-hidden',
                editor.settings.colors.backgroundImage?.url === preset.settings.url
                  ? 'border-brand-text scale-110 shadow-lg'
                  : 'border-gray-300 hover:scale-105'
              ]"
              :title="preset.name"
            >
              <span v-if="!preset.thumbnail" class="text-2xl text-gray-400">∅</span>
              <img
                v-else
                :src="preset.thumbnail"
                :alt="preset.name"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Blend Mode -->
        <div v-if="editor.settings.colors.backgroundImage">
          <label class="block text-sm font-medium text-brand-text mb-2">
            Background Blend Mode
          </label>
          <select
            v-model="editor.settings.colors.blendMode"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent"
          >
            <option
              v-for="mode in editor.blendModeOptions"
              :key="mode.value"
              :value="mode.value"
            >
              {{ mode.label }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4 border-t border-gray-200">
          <button
            @click="handleDownload"
            :disabled="isExporting"
            class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="fa7-regular:file-image" class="text-xl" />
            <span>{{ isExporting ? 'Generating...' : 'Download JPG' }}</span>
          </button>
          
          <button
            @click="editor.resetToDefaults()"
            class="px-6 py-3 bg-brand-background text-brand-text font-medium rounded-lg hover:bg-brand-background/80 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Canvas Preview (Right Column) -->
    <div class="lg:col-span-2">
      <div class="bg-white p-8 rounded-lg shadow-lg sticky top-14">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-brand-text">Preview</h2>
          <div class="flex gap-1">
            <button
                v-for="scheme in editor.colorSchemes"
                :key="scheme.name"
                @click="editor.updateColorScheme(scheme)"
                :class="[
                  'w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center',
                  editor.settings.colors.background === scheme.background
                    ? 'border-brand-text scale-110 shadow-lg'
                    : 'border-gray-300 hover:scale-105'
                ]"
                :style="{ backgroundColor: scheme.color }"
                :title="scheme.name"
              ></button>
          </div>
          <div class="text-sm text-brand-text/60">
            {{ editor.settings.size.width }} × {{ editor.settings.size.height }}px
          </div>
        </div>
        
        <div 
          ref="canvasContainer"
          class="flex justify-center bg-gray-100 p-4 rounded-lg"
          style="max-height: 90vh;"
        >
          <div 
            class="mx-auto"
            :style="{
              transform: `scale(${scale})`,
              transformOrigin: 'center top'
            }"
          >
            <!-- Canvas Component -->
            <div
              ref="canvasElement"
              class="relative overflow-hidden"
              :class="`size-${editor.settings.size.preset}`"
              :style="{
                width: `${editor.settings.size.width}px`,
                height: `${editor.settings.size.height}px`,
                backgroundColor: editor.settings.colors.background
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import QRCode from 'qrcode'

// Create a new editor instance
const editor = useShareImage()
const { exportAsJpeg, isExporting } = useImageExport()
const config = useRuntimeConfig()

const canvasContainer = ref<HTMLElement>()
const canvasElement = ref<HTMLElement>()
const qrCodeDataUrl = ref<string>()
const scale = ref(1)

// Generate static QR code for site URL on mount
onMounted(async () => {
  if (editor.settings.content.showQrCode) {
    await generateQRCode()
  }
  
  calculateScale()
  window.addEventListener('resize', calculateScale)
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

// Generate QR code with CTA colors
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
  } catch (error) {
    console.error('QR code generation failed:', error)
  }
}

// Calculate scale to fit canvas within container
function calculateScale() {
  if (!canvasContainer.value) return
  
  const containerWidth = canvasContainer.value.clientWidth - 32
  const containerHeight = canvasContainer.value.clientHeight - 32
  const canvasWidth = editor.settings.size.width
  const canvasHeight = editor.settings.size.height
  
  const scaleX = containerWidth / canvasWidth
  const scaleY = containerHeight / canvasHeight
  
  scale.value = Math.min(scaleX, scaleY, 1)
}

// Auto-scale canvas to fit container
onMounted(() => {
  calculateScale()
  window.addEventListener('resize', calculateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateScale)
})

// Watch for size changes
watch(
  () => editor.settings.size,
  () => {
    calculateScale()
  },
  { deep: true }
)

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
  if (!canvasElement.value) {
    console.error('Canvas reference not available')
    return
  }
  
  await exportAsJpeg(canvasElement.value)
}
</script>
