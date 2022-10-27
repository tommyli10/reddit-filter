console.log('popup running');

let forms = document.forms;
var userInput = document.getElementById('inputtext');

let button = document.getElementById('send');
button.addEventListener('click', sendMessage);

const addForm = forms['form'];
console.log(addForm);
addForm.addEventListener('submit', function (e) {
    // prevent the default actiSon of reloading the popup.html when submitted
    e.preventDefault();

    sendMessage();
});

// send the input keyword to the content script
function sendMessage() {
    const params = {
        active: true,
        currentWindow: true
    }

    const message = {
        txt: userInput.value
    }

    // make sure only the active reddit page on the browser will be affected
    chrome.tabs.query(params, gotTabs);

    // send the keyword to content script
    function gotTabs(tab) {
        chrome.tabs.sendMessage(tab[0].id, message);
    }
}