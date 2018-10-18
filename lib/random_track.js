export function randomTrack () {
  const musicTracks = ['lib/music/cybercity.mp3', 'lib/music/starbound.mp3', 'lib/music/waves.mp3']
  let selected = musicTracks[Math.floor(Math.random() * musicTracks.length)]
  return selected
}
