const button = document.querySelector('.colorBtn');

const gridItem = document.querySelector('.gridItem');

const colValue = document.querySelector('.colValue');

button.addEventListener('click', async () => {
    chrome.storage.sync.get('color', ({ color }) => {
        console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: getColor,
        },
        async (injectionResults) => {
            const [styleData] = injectionResults;
            if (styleData.result) {
                const color = styleData.result.sRGBHex;
                gridItem.style.backgroundColor = color;
                colValue.innerText = color;
                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    );
});


async function getColor() {
    try {
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (error) {
        console.error(error);
    }
}
