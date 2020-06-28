window.addEventListener('load', async () => {
  const srcCanvas = document.getElementById('src')
  const imgInput = document.getElementById('img-input')
  const deficiencySelect = document.getElementById('deficiency')

  imgInput.addEventListener('input', async () => {
    const url = URL.createObjectURL(imgInput.files[0])
    await canvasLoadImage(srcCanvas, url)
    processImage(deficiencySelect.value)
  })

  deficiencySelect.addEventListener('change', () => {
    processImage(deficiencySelect.value)
  })

  await canvasLoadImage(srcCanvas, './ishihara.jpg')
  processImage(deficiencySelect.value)
})

function processImage(deficiency) {
  const srcCanvas = document.getElementById('src')
  const distCanvas = document.getElementById('dist')
  const srcContext = srcCanvas.getContext('2d')
  const distContext = distCanvas.getContext('2d')

  const imageData = srcContext.getImageData(
    0,
    0,
    srcCanvas.width,
    srcCanvas.height
  )

  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const simColor = colorblind.simulate({ r, g, b }, deficiency)

    data[i] = simColor.r
    data[i + 1] = simColor.g
    data[i + 2] = simColor.b
  }

  setCanvasSize(distCanvas, srcCanvas.width, srcCanvas.height)
  distContext.clearRect(0, 0, distCanvas.width, distCanvas.height)
  distContext.putImageData(imageData, 0, 0)
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = src
  })
}

// Set canvas size but maintain it's original width
function setCanvasSize(canvas, width, height) {
  canvas.height = (height / width) * canvas.offsetWidth
}

async function canvasLoadImage(canvas, src) {
  const context = canvas.getContext('2d')
  const img = await loadImage(src)
  setCanvasSize(canvas, img.naturalWidth, img.naturalHeight)
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(img, 0, 0, canvas.width, canvas.height)
}
