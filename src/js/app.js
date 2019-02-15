import {LinkList, Link} from './lib.js';
import {LinksLocalStorage} from "./storage.js";

const nameEl = document.querySelector('#link-name'); // Поле ввода названия
const tagEl = document.querySelector('#link-tag'); // Поле ввода тегов
const linkEl = document.querySelector('#link'); // Поле ввода ссылки
const formEl = document.querySelector('#add-form'); // вся форма добавления
const listEl = document.querySelector('#link-list'); // список, названия
const findListEl = document.querySelector('#finder-list'); // список поиска
const findNameEl = document.querySelector('#find-name'); // поле ввода для поиска
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

findFormEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const findNameEl = document.querySelector('#find-name'); // поле ввода для поиска
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
    rebuildFinderTree(findListEl, linkList)

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
    let count = 0;
    container.innerHTML = '';

    for (const item of list.items)
        // if (item.location !== true)
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

        const editButtonEl = liEl.querySelector('#edit');
        editButtonEl.addEventListener('click', () => {
            const editFormEl = document.createElement('div');
            // editFormEl.className = 'form-inline';
            editFormEl.innerHTML = ``;
            editFormEl.innerHTML = `
           <form class="form-inline" id="edit-form">
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Название ссылки" id="edit-link-name">
                </div>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Теги в формете #tag" id="edit-link-tag">
                </div>
                <div class="form-group mb-2">
                    <input type="text" class="form-control" placeholder="Ссылка" id="edit-link">
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
                editFormEl.appendChild(editSaveButtonEl);
                editSaveButtonEl.addEventListener('submit', (evt) => {
                    console.log('bubbling');
                    console.log(evt);

                    console.log(evt.target.parentElement); // что угодно, от ul до его детей (на произвольную глубину)
                    let currentParent = evt.target.parentElement;
                    console.log(evt.currentTarget); // всегда будет ulEllet currentParent = evt.target.parentElement;
                    while (currentParent !== evt.currentTarget) {
                        currentParent = currentParent.parentElement;
                        console.log(currentParent);
                        rebuildTree(container, list);
                        console.log('rebuild');
                    }


                });
                // if (evt.target.getAttribute('id') === 'edit-item') { // guard
                //     // while (<expr> - truthy) { - пока верно, делаем то-то
                //     //   тело цикла
                //     // }
                //     // evt.currentTarget.removeChild(evt.target.currentParent);
                //
                //     let currentParent = evt.target.parentElement;
                //     while (currentParent.parentElement !== evt.currentTarget) {
                //         currentParent = currentParent.parentElement;
                //     }
                // }
            });

            liEl.appendChild(editFormEl);


        });
        const checkboxEl = liEl.querySelector('#i-checkbox');
        checkboxEl.addEventListener('change', (evt) => {
            linkList.changeLocation(item);
            console.log(item);
            // rebuildTree(container, list);
            // rebuildReadTree(readLinksListEl, linkList);
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

//TODO: доделать
// rebuildReadTree(readLinksListEl, linkList);
// function rebuildReadTree(container, list) {
//     container.innerHTML = '';
//
//     for (const item of list.items)
//         if (item.location === true) {
//             const liEl = document.createElement('li');
//             liEl.className = 'list-group-item col-10';
//             let tagsHTML = '';
//             for (const tag of item.tag) {
//                 tagsHTML += `<span data-id="text1" class="badge badge-success"><h6>#${tag}</h6></span>`;
//                 tagsHTML += `  `
//             }
//
//             liEl.innerHTML = `
//             <input type="checkbox" id="i-checkbox">
//             <a href="${item.link}"><span data-id="text" class="badge badge-info"><h6>${item.name}</h6></span></a>
//             ${tagsHTML}
//             <button data-id="remove" class="btn btn-danger btn-sm float-right">Удалить</button>
//         `;
//
//             const checkboxEl = liEl.querySelector('#i-checkbox');
//             checkboxEl.addEventListener('change', (evt) => {
//                 linkList.changeLocation(item);
//                 console.log(item);
//
//                 rebuildReadTree(readLinksListEl, linkList);
//                 rebuildTree(container, list);
//             });
//
//             const removeEl = liEl.querySelector('[data-id=remove]');
//             removeEl.addEventListener('click', (evt) => {
//                 linkList.remove(item);
//                 rebuildReadTree(container, list);
//
//             });
//             container.appendChild(liEl);
//
//         }
// }

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
