import {LinkList, Link} from './lib.js';
import {LinksLocalStorage} from "./storage.js";

const nameEl = document.querySelector('#link-name'); // Поле ввода названия
const tagEl = document.querySelector('#link-tag'); // Поле ввода тегов
const linkEl = document.querySelector('#link'); // Поле ввода ссылки

const formEl = document.querySelector('#add-form'); // вся форма добавления
const listEl = document.querySelector('#link-list'); // список, названия
const tagsEl = document.querySelector('#link-tags'); // список, теги
const linkList = new LinkList(new LinksLocalStorage());

rebuildTree(listEl, linkList);

const addButton = document.querySelector('#add-item');

formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const linkName = nameEl.value; // поле ввода названия
    nameEl.value = nameEl.value.trim();

    const linkTag = tagEl.value.split("#"); // поле ввода тегов

    const link = linkEl.value; // поле ввода ссылки
    linkEl.value = linkEl.value.trim();

    let location = "toRead";

    const linkNameEl = document.querySelector('#link-name');
    const linkTagsEl = document.querySelector('#link-tags');

    console.log (tagEl.value.split("#"));

    const line = new Link(linkName, linkTag, link, location);
    linkList.add(line);

    nameEl.value = '';
    tagEl.value = '';
    linkEl.value = '';

    rebuildTree(listEl, linkList, link, location);

});

function rebuildTree(container, list) {
    container.innerHTML = '';
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item col-10';

        liEl.innerHTML = `
            <input type="checkbox" id="i-checkbox">
            <a href="${item.link}"><span data-id="text" class="badge badge-info"><h6>${item.name}</h6></span></a>
            <span data-id="text1" class="badge badge-success"><h6>${item.tag}</h6> </span>
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Удалить</button>
        `;

        const checkboxEl = liEl.querySelector('#i-checkbox');
            checkboxEl.addEventListener('change', (evt) => { // change можно заменить на input !!!!!!!!!
                linkList.changeLocation(item);
                console.log(item);
                rebuildTree(container, list);
            });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            linkList.remove(item);
            rebuildTree(container, list);

        });

        container.appendChild(liEl);

    }


}

