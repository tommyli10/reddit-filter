// class = 'rpBJOHq2PR60pnwJlUyP0'
// let filter = 'sonic';

// const list = document.querySelector('.rpBJOHq2PR60pnwJlUyP0');

// const titles = list.getElementsByTagName('h3');

// Array.from(titles).forEach(post => {
//     if (post.textContent.toLocaleLowerCase().includes(filter)) {
//         const parent = post.closest('.rpBJOHq2PR60pnwJlUyP0 > div');
//         parent.parentNode.removeChild(parent);
//     }
// });

const button = document.querySelector('#test');

button.addEventListener('click', () => {
    console.log('hello');
});


function injectJS(js) {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab) return;
        chrome.scripting.insertJS({
            javascript,
            target: { tabId: tab.id }
        })
    })
}