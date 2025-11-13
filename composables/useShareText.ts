interface UseShareTextOptions {
  shortText?: string
  title?: string
  longText?: string
  cta?: string
}

export function useShareText(options: UseShareTextOptions = {}) {
  const defaultTitle = 'Take Action with Jews for Freedom'
  const defaultShortText = "Join other concerned Jews ready and eager to take on authoritarianism by signing up today."
  const defaultLongText = "Jews know in our bones what happens when people with power try to dismantle democratic rights and protections. Now is the time for us to join other communities in standing up for democracy and freedom."
  const defaultCTA = 'Sign the Statement'

  return {
    shortText: options.shortText || defaultShortText,
    title: options.title || defaultTitle,
    longText: options.longText || defaultLongText,
    cta: options.cta || defaultCTA
  }
}
