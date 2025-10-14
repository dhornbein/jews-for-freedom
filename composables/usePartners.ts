export interface Partner {
  name: string
  href?: string
  logo?: string // path under /public e.g., /partners/rac.svg
}

export function usePartners(): readonly Partner[] {
  // Centralized partner listing; replace logo paths when assets are available
  return [
    { name: 'Religious Action Center' },
    { name: 'Bend the Arc' },
    { name: 'Collaborative for Jewish Organizing' },
    { name: 'Jews United for Justice' },
    { name: 'Jewish Social Justice Roundtable' },
  ] as const
}
