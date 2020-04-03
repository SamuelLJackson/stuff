declare global {
  interface Window {
    appName: string
    apiHost: string
    browser: string
  }
}

document.onscroll = () => window.scrollTo(0, 0)

window.appName = window.appName || ''
window.apiHost = 'https://localhost:44307'

if (process.env.NODE_ENV === 'production') {
  fetch('./manifest.json')
    .then(response => response.json())
    .then(manifest => {
      window.appName = '/' + manifest.short_name
      window.apiHost = manifest.prodHost
    })
}

window.browser = (function(): string {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return 'IE ' + (tem[1] || '')
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null)
      return tem
        .slice(1)
        .join(' ')
        .replace('OPR', 'Opera')
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  return M.join(' ')
})()

if (!window.browser.startsWith('Chrome')) {
  alert('Please switch to Chrome!')
}

export {}
