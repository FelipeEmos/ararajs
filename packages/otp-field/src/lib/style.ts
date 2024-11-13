import { onCleanup } from 'solid-js'

let otpFieldStyleElement: HTMLStyleElement | null = null

let activeCount = 0

const createOtpFieldStyleElement = () => {
  activeCount += 1
  if (otpFieldStyleElement) return
  otpFieldStyleElement = document.createElement('style')
  document.head.appendChild(otpFieldStyleElement)

  const autofillStyle =
    'background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;'
  const styleString = `
    [data-arara-otp-field-input]::selection { background: transparent !important; color: transparent !important; }';
    [data-arara-otp-field-input]:autofill { ${autofillStyle} };
    [data-arara-otp-field-input]:-webkit-autofill { ${autofillStyle} };
    @supports (-webkit-touch-callout: none) { [data-arara-otp-field-input] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } };
    [data-arara-otp-field-input] + * { pointer-events: all !important; };
  `
  otpFieldStyleElement.innerHTML = styleString

  onCleanup(() => {
    activeCount -= 1
    if (activeCount === 0 && otpFieldStyleElement) {
      otpFieldStyleElement.remove()
      otpFieldStyleElement = null
    }
  })
}

export default createOtpFieldStyleElement
