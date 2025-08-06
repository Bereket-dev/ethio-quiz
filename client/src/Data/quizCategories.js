import economics from '../assets/icons/economics.svg'
import calculation from '../assets/icons/calculation.svg'
import chemistry from '../assets/icons/chemistry.svg'
import physics from '../assets/icons/physics.svg'
import psychology from '../assets/icons/psychology.svg'
import logic from '../assets/icons/logic.svg'

import knowledge from '../assets/icons/knowledge.svg'
import football from '../assets/icons//football.svg'
import computer from '../assets/icons/computer.svg'
import art from '../assets/icons/art.svg'
import entertainment from '../assets/icons/entertainment.svg'

export const freshmanCategories = [
  {
    id: 1,
    image: {
      src: economics,
      alt: 'economics',
    },
    title: 'economics',
    color: { lighter: '#E1D2E5', bolder: '#6D6C6C' },
  },
  {
    id: 2,
    image: {
      src: calculation,
      alt: 'calculation',
    },
    title: 'ns maths',
    color: { lighter: '#CEDDF2', bolder: '#2AABEE' },
  },

  {
    id: 3,
    image: {
      src: logic,
      alt: 'logic',
    },
    title: 'logic',
    color: { lighter: '#FFD2D2', bolder: '#E36464' },
  },
  {
    id: 4,
    image: {
      src: psychology,
      alt: 'psychology',
    },
    title: 'psychology',
    color: { lighter: '#BEEBD6', bolder: '#1BD17C' },
  },
  {
    id: 5,
    image: {
      src: physics,
      alt: 'physics',
    },
    title: 'G. physics',
    color: { lighter: '#E6E2B2', bolder: '#B1A74D' },
  },
  {
    id: 6,
    image: {
      src: chemistry,
      alt: 'chemistry',
    },
    title: 'G. chemistry',
    color: { lighter: '#E1D2E5', bolder: '#B6A935' },
  },
]

export const triviaCategories = [
  {
    id: 1,
    image: {
      src: entertainment,
      alt: 'entertainment',
    },
    title: 'entertainment',
    color: { lighter: '#E1D2E5', bolder: '#6D6C6C' },
  },
  {
    id: 2,
    image: {
      src: knowledge,
      alt: 'G. knowledge',
    },
    title: 'G. knowledge',
    color: { lighter: '#CEDDF2', bolder: '#2AABEE' },
  },

  {
    id: 3,
    image: {
      src: football,
      alt: 'football',
    },
    title: 'sport',
    color: { lighter: '#FFD2D2', bolder: '#E36464' },
  },
  {
    id: 4,
    image: {
      src: computer,
      alt: 'computer',
    },
    title: 'technology',
    color: { lighter: '#BEEBD6', bolder: '#1BD17C' },
  },
  {
    id: 5,
    image: {
      src: art,
      alt: 'art',
    },
    title: 'art',
    color: { lighter: '#E6E2B2', bolder: '#B6A935' },
  },
]
