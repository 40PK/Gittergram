import seedrandom from 'seedrandom'

const userColors = [
  '#c03d33', // red
  '#4fad2d', // green
  '#d09306', // yellow
  '#348cd4', // blue
  '#8544d6', // purple
  '#cd4073', // pink
  '#2996ad', // sea
  '#ce671b'  // orange
]

export default {
  getHexColor(seed) {
    return userColors[Math.floor(seedrandom(seed)() * 7)]
  }
}
