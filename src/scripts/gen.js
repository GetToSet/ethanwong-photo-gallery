const fs = require('fs')

const shell = require('child_process').execSync

const metadata = JSON.parse(fs.readFileSync('./assets/raw/metadata.json'))

const RAW_DIR = './assets/raw'
const PUBLIC_RAW_DIR = './public/raw'

const PHOTOS_DIR = './assets/photos'
const PHOTOS_INDEX_FILENAME = './public/photos.json'
const PUBLIC_PHOTOS_DIR = './public/photos'

const IS_LOCAL = process.env.IS_LOCAL || false

const DOMAIN = IS_LOCAL ? '' : process.env.DOMAIN || 'gallery.ethanwong.me'
const SCHEME = IS_LOCAL ? '' : process.env.SCHEME || 'https'

function getFileExtension(filename) {
  return `.${filename.split('.').pop()}`
}

function gen() {
  shell(`rm -rf ${PUBLIC_RAW_DIR}`)

  const sections = []
  const sectionList = fs.readdirSync(PHOTOS_DIR).reverse()
  sectionList.forEach((dirName) => {
    if (dirName === '.DS_Store') {
      return
    }

    const dirFullName = PHOTOS_DIR + '/' + dirName
    const sectionID = dirFullName.split('-')[0].split('/').slice(-1)
    const sectionTitle = dirFullName.split('-')[1]
    const images = []
    const photosList = fs.readdirSync(dirFullName)
    const sectionMetadata = metadata['sections'][sectionID]

    fs.mkdirSync(`${PUBLIC_RAW_DIR}/${dirName}`, { recursive: true })

    photosList.forEach(function (filename) {
      if (filename.includes('thumbnail')) {
        return
      }
      const pos = filename.lastIndexOf('.')
      const thumbnailFilename = `${filename.substr(0, pos)}.thumbnail${filename.substr(
        pos,
        filename.length,
      )}`

      const imageID = filename.split('.')[0].split('-')[0]
      let imageMetadata = {}
      if (sectionMetadata) {
        imageMetadata = sectionMetadata[imageID]
      } else {
        console.log(
          `Image: ${filename} at ${dirName} does not contain metadata, please ensure it's correct`,
        )
      }

      const isDownloadable =
        imageMetadata['badges'] &&
        imageMetadata['badges'].some((badge) =>
          [
            'cc0',
            'cc_by',
            'cc_by_sa',
            'cc_by_nc',
            'cc_by_nc_sa',
            'cc_by_nd',
            'cc_by_nc_nd',
          ].includes(badge),
        )

      if (isDownloadable) {
        ;(imageMetadata['downloadURL'] = `${
          SCHEME ? SCHEME + '://' : ''
        }${DOMAIN}/raw/${dirName}/${filename}`),
          fs.copyFileSync(
            `${RAW_DIR}/${dirName}/${filename}`,
            `${PUBLIC_RAW_DIR}/${dirName}/${filename}`,
          )
      }

      images.push({
        url: `${SCHEME ? SCHEME + '://' : ''}${DOMAIN}/photos/${dirName}/${filename}`,
        thumbnailURL: `${
          SCHEME ? SCHEME + '://' : ''
        }${DOMAIN}/photos/${dirName}/${thumbnailFilename}`,
        desc: filename.replace(getFileExtension(filename), '').split('-')[1],
        ...imageMetadata,
      })
    })

    sections.push({
      id: sectionID,
      title: sectionTitle,
      images,
    })
  })

  const photos = {
    categories: metadata['categories'],
    sections,
  }

  fs.writeFileSync(PHOTOS_INDEX_FILENAME, JSON.stringify(photos), {
    encoding: 'utf8',
  })

  shell(`rm -rf ${PUBLIC_PHOTOS_DIR}`)
  shell(`cp -R ${PHOTOS_DIR} ${PUBLIC_PHOTOS_DIR}`)
}

gen()
