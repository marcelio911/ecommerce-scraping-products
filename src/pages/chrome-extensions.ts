// how to get the current tab url
const persistAcrossSessions = true;
const runAt = 'document_end';
const allFrames = true;
const world = 'MAIN';
const DYNAMIC_SCRIPT_ID = 'dynamic-script';
const matches = ['https://shopee.com.br/*'];

// Get a non-default Storage bucket
async function isDynamicContentScriptRegistered() {
  const scripts = await chrome.scripting.getRegisteredContentScripts();

  return scripts.some((s) => s.id === DYNAMIC_SCRIPT_ID);
}
export  const registerDynamic = async () => {
    const isRegistered = await isDynamicContentScriptRegistered();
    if (isRegistered) {
      console.log('Dynamic content script already registered');
      chrome?.tabs.reload();
      return;
    }
    await chrome?.scripting?.registerContentScripts([
      {
        id: DYNAMIC_SCRIPT_ID,
        js: ['assets/js/shopee-products.js'],
        persistAcrossSessions,
        matches: matches,
        runAt,
        allFrames,
        world
      }
    ]);
    console.log('Dynamic content script registered');
    chrome.tabs.reload();


}

chrome?.tabs?.query({active: true, currentWindow: true}, async (tabs) => {
  const tab = tabs[0];


  const { options } = await chrome.storage.local.get('options');

  console.log('tabs2', JSON.stringify(tab));
  console.log('options', JSON.stringify(options));


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log('request', request);
      console.log('sender', sender);
      console.log('sendResponse', sendResponse);
      if (request.type === "url") {
        chrome.tabs.create({"url": request.url});
      }
    }
  );
}
);

chrome?.webNavigation?.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  console.log('url !== matches', !matches.some(u => url.includes(u)), ' == tabId, url ', tabId, url);

  if (!matches.some(u => url.includes(u))) return;

  const { options } = await chrome.storage.local.get('options');
  chrome?.scripting?.executeScript({
    target: { tabId },
    type: 'module',
    files: ['assets/js/shopee-products.js'],
    ...options
  });
});

function reddenPage() {
  document.body.style.backgroundColor = 'red';
  //  how to reload the current tab
}

chrome?.action?.onClicked.addListener((tab) => {
  console.log('onClicked', tab);

  if (!tab?.url?.includes('chrome://')) {
    chrome.scripting.executeScript({
      target: { tabId: Number(tab.id) },
      func: reddenPage
    });
  }
});




export const unRegisterDynamic = async () => {
    await chrome.scripting.unregisterContentScripts({
      ids: [DYNAMIC_SCRIPT_ID]
    });

    console.log('Dynamic content script unregistered');
}
