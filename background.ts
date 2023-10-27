chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Quick Translate For "%s"',
    contexts: ["selection"],
    id: "myContextMenuId"
  })
})

const trans = async (text) => {
  const requestBody = {
    text: text,
    targetLanguage: "es" // Replace with your target language
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
