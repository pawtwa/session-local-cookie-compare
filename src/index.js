import "./resources/styles/main.scss";

function uniqueStringGenerate() {
    const partOne = Math.random().toString(36).substring(2);
    const partTwo = Math.random().toString(36).substring(2);
    return `${partOne}${partTwo}`;
}

const keyValueTemplate = document.querySelector('#key-value-pair-template');

function getStorageKeys(storage) {
    return [...Array(storage.length).keys()].map(index => storage.key(index));
}

function renderStorage(storage, type) {
    const box = document.querySelector(`#${type}-key-value-pairs`);
    while (box.firstChild) {
        box.removeChild(box.firstChild);
    }
    getStorageKeys(storage).forEach(key => {
        const value = storage.getItem(key);
        const node = document.importNode(keyValueTemplate.content, true);
        node.querySelector('.key').innerText = key;
        node.querySelector('.value').innerText = value;
        box.appendChild(node);
    });
}

(function () {
    const localBtn = document.querySelector('#local-random-pair-btn');
    const sessionBtn = document.querySelector('#session-random-pair-btn');

    const btnCallback = function (type) {
        return function (event) {
            const key = uniqueStringGenerate();
            const value = uniqueStringGenerate();
            console.log(type, key);
            switch (type) {
                case 'session':
                    sessionStorage.setItem(key, value);
                    renderStorage(sessionStorage, type);
                    break;
                case 'local':
                    localStorage.setItem(key, value);
                    renderStorage(localStorage, type);
                    break;
                default:
                    break;
            }
            return false;
        }
    };

    localBtn.addEventListener('click', btnCallback('local'));
    sessionBtn.addEventListener('click', btnCallback('session'));

    renderStorage(localStorage, 'local');
    renderStorage(sessionStorage, 'session');
})();
