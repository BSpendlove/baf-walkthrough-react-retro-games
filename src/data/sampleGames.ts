import type { Game } from '../types/game'

export const SAMPLE_GAMES: Game[] = [
  {
    id: 52889,
    name: 'Super Mario Bros.',
    background_image: '/images/games/super-mario-bros.jpg',
    rating: 4.42,
    platforms: [{ platform: { id: 49, name: 'NES', slug: 'nes' } }],
  },
  {
    id: 24899,
    name: 'The Legend of Zelda',
    background_image: '/images/games/legend-of-zelda.jpg',
    rating: 4.28,
    platforms: [{ platform: { id: 49, name: 'NES', slug: 'nes' } }],
  },
  {
    id: 24942,
    name: 'Super Mario World',
    background_image: '/images/games/super-mario-world.jpg',
    rating: 4.47,
    platforms: [{ platform: { id: 79, name: 'SNES', slug: 'snes' } }],
  },
  {
    id: 24962,
    name: 'The Legend of Zelda: A Link to the Past',
    background_image: '/images/games/zelda-link-to-the-past.jpg',
    rating: 4.44,
    platforms: [{ platform: { id: 79, name: 'SNES', slug: 'snes' } }],
  },
  {
    id: 52940,
    name: 'Chrono Trigger',
    background_image: '/images/games/chrono-trigger.jpg',
    rating: 4.52,
    platforms: [{ platform: { id: 79, name: 'SNES', slug: 'snes' } }],
  },
  {
    id: 53341,
    name: 'Sonic the Hedgehog',
    background_image: '/images/games/sonic-the-hedgehog.jpg',
    rating: 4.04,
    platforms: [{ platform: { id: 167, name: 'Genesis', slug: 'genesis' } }],
  },
  {
    id: 52998,
    name: 'Streets of Rage 2',
    background_image: '/images/games/streets-of-rage-2.jpg',
    rating: 4.14,
    platforms: [{ platform: { id: 167, name: 'Genesis', slug: 'genesis' } }],
  },
  {
    id: 56984,
    name: 'Super Mario 64',
    background_image: '/images/games/super-mario-64.jpg',
    rating: 4.35,
    platforms: [{ platform: { id: 83, name: 'Nintendo 64', slug: 'nintendo-64' } }],
  },
  {
    id: 10261,
    name: 'The Legend of Zelda: Ocarina of Time',
    background_image: '/images/games/zelda-ocarina-of-time.jpg',
    rating: 4.37,
    platforms: [{ platform: { id: 83, name: 'Nintendo 64', slug: 'nintendo-64' } }],
  },
  {
    id: 56123,
    name: 'GoldenEye 007',
    background_image: '/images/games/goldeneye-007.jpg',
    rating: 3.97,
    platforms: [{ platform: { id: 83, name: 'Nintendo 64', slug: 'nintendo-64' } }],
  },
  {
    id: 52931,
    name: 'Final Fantasy VII',
    background_image: '/images/games/final-fantasy-vii.jpg',
    rating: 4.36,
    platforms: [{ platform: { id: 27, name: 'PlayStation', slug: 'playstation1' } }],
  },
  {
    id: 56078,
    name: 'Metal Gear Solid',
    background_image: '/images/games/metal-gear-solid.jpg',
    rating: 4.33,
    platforms: [{ platform: { id: 27, name: 'PlayStation', slug: 'playstation1' } }],
  },
  {
    id: 52671,
    name: 'Crash Bandicoot',
    background_image: '/images/games/crash-bandicoot.jpg',
    rating: 4.08,
    platforms: [{ platform: { id: 27, name: 'PlayStation', slug: 'playstation1' } }],
  },
  {
    id: 53498,
    name: 'Castlevania: Symphony of the Night',
    background_image: '/images/games/castlevania-sotn.jpg',
    rating: 4.35,
    platforms: [{ platform: { id: 27, name: 'PlayStation', slug: 'playstation1' } }],
  },
  {
    id: 52503,
    name: 'Pac-Man',
    background_image: '/images/games/pac-man.jpg',
    rating: 3.58,
    platforms: [{ platform: { id: 34, name: 'Arcade', slug: 'arcade' } }],
  },
  {
    id: 53879,
    name: 'Donkey Kong',
    background_image: '/images/games/donkey-kong.jpg',
    rating: 3.61,
    platforms: [{ platform: { id: 34, name: 'Arcade', slug: 'arcade' } }],
  },
  {
    id: 56949,
    name: 'Street Fighter II',
    background_image: '/images/games/street-fighter-ii.jpg',
    rating: 4.14,
    platforms: [{ platform: { id: 34, name: 'Arcade', slug: 'arcade' } }],
  },
  {
    id: 52766,
    name: 'Mega Man 2',
    background_image: '/images/games/mega-man-2.jpg',
    rating: 4.06,
    platforms: [{ platform: { id: 49, name: 'NES', slug: 'nes' } }],
  },
  {
    id: 24984,
    name: 'Metroid',
    background_image: '/images/games/metroid.jpg',
    rating: 3.85,
    platforms: [{ platform: { id: 49, name: 'NES', slug: 'nes' } }],
  },
  {
    id: 24935,
    name: 'Super Metroid',
    background_image: '/images/games/super-metroid.jpg',
    rating: 4.52,
    platforms: [{ platform: { id: 79, name: 'SNES', slug: 'snes' } }],
  },
]

/** Platform ID map matching FilterChips values */
const PLATFORM_IDS: Record<string, number> = {
  '49': 49,
  '79': 79,
  '167': 167,
  '27': 27,
  '83': 83,
  '34': 34,
}

export function querySampleGames(search: string, platform: string): Game[] {
  let results = SAMPLE_GAMES

  if (platform && PLATFORM_IDS[platform]) {
    const pid = PLATFORM_IDS[platform]
    results = results.filter(
      (g) => g.platforms?.some((p) => p.platform.id === pid),
    )
  }

  if (search) {
    const q = search.toLowerCase()
    results = results.filter((g) => g.name.toLowerCase().includes(q))
  }

  return results
}
