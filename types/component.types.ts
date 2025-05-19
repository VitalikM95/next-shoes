export interface CarouselItemProps {
  image: string
  title: string
  subtitle: string
  link: string
}

export interface NavigationItem {
  title: string
  href: string
  isActive?: boolean
  subItems?: NavigationItem[]
}
