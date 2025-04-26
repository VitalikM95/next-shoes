export const TITLES: Record<string, { label: string; value?: string }[]> = {
  man: [
    { label: 'Trainers', value: 'Trainers' },
    { label: 'Active Shoes', value: 'Active Shoes' },
    { label: 'Water-Repellent Shoes', value: 'Water-Repellent Shoes' },
    { label: "Men's Sale" }, // буде фільтр по discount
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
