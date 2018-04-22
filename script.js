
const uiController = (function () {
    const DOMelem = {
        add: document.querySelector('.add_book'),
        container: document.querySelector('.form-container'),
        forms: document.querySelector('.form'),
        btnbook: document.querySelector('.books__list')
    };

    const conent = ()=>{

    }

    return{
        getInput: function () {
            return{
                name: document.querySelector('.add_name').value,
                author: document.querySelector('.add_author').value,
                date: document.querySelector('.add_date').value,
                url: document.querySelector('.url').value
            }
        },

        addNewBook: function (obj) {
            let html, newHtml, element, idn;;

            html = '<div class="book" id="book-%id%"><img class="book__image" src="%image%""/><div class="description"><div class="book__title">%title%</div><div class="book__author">%author%</div><div class="book__release">%release%</div></div><div class="book_button"><button class="edit--btn">Редактировать</button><button class="delete--btn">Удалить</button></div></div>';
            element = document.getElementsByClassName('books__list');
            if(element["0"].children.length>0){
                idn = element["0"].children.length;
            } else {
                idn = 0;
            }
            newHtml = html.replace('%id%', idn);
            newHtml = newHtml.replace('%image%', obj.url);
            newHtml = newHtml.replace('%title%', obj.name);
            newHtml = newHtml.replace('%author%', obj.author);
            newHtml = newHtml.replace('%release%', obj.date);
            document.querySelector('.books__list').insertAdjacentHTML('beforeend',newHtml);
        },
        deleteBook: function (select) {
            let el = document.querySelector('#'+select);
            el.parentNode.removeChild(el);
        },
        clearFields: function () {
            let fields;
            fields = document.querySelectorAll('.add_name'+','+'.add_author'+','+'.add_date'+','+'.url');
            fields.forEach(cur=>cur.value='');
        },
        closeEdit: function (ed) {
            let fields;
            ed.style.display = 'none';
            fields = document.querySelectorAll('.edit_name'+','+'.edit_author'+','+'.edit_date'+','+'.edit_url');
            fields.forEach(cur=>cur.value='');
        },
        getDomElem: function () {
            return DOMelem;
        }

    }
})();
const controller = (function (uiContr) {
    const setupEventListener = function () {
        const DOM = uiContr.getDomElem();
        DOM.add.addEventListener('click', cntrAddBtn);
        DOM.forms.cancel.addEventListener('click', cntrlCloseBtn);
        DOM.forms.save.addEventListener('click', contrSaveBtn);
        DOM.btnbook.addEventListener('click',contrBtnBook);
    };
    const cntrAddBtn = function () {

        uiContr.getDomElem().container.style.display = 'block';

    };
    const contrSaveBtn = function () {
        const
        // get input data
        input = uiContr.getInput();
        if(parseInt(input.date)<=2017){
            // add book to the uicontr
            uiContr.addNewBook(input);
            // clear the fields
            uiContr.clearFields();
            uiContr.getDomElem().container.style.display = 'none';
        } else {
            alert("Год выпуска должен быть не больше 2017");
        }

    }
    const cntrlCloseBtn = function () {
        uiContr.getDomElem().container.style.display = 'none';
    };
    const contrBtnBook = function (e) {
        let item, child, pic, des, title, author, realese, edit;

            item = e.target.parentNode.parentNode;
        if (e.target.className=== "delete--btn"){

            // delete from UI
            uiContr.deleteBook(item.id);
        } else if (e.target.className === "edit--btn"){
            // edit book
            edit = document.querySelector('.edit-container');
            child = item.children;
            pic = child[0].src;
            des = child[1].children;
            title = des[0].textContent;
            author = des[1].textContent;
            realese = des[2].textContent;
            document.querySelector('.edit_name').value = title;
            document.querySelector('.edit_author').value = author;
            document.querySelector('.edit_date').value = realese;
            document.querySelector('.edit_url').value = pic;
            edit.style.display = 'block';
            const clos = document.querySelector('.close_edit');
            const sav = document.querySelector('.save_edit');
            clos.onclick = () => {
                uiContr.closeEdit(edit);
            }

            sav.onclick = () => {
                if (parseInt(document.querySelector('.edit_date').value) <= 2017){
                    des[0].textContent = document.querySelector('.edit_name').value;
                    des[1].textContent = document.querySelector('.edit_author').value;
                    des[2].textContent = document.querySelector('.edit_date').value;
                    child[0].src = document.querySelector('.edit_url').value;
                    edit.style.display = 'none';
                } else {
                    alert("Год выпуска должен быть не больше 2017");
                }

            }
        }
    };
    return {
        init: function(){
            setupEventListener();
        }
    }
})(uiController);
controller.init();
