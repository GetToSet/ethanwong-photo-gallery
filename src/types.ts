export interface Image {
  url: string
  thumbnailURL: string
  desc?: string
  badges?: string[]
  location?: string
  unsplashID?: string
  downloadURL?: string
}

export interface Category {
  title: string
  sections: string[]
}
export interface Section {
  id: string
  title: string
  images: Image[]
}

export interface Badge {
  name: string
  hint: string
  icons: string[]
  link?: string
  template?: boolean
  download?: boolean
}
