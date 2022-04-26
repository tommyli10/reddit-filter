console.log("script running");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    console.log(message.txt);

    let filter = message.txt.toLowerCase();

    // selecting all reddit post, which are all under a div with the class name of '.rpBJOHq2PR60pnwJlUyP0'
    const list = document.querySelector('.rpBJOHq2PR60pnwJlUyP0');
    const titles = list.getElementsByTagName('h3');
    const tags = list.getElementsByTagName('span');

    // get rid of all post with filter word in title
    Array.from(titles).forEach(post => {
        if (post.textContent.toLocaleLowerCase().includes(filter)) {
            const parent = post.closest('.rpBJOHq2PR60pnwJlUyP0 > div');
            parent.parentNode.removeChild(parent);
        }
    });

    // get rid of all post with filter word in tags
    Array.from(tags).forEach(tag => {
        if (tag.textContent.toLocaleLowerCase().includes(filter)) {
            const parent = tag.closest('.rpBJOHq2PR60pnwJlUyP0 > div');
            parent.parentNode.removeChild(parent);
        }
    });
}