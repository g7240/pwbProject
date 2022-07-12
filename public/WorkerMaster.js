console.log("Ho caricato il web worker delle immagini")
const ImageLoaderWorker = new Worker('./WorkerSlave.js')
const imgElements = document.querySelectorAll('img[data-src]')
// Once again, it's possible that messages could be returned before the
// listener is attached, so we need to attach the listener before we pass
// image URLs to the web worker
ImageLoaderWorker.addEventListener('message', event => {
  // Grab the message data from the event
  const imageData = event.data
  // Get the original element for this image
  const imageElement = document.querySelector(`img[data-src='${imageData.imageURL}']`)
  // We can use the `Blob` as an image source! We just need to convert it
  // to an object URL first
  const objectURL = URL.createObjectURL(imageData.blob)
  
  imageElement.setAttribute('src', objectURL)
  
  // Let's remove the original `data-src` attribute to make sure we don't
  // accidentally pass this image to the worker again in the future
  imageElement.removeAttribute('data-src')
})

imgElements.forEach(imageElement => {
  const imageURL = imageElement.getAttribute('data-src')
  ImageLoaderWorker.postMessage(imageURL)
})
//https://trezy.com/blog/loading-images-with-web-workers