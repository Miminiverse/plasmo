import cssText from "data-text:~/style.css"
import { useEffect, useState } from "react"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const [translate, setTranslate] = useState(null)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function ({ type, text }) {
      setTranslate(text)
      return true
    })
  }, [])

  return (
    <div>
      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hi I'm your translation bot!
        </h1>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
          {translate}
        </h2>
      </div>
    </div>
  )
}

export default IndexPopup
