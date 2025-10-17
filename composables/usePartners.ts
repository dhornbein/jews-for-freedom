export interface Partner {
  name: string
  href?: string
  logo?: string // path under /public e.g., /partners/rac.svg
  imgClass?: string // optional CSS classes for the img element
}

export function usePartners(): readonly Partner[] {
  // Centralized partner listing; replace logo paths when assets are available
  return [
    { 
      name: 'Bend the Arc',
      logo: '/partner-logo-bend-the-arc.svg',
      href: 'https://www.bendthearc.us/'
    },
    { 
      name: 'Collaborative for Jewish Organizing',
      logo: '/partner-logo-collaborative-for-jewish-organizing.png',
      href: 'https://www.collaborativeforjewishorganizing.org/'
    },
    { 
      name: 'Jews United for Justice',
      logo: '/partner-logo-jews-united-for-justice.png',
      href: 'https://jufj.org/'
    },
    { 
      name: 'Jewish Social Justice Roundtable',
      logo: '/partner-logo-jewish-social-justice-roundtable.png',
      href: 'https://www.jewishsocialjustice.org/',
      imgClass: 'p-2 bg-white rounded-md max-w-40'
    },
    { 
      name: 'Religious Action Center',
      logo: '/partner-logo-rac.svg',
      href: 'https://rac.org/',
      imgClass: 'max-w-40'
    },
  ] as const
}
