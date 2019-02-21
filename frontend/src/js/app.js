import {LinkList, Link} from './lib.js';
import {LinksLocalStorage} from "./storage.js";

const nameEl = document.querySelector('#link-name'); // Поле ввода названия
const tagEl = document.querySelector('#link-tag'); // Поле ввода тегов
const linkEl = document.querySelector('#link'); // Поле ввода ссылки
const formEl = document.querySelector('#add-form'); // вся форма добавления
const listEl = document.querySelector('#link-list'); // список, названия
const findListEl = document.querySelector('#finder-list'); // список поиска
const findNameEl = document.querySelector('#find-name'); // поле ввода для поиска
const editFormEl = document.createElement('div');
const linkList = new LinkList(new LinksLocalStorage());

rebuildTree(listEl, linkList);

const addButtonEl = document.querySelector('#add-item'); // кнопка добавления

nameEl.className = 'form-control';


formEl.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const linkName = nameEl.value; // поле ввода названия
    nameEl.value = nameEl.value.trim();

    const linkTag = tagEl.value; // поле ввода тегов

    const link = linkEl.value; // поле ввода ссылки
    linkEl.value = linkEl.value.trim();

    let location = false; // false - не прочитано, true - прочитано

    if (validationInputForm(nameEl.value, tagEl.value, linkEl.value) === true) {
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

    rebuildTree(listEl, linkList);

});

const findFormEl = document.querySelector('#find-form'); // форма поиска
const errorBox = document.querySelector('#error-box'); // див для ошибок

findFormEl.addEventListener('input', (evt) => {
    evt.preventDefault();

    const findNameEl = document.querySelector('#find-name'); // поле ввода для поиска
    let findName = findNameEl.value;
    console.log(findName);
    linkList.finder(findName);
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
    if (findName === '' ){
        return
    } else
    rebuildFinderTree(findListEl, linkList);

// todo:
//  1) если символы стерли и строка пустая, нужно стереть результаты
//  2) почему если все стираешь и начинаешь вводить снова, поиск работает после ввода второго символа
// todo: починить поиск из-за двух деревьев
});
function rebuildFinderTree(container, list) {
    container.innerHTML = '';
    for (const item of linkList.storage.resultObjects) {
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
    for (const item of list.items)
        if (item.location !== true)
    {
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
            <button id="edit" class="btn btn-info btn-sm float-right">✎</button>
        `;
        let tagList = '';
        for (const tag of item.tag) {
            tagList+='#'+tag;
            tagList+=' ';
        }
        const editButtonEl = liEl.querySelector('#edit');
        editButtonEl.addEventListener('click', (evt) => {
            editFormEl.innerHTML = '';
            editFormEl.innerHTML = `
           <form class="form-inline" id="edit-form">
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Название ссылки" id="edit-link-name" data-edit="name" value="${item.name}">
                </div>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Теги в формете #tag" id="edit-link-tag" value = "${tagList}">
                </div>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Ссылка" id="edit-link" value = "${item.link}">
                </div>
                <div class="addButton">
                    <button class="btn btn-outline-primary mb-3" id="edit-item" type="submit" data-action="edit">Сохранить</button>
                </div>
            </form>
           `;

            editFormEl.addEventListener('submit', (evt) => {
                evt.preventDefault();
                const editLinkNameEl = document.querySelector('#edit-link-name');
                const editLinkTagEl = document.querySelector('#edit-link-tag');
                const editLinkEl = document.querySelector('#edit-link');
                const editSaveButtonEl = document.querySelector('#edit-item');
                let editLinkName = editLinkNameEl.value;
                let editLinkTag = editLinkTagEl.value;
                let editLink = editLinkEl.value;
                list.editElement(item, editLinkName, editLinkTag, editLink);
                rebuildTree(container, list);
                editFormEl.appendChild(editSaveButtonEl);
            });

            liEl.appendChild(editFormEl);

        });


        const checkboxEl = liEl.querySelector('#i-checkbox');
        checkboxEl.addEventListener('change', (evt) => {
            linkList.changeLocation(item);
            console.log(item);
            rebuildTree(container, list);
            rebuildReadTree(readLinksListEl, linkList);
        });

        const removeEl = liEl.querySelector('[data-id=remove]');
        removeEl.addEventListener('click', () => {
            linkList.remove(item);
            rebuildTree(container, list);

        });
        container.appendChild(liEl);

    }
}

const readLinksListEl = document.querySelector('#read-link-list');


rebuildReadTree(readLinksListEl, linkList);
function rebuildReadTree(container, list) {
    container.innerHTML = '';

    for (const item of list.items)
        if (item.location === true) {
            const liEl = document.createElement('li');
            liEl.className = 'list-group-item col-10';
            let tagsHTML = '';
            for (const tag of item.tag) {
                tagsHTML += `<span data-id="text1" class="badge badge-success"><h6>#${tag}</h6></span>`;
                tagsHTML += `  `
            }

            liEl.innerHTML = `
            <input type="checkbox" id="i-checkbox" checked="true">
            <a href="${item.link}"><span data-id="text" class="badge badge-info"><h6>${item.name}</h6></span></a>
            ${tagsHTML}
            <button data-id="remove" class="btn btn-danger btn-sm float-right">Удалить</button>
             <button id="edit" class="btn btn-info btn-sm float-right">✎</button>
        `;
            let tagList = '';
            for (const tag of item.tag) {
                tagList+='#'+tag;
                tagList+=' ';
            }
            const editButtonEl = liEl.querySelector('#edit');
            editButtonEl.addEventListener('click', (evt) => {
                editFormEl.innerHTML = '';
                editFormEl.innerHTML = `
           <form class="form-inline" id="edit-form">
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Название ссылки" id="edit-link-name" data-edit="name" value="${item.name}">
                </div>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Теги в формете #tag" id="edit-link-tag" value = "${tagList}">
                </div>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Ссылка" id="edit-link" value = "${item.link}">
                </div>
                <div class="addButton">
                    <button class="btn btn-outline-primary mb-3" id="edit-item" type="submit" data-action="edit">Сохранить</button>
                </div>
            </form>
           `;

                editFormEl.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                    const editLinkNameEl = document.querySelector('#edit-link-name');
                    const editLinkTagEl = document.querySelector('#edit-link-tag');
                    const editLinkEl = document.querySelector('#edit-link');
                    const editSaveButtonEl = document.querySelector('#edit-item');
                    let editLinkName = editLinkNameEl.value;
                    let editLinkTag = editLinkTagEl.value;
                    let editLink = editLinkEl.value;
                    list.editElement(item, editLinkName, editLinkTag, editLink);
                    rebuildReadTree(container, list);
                    editFormEl.appendChild(editSaveButtonEl);
                });

                liEl.appendChild(editFormEl);

            });


            const checkboxEl = liEl.querySelector('#i-checkbox');
            checkboxEl.addEventListener('change', (evt) => {
                linkList.changeLocation(item);
                // checkboxEl.checked = true;
                rebuildReadTree(readLinksListEl, linkList);
                rebuildTree(listEl, linkList);
            });

            const removeEl = liEl.querySelector('[data-id=remove]');
            removeEl.addEventListener('click', (evt) => {
                linkList.remove(item);
                rebuildReadTree(container, list);

            });
            container.appendChild(liEl);

        }
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
