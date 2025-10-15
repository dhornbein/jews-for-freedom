export interface NavLink {
  label: string
  href: string
}

export interface NavigationConfig {
  main: NavLink[]
  legal: NavLink[]
  cta: NavLink
}

export function useNavLinks(): NavigationConfig {
  // Single source of truth for navigation links
  return {
    main: [
      { label: 'Sign', href: '#petition' },
      { label: 'About', href: '#about' },
      { label: 'Partners', href: '#partners' },
      { label: 'Share', href: '#share' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' }
    ],
    cta: { label: 'Sign the Statement', href: '#petition' }
  }
}
