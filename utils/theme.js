/**
 * GET CONTRAST
 * */

const getContrast = (variable = '--contrast-mode') => {
  const bodyElement = document.getElementById('body')
  var element = document && getComputedStyle(bodyElement)
  const contrast = element && element.getPropertyValue(variable)
  // console.log('contrast returned is', contrast)
  // console.log(contrast.toString() === 'dark')
  // console.log(typeof contrast)
  return contrast.trim() === 'dark' ? 'light' : 'dark'
}

/**
 * Set theme Class
 */

const setTheme = (targetId, classToAdd) => {
  localStorage.setItem('infinftTheme', classToAdd)
  const targetElement = document.getElementById(targetId)

  const themeArray = [
    'lemon',
    'sand',
    'greyscale',
    'grayscale',
    'turquoise',
    'peach',
    'violet',
    'teal',
    'charcoal',
  ]
  themeArray.forEach(function (theme) {
    if (targetElement.classList.contains(theme)) {
      targetElement.classList.remove(theme)
    }
  })
  if (targetElement) {
    targetElement.classList.add(classToAdd)
  }
}

export { setTheme, getContrast }
