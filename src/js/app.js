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

const addButtonEl = document.querySelector('#add-item'); // кнопка добавления

nameEl.className = 'form-control';


formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const linkName = nameEl.value; // поле ввода названия
    nameEl.value = nameEl.value.trim();

    const linkTag = tagEl.value; // поле ввода тегов
    const tagsForList = tagEl.value; // строка тегов без разделения

    const link = linkEl.value; // поле ввода ссылки
    linkEl.value = linkEl.value.trim();

    let location = false; // false - не прочитано, true - прочитано

    if (validation(nameEl.value, tagEl.value, linkEl.value) === true) {
        return;
    }

    nameEl.className = 'form-control';
    tagEl.className = 'form-control';
    linkEl.className = 'form-control';

    const line = new Link(linkName, linkTag, tagsForList, link, location);
    linkList.add(line);


    nameEl.value = '';
    tagEl.value = '';
    linkEl.value = '';

    rebuildTree(listEl, linkList);

});

const findFormEl = document.querySelector('#find-form'); // форма поиска

findFormEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const findNameEl = document.querySelector('#find-name'); // поле ввода для поиска
    let findName = findNameEl.value;
    linkList.finder(findName);
});

function rebuildTree(container, list) {
    container.innerHTML = '';
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item col-10';
        // let index = 0;
        // for (index = 0; index<item.tag.length; index++) {
        //
        //
        // }
        let tagsHTML = '';
        for (const tag of item.tag) {
            tagsHTML += `<span data-id="text1" class="badge badge-success"><h6>#${tag}</h6></span>`;
            tagsHTML += `  `
        }

        liEl.innerHTML = `
            <input type="checkbox" id="i-checkbox">
            <a href="${item.link}"><span data-id="text" class="badge badge-info"><h6>${item.name}</h6></span></a>
            ${tagsHTML}
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Удалить</button>
        `;

        const checkboxEl = liEl.querySelector('#i-checkbox');
        checkboxEl.addEventListener('change', (evt) => {
            linkList.changeLocation(item);
            console.log(item);
            // rebuildTree(container, list);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', (evt) => {
            linkList.remove(item);
            rebuildTree(container, list);

        });

        container.appendChild(liEl);

    }


}

function validation(name, tag, link) {
    let result;
    if (name === '') {
        nameEl.className = 'form-control error';
        result = true;
    }

    if (tag === '') {
        tagEl.className = 'form-control error';
        result = true;

    }

    if (link === '') {
        linkEl.className = 'form-control error';
        result = true;
    }

    if ((name !== '') && (nameEl.className === 'form-control error')) {
        nameEl.className = 'form-control'
    }

    if ((tag !== '') && (tagEl.className === 'form-control error')) {
        tagEl.className = 'form-control'
    }

    if ((link !== '') && (linkEl.className === 'form-control error')) {
        linkEl.className = 'form-control'
    }
    return result;

}
