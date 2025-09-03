import economics from '../assets/icons/economics.svg'
import calculation from '../assets/icons/calculation.svg'
import chemistry from '../assets/icons/chemistry.svg'
import physics from '../assets/icons/physics.svg'
import psychology from '../assets/icons/psychology.svg'
import logic from '../assets/icons/logic.svg'

import knowledge from '../assets/icons/knowledge.svg'
import football from '../assets/icons/football.svg'
import computer from '../assets/icons/computer.svg'
import art from '../assets/icons/art.svg'
import entertainment from '../assets/icons/entertainment.svg'

export const freshmanCategories = [
  {
    kingdomId: 'FRESHMAN_KINGDOM_ID',
    title: 'economics',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: economics, alt: 'economics' },
    color: { light: '#E1D2E5', bold: '#6D6C6C' },
    description: 'Basic questions covering fundamental economics concepts.',
  },
  {
    kingdomId: 'FRESHMAN_KINGDOM_ID',
    title: 'ns maths',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: calculation, alt: 'calculation' },
    color: { light: '#CEDDF2', bold: '#2AABEE' },
    description:
      'Numerical skills and problem-solving with natural science math.',
  },
  {
    kingdomId: 'FRESHMAN_KINGDOM_ID',
    title: 'logic',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: logic, alt: 'logic' },
    color: { light: '#FFD2D2', bold: '#E36464' },
    description: 'Analytical reasoning and logical thinking exercises.',
  },
  {
    kingdomId: 'FRESHMAN_KINGDOM_ID',
    title: 'psychology',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: psychology, alt: 'psychology' },
    color: { light: '#BEEBD6', bold: '#1BD17C' },
    description: 'Cognitive processes, behavior, and psychology fundamentals.',
  },
  {
    kingdomId: 'FRESHMAN_KINGDOM_ID',
    title: 'G. physics',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: physics, alt: 'physics' },
    color: { light: '#E6E2B2', bold: '#B1A74D' },
    description: 'General physics covering motion, energy, and basic laws.',
  },
  {
    kingdomId: 'FRESHMAN_KINGDOM_ID',
    title: 'G. chemistry',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: chemistry, alt: 'chemistry' },
    color: { light: '#E1D2E5', bold: '#B6A935' },
    description:
      'Fundamental chemistry topics like atoms, reactions, and bonds.',
  },
]

export const triviaCategories = [
  {
    kingdomId: 'TRIVIA_KINGDOM_ID',
    title: 'entertainment',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: entertainment, alt: 'entertainment' },
    color: { light: '#E1D2E5', bold: '#6D6C6C' },
    description: 'Trivia on movies, music, and pop culture.',
  },
  {
    kingdomId: 'TRIVIA_KINGDOM_ID',
    title: 'G. knowledge',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: knowledge, alt: 'G. knowledge' },
    color: { light: '#CEDDF2', bold: '#2AABEE' },
    description: 'General knowledge questions across diverse topics.',
  },
  {
    kingdomId: 'TRIVIA_KINGDOM_ID',
    title: 'sport',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: football, alt: 'football' },
    color: { light: '#FFD2D2', bold: '#E36464' },
    description: 'Sports trivia including football, athletics, and games.',
  },
  {
    kingdomId: 'TRIVIA_KINGDOM_ID',
    title: 'technology',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: computer, alt: 'computer' },
    color: { light: '#BEEBD6', bold: '#1BD17C' },
    description: 'Questions on computers, gadgets, and modern tech.',
  },
  {
    kingdomId: 'TRIVIA_KINGDOM_ID',
    title: 'art',
    points: 10,
    timeAllowed: { min: 1, sec: 0 },
    image: { src: art, alt: 'art' },
    color: { light: '#E6E2B2', bold: '#B6A935' },
    description: 'Art, culture, and creativity-themed trivia.',
  },
]
