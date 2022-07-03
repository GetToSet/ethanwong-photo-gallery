export interface Image {
  url: string
  desc: string
  thumbnailURL: string
}

export interface Section {
  title: string
  images: Image[]
}
