interface UseShareTextOptions {
  shortText?: string
  title?: string
}

export function useShareText(options: UseShareTextOptions = {}) {
  const defaultShortText = "Jews are standing up to authoritarianism, I signed on, won't you?"
  const defaultTitle = 'Jews for Freedom'
  
  // Hard-coded statement text for sharing
  const defaultLongText = "Together We Must Defend Our Freedoms. Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean."

  return {
    shortText: options.shortText || defaultShortText,
    title: options.title || defaultTitle,
    longText: defaultLongText
  }
}
