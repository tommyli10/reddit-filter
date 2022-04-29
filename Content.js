console.log("script running");

chrome.runtime.onMessage.addListener(gotMessage);

// reddit put all the post in a class with this randomly generated class name
// we put this class name in a variable so we can easily change it later if the name is updated
let postClassName = '.rpBJOHq2PR60pnwJlUyP0';

// create a list of words for filtering
let wordList = [];

// selecting all reddit post in the class of '.rpBJOHq2PR60pnwJlUyP0'
let list = document.querySelector(`${postClassName}`);
let titles = list.getElementsByTagName('h3');
let tags = list.getElementsByTagName('span');

// receieve a message with the keyword input by the user
function gotMessage(message) {
    console.log(message.txt);

    let newWord = message.txt.toLowerCase();

    // put the new keyword into the word list if it's not already in there
    if (!wordList.includes(newWord)) {
        wordList.push(newWord);
    }

    // whenever we get a new keyword, we call the removePosts function once
    removePosts();
}

// removes posts tha contain any of the keywords
function removePosts() {
    // if wordList is empty, we skip this iteration
    if (wordList.length == 0) return;

    // get rid of all post with filter word in title
    Array.from(titles).forEach(post => {
        for (let i = 0; i < wordList.length; i++) {
            let filter = wordList[i];
            if (post.textContent.toLocaleLowerCase().includes(filter)) {
                const parent = post.closest(`${postClassName} > div`);
                parent.parentNode.removeChild(parent);
            }
        }
    });

    // get rid of all post with filter word in tags
    Array.from(tags).forEach(tag => {
        for (let j = 0; j < wordList.length; j++) {
            let filter = wordList[j];
            if (tag.textContent.toLocaleLowerCase().includes(filter)) {
                const parent = tag.closest(`${postClassName} > div`);
                parent.parentNode.removeChild(parent);
            }
        }
    });
}

// when you scroll down on reddit, new posts might load, so we call removePosts whenever the page is scrolled
document.addEventListener('scroll', removePosts)