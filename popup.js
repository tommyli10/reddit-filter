console.log('popup running');

let forms = document.forms;
var userInput = document.getElementById('inputtext');

let button = document.getElementById('send');
console.log(button);
button.addEventListener('click', sendMessage);

const addForm = forms['form'];
console.log(addForm);
addForm.addEventListener('submit', function (e) {
    e.preventDefault();

    sendMessage();
});

function sendMessage() {
    let params = {
        active: true,
        currentWindow: true
    }

    chrome.tabs.query(params, gotTabs);

    function gotTabs(tab) {
        let message = {
            txt: userInput.value
        }
        chrome.tabs.sendMessage(tab[0].id, message);
    }
}