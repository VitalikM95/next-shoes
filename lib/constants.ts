export const TITLES: Record<string, { label: string; value?: string }[]> = {
  man: [
    { label: 'Trainers', value: 'Trainers' },
    { label: 'Active Shoes', value: 'Active Shoes' },
    { label: 'Water-Repellent Shoes', value: 'Water-Repellent Shoes' },
    { label: "Men's Sale" },
  ],
  woman: [
    { label: 'Trainers', value: 'Trainers' },
    { label: 'Active Shoes', value: 'Active Shoes' },
    { label: 'Water-Repellent Shoes', value: 'Water-Repellent Shoes' },
    { label: 'Flats', value: 'Flats' },
    { label: "Women's Sale" },
  ],
}

export const BEST_FOR: string[] = [
  'Everyday',
  'Warm Weather',
  'Running',
  'Cool Weather',
  'Wet Weather',
]
export const MATERIAL: string[] = [
  'Tree Fibre Blend',
  'Wool',
  'Corduroy',
  'Cotton Blend',
  'Fluff Collection',
  'Canvas',
]

export const SIZE_RANGES: Record<string, number[]> = {
  man: [39, 40, 41, 42, 43, 44, 45, 46, 47],
  woman: [36, 37, 38, 39, 40, 41, 42, 43, 44],
}

type ColorOption = { text: string; color: string }

export const HUE: Record<'man' | 'woman', ColorOption[]> = {
  man: [
    { text: 'White', color: '#fff' },
    { text: 'Black', color: '#000' },
    { text: 'Beige', color: '#B9AFA1' },
    { text: 'Grey', color: '#8C8C8C' },
    { text: 'Green', color: '#69715E' },
    { text: 'Blue', color: '#49607C' },
    { text: 'Brown', color: '#BD9474' },
    { text: 'Red', color: '#B14754' },
  ],
  woman: [
    { text: 'White', color: '#fff' },
    { text: 'Black', color: '#000' },
    { text: 'Beige', color: '#B9AFA1' },
    { text: 'Grey', color: '#8C8C8C' },
    { text: 'Green', color: '#69715E' },
    { text: 'Blue', color: '#49607C' },
    { text: 'Brown', color: '#BD9474' },
    { text: 'Red', color: '#B14754' },
    { text: 'Pink', color: '#DFABB5' },
    { text: 'Orange', color: '#E48150' },
    { text: 'Purple', color: '#BBB9D5' },
  ],
}

export const HOME_IMAGES = [
  {
    img: '/images/big-img1.avif',
    title: 'Trail Runner',
    subtitle: 'Tough, Grippy, Ready To Explore',
    link_man: '/product/cm9n1mpb8001z4n74tik5gzb3',
    link_woman: '/product/cm9n1msm900734n74uw76teg0',
  },
  {
    img: '/images/big-img2.avif',
    title: 'Wool Piper Go',
    subtitle: 'Reimagined Classic, Elevated Comfort',
    link_man: '/product/cm9n1mq19002s4n74twtltj3c',
    link_woman: '/product/cm9n1mqwr003q4n7470taajon',
  },
]

export const SHOE_ITEMS = [
  {
    image: '/images/sample-shoes1.avif',
    title: 'Tree Runner Go',
    description: 'Light, Breezy, Ready For Anything',
    link_man: '/product/cmamj7l5y00024ni04t6xndvf',
    link_woman: '/product/cmamj7ofm00484ni0ns69iin2',
  },
  {
    image: '/images/sample-shoes2.avif',
    title: 'Tree Dasher 2',
    description: 'Bouncy, Everyday Active Sneaker',
    link_man: '/product/cmamj7li5000s4ni082eehcqx',
    link_woman: '/product/cmamj7opf00504ni0urvibt6u',
  },
  {
    image: '/images/sample-shoes3.avif',
    title: 'Tree Toppers',
    description: 'Water-Repellent, High Top Style',
    link_man: '/product/cmamj7n0t002s4ni0oyhmtyi3',
    link_woman: '/product/cmamj7rij00944ni0l03q9obd',
  },
]

export const BIG_CAROUSEL_CONTENT = [
  {
    img: '/images/slider-img2.avif',
    title: "Men's Trainer Family",
    link: '/collections/man?type=Trainers',
  },
  {
    img: '/images/slider-img1.avif',
    title: "Women's Trainer Family",
    link: '/collections/woman?type=Trainers',
  },
  {
    img: '/images/slider-img3.avif',
    title: "Men's Weather-Ready Collection",
    link: '/collections/man?type=Water-Repellent+Shoes',
  },
  {
    img: '/images/slider-img4.avif',
    title: "Women's Weather-Ready Collection",
    link: '/collections/woman?type=Water-Repellent+Shoes',
  },
  {
    img: '/images/slider-img5.avif',
    title: "Men's Active Shoes",
    link: '/collections/man?type=Active+Shoes',
  },
  {
    img: '/images/slider-img6.avif',
    title: "Women's Active Shoes",
    link: '/collections/woman?type=Active+Shoes',
  },
]
