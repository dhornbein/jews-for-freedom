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
      logo: '/partner-bend-the-arc.png',
      href: 'https://www.bendthearc.us/'
    },
    { 
      name: 'Collaborative for Jewish Organizing',
      logo: '/partner-collaborative.png',
      href: 'https://www.collaborativeforjewishorganizing.org/'
    },
    { 
      name: 'Jews United for Justice',
      logo: '/partner-jews-united.png',
      href: 'https://jufj.org/'
    },
    { 
      name: 'Jewish Social Justice Roundtable',
      logo: '/partner-roundtable.png',
      href: 'https://www.jewishsocialjustice.org/'
    },
    { 
      name: 'Religious Action Center',
      logo: '/partner-rac.png',
      href: 'https://rac.org/'
    },
  ] as const
}
