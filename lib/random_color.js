export const randomColor = function () {
  const colors = ['#050D7F', '#0794DB', '#00BFEC', '#1CD0F8', '#1A649C']
  return colors[Math.floor(Math.random() * colors.length)]
}
