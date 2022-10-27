console.log("script running");

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('hello')
});
chrome.runtime.onMessage.addListener(gotMessage);

// reddit put all the post in a class with this randomly generated class name
// we put this class name in a variable so we can easily change it later if the name is updated
const postClassName = '.rpBJOHq2PR60pnwJlUyP0';

// create a list of words for filtering
let wordList = [];

// selecting all reddit post in the class of '.rpBJOHq2PR60pnwJlUyP0'
const list = document.querySelector(`${postClassName}`);
const titles = list.getElementsByTagName('h3');
const tags = list.getElementsByTagName('span');

// receieve a message with the keyword input by the user
function gotMessage(message) {
    // console.log(message.txt);

    const newWord = message.txt.toLowerCase();

    // if the reddit filter storage is undefined or null
    // we will initilize an array in local storage for reddit.com
    let storage = localStorage.getItem('redditFilterWords');
    if (!storage) {
        localStorage.setItem('redditFilterWords', JSON.stringify([]));
    }

    storage = JSON.parse(localStorage.getItem('redditFilterWords'));
    storage.push(newWord);
    // save the new word to reddit.com's local storage
    localStorage.setItem('redditFilterWords', JSON.stringify(storage));

    // update this extension's wordlist with storage
    wordList = storage;
    // console.log(storage);

    // put the new keyword into the word list if it's not already in there
    if (!wordList.includes(newWord)) {
        wordList.push(newWord);
    }

    // whenever we get a new keyword, we call the removePosts function once
    removePosts();
}

const checkPosts = (array) => {
    array.forEach((post) => {
        for (let i = 0; i < wordList.length; i++) {
            let filter = wordList[i];
            if (post.textContent.toLocaleLowerCase().includes(filter)) {
                const parent = post.closest(`${postClassName} > div`);
                parent.remove();
            }
        }
    });
};

// removes posts tha contain any of the keywords
function removePosts() {
    // if wordList is empty, we skip this iteration
    if (wordList.length == 0) return;

    checkPosts(Array.from(titles));
    checkPosts(Array.from(tags));
}

// when you scroll down on reddit, new posts might load, so we call removePosts whenever the page is scrolled
document.addEventListener('scroll', removePosts)