import { Badge } from '@/types'

export default {
  copyright: {
    name: 'copyright',
    hint: '© Ethan Wong',
    icons: ['copyright'],
  },
  cc0: {
    name: 'cc0',
    hint: 'CC0 1.0 License',
    icons: ['cc', 'cc0'],
    link: 'https://creativecommons.org/publicdomain/zero/1.0/',
  },
  cc_by: {
    name: 'cc_by',
    hint: 'CC BY 4.0 License',
    icons: ['cc', 'cc_by'],
    link: 'https://creativecommons.org/licenses/by/4.0/',
  },
  cc_by_sa: {
    name: 'cc_by_sa',
    hint: 'CC BY-SA 4.0 License',
    icons: ['cc', 'cc_by', 'cc_sa'],
    link: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  cc_by_nc: {
    name: 'cc_by_nc',
    hint: 'CC BY-NC 4.0 License',
    icons: ['cc', 'cc_by', 'cc_nc'],
    link: 'https://creativecommons.org/licenses/by-nc/4.0/',
  },
  cc_by_nc_sa: {
    name: 'cc_by_nc_sa',
    hint: 'CC BY-NC-SA 4.0 License',
    icons: ['cc', 'cc_by', 'cc_nc', 'cc_sa'],
    link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
  },
  cc_by_nd: {
    name: 'cc_by_nd',
    hint: 'CC BY-ND 4.0 License',
    icons: ['cc', 'cc_by', 'cc_nd'],
    link: 'https://creativecommons.org/licenses/by-nd/4.0/',
  },
  cc_by_nc_nd: {
    name: 'cc_by_nc_nd',
    hint: 'CC BY-NC-ND 4.0 License',
    icons: ['cc', 'cc_by', 'cc_nc', 'cc_nd'],
    link: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  },
  edited: {
    name: 'edited',
    hint: 'This photo has been edited',
    icons: ['exposure'],
  },
  location: {
    name: 'location',
    hint: '',
    icons: ['location'],
    template: true,
  },
  unsplash: {
    name: 'unsplash',
    hint: 'View on Unsplash',
    icons: ['unsplash-circle'],
    template: true,
  },
  download: {
    name: 'download',
    hint: 'Download Photo',
    icons: ['download'],
    template: true,
  },
} as Record<string, Badge>
