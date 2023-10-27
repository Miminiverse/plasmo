import tldr from "wikipedia-tldr"

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Quick Wiki Lookup For "%s"',
    contexts: ["selection"],
    id: "myContextMenuId"
  })
})

type WikiTldrThumbnail = {
  source: string
  width: number
  height: number
}

export type WikiTldr = {
  query: string
  type: string
  title: string
  displaytitle: string
  thumbnail: WikiTldrThumbnail
  originalimage: WikiTldrThumbnail
  lang: string
  description: string
  extract: string
  extract_html: string
}

export type WikiMessage = {
  type: string
  text: WikiTldr
}

const trans = async (text) => {
  const requestBody = {
    text: text,
    targetLanguage: "vi" // Replace with your target language
  }

  const response = await fetch("http://localhost:8001/api/v1/translation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
  let translation
  if (response.ok) {
    const data = await response.json()
    translation = data.translation
  }
  return translation
}

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  const tldrText = await trans(info.selectionText)
  chrome.tabs.sendMessage(tab.id, {
    type: "lookup",
    text: tldrText
  })
})
