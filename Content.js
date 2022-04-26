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

console.log("script running");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.txt);

    let filter = message.txt.toLowerCase();

    const list = document.querySelector('.rpBJOHq2PR60pnwJlUyP0');

    const titles = list.getElementsByTagName('h3');

    Array.from(titles).forEach(post => {
        if (post.textContent.toLocaleLowerCase().includes(filter)) {
            const parent = post.closest('.rpBJOHq2PR60pnwJlUyP0 > div');
            parent.parentNode.removeChild(parent);
        }
    });
}