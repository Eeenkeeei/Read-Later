import {LinkList, Link} from './lib.js';
import {LinksLocalStorage} from "./storage.js";

const nameEl = document.querySelector('#link-name'); // Поле ввода названия
const tagEl = document.querySelector('#link-tag'); // Поле ввода тегов
const linkEl = document.querySelector('#link'); // Поле ввода ссылки

const formEl = document.querySelector('#add-form'); // вся форма добавления
const listEl = document.querySelector('#link-list'); // список, названия
const linkList = new LinkList(new LinksLocalStorage());
const findNameEl = document.querySelector('#find-name'); // поле ввода для поиска

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

    if (validationInputForm(nameEl.value, tagEl.value, linkEl.value, findFormEl.value) === true) {
        return;
    }

    nameEl.className = 'form-control';
    tagEl.className = 'form-control';
    linkEl.className = 'form-control';

    const line = new Link(linkName, linkTag, link, location);
    linkList.add(line);


    nameEl.value = '';
    tagEl.value = '';
    linkEl.value = '';

    rebuildTree(findFormEl, linkList);

});

const findFormEl = document.querySelector('#find-form'); // форма поиска
const errorBox = document.querySelector('#error-box'); // див для ошибок

findFormEl.addEventListener('submit', (evt, findFormEl) => {
    evt.preventDefault();

    let findName = findNameEl.value;
    linkList.finder(findName);
    if (validationFindForm(findNameEl.value) === true) {
        return;
    }
    if (linkList.storage.resultObjects.length === 0) {
        errorBox.innerHTML = '';
        const errorEl = document.createElement('span');
        errorEl.className = 'alert alert-warning';
        errorEl.innerHTML = `Запись не найдена`;
        errorBox.appendChild(errorEl);
        findListEl.innerHTML = '';
        return;
    }
    errorBox.innerHTML = '';
    rebuildFinder(findListEl, linkList);
});

const findListEl = document.querySelector('#find-link-list'); // список, названия

function rebuildFinder(container, list) {
    container.innerHTML = '';
    for (const item of list.storage.resultObjects) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item col-10';
        let tagsHTML = '';
        for (const tag of item.tag) {
            tagsHTML += `<span data-id="text1" class="badge badge-success"><h6>#${tag}</h6></span>`;
            tagsHTML += `  `
        }

        liEl.innerHTML = `
            <a href="${item.link}"><span data-id="text" class="badge badge-info"><h6>${item.name}</h6></span></a>
            ${tagsHTML}
        `;
        container.appendChild(liEl);

    }

}

function rebuildTree(container, list) {
    container.innerHTML = '';
    for (const item of list.items) {
        const liEl = document.createElement('li');
        liEl.className = 'list-group-item col-10';
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

function validationFindForm(findName) {
    let result;
    if (findName === '') {
        findNameEl.className = 'form-control error';
        result = true;
    }

    if ((findName !== '') && (findNameEl.className === 'form-control error')) {
        findNameEl.className = 'form-control';
        result = true;
    }

    return result;

}

function validationInputForm(name, tag, link) {
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
