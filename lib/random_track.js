export function randomTrack () {
  const musicTracks = ['lib/music/stellar.mp3', 'lib/music/starbound.mp3', 'lib/music/horizon.mp3', 'lib/music/noman.mp3']
  let selected = musicTracks[Math.floor(Math.random() * musicTracks.length)]
  return selected
}
