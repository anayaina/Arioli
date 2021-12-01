class DataTable {
    element;
    headers;
    items;
    copyItems;
    selected;
    pagination;
    numberOfEntries;
    headerButtons;

    constructor(selector, headerButtons) {
        this.element = document.querySelector(selector);

        this.headers = [];
        this.items = [];
        this.pagination = {
            total: 0,
            noItemsPerPage: 0,
            noPages: 0,
            actual: 0,
            pointer: 0,
            diff: 0,
            lastpagebeforedots: 0,
            nobuttonsbeforedots: 4
        }
        this.selected = [];
        this.numberentries = [];
        this.headerButtons = headerButtons;
    }

    parse() {
        const headers = [...this.element.querySelector('thead tr').children];
        const trs = [...this.element.querySelector('tbody').children];

        headers.forEach(element => {
            this.headers.push(element.textContent);
        });

        trs.forEach(tr => {
            const cells = [...tr.children];
            const item = {
                id: this.generateUUID(),
                values: []
            };
            cells.forEach(cell => {
                if (cell.children.length > 0) {
                    const status = [...cell.children][0].getAttribute('class');
                    if (status != null) {
                        item.values.push(`<span class='${status}'></span>`);
                    }
                } else {
                    item.values.push(cell.textContent);
                }
            });
            this.items.push(item);
        });
        console.log(this.items);

        this.makeTable();
    }

    makeTable() {
        this.copyItems = [...this.items];
        this.initPagination(this.items.length, this.numberOfEntries);

        const container = document.createElement('div');
        container.id = this.element.id;
        this.element.innerHTML = '';
        this.element.replaceWith(container);
        this.element = container;

        this.createHTML();
        this.renderHeaders();
        this.renderRows();
        this.renderPagesButtons();
        this.renderHeadersButtons();
        this.renderHeadersSearch();
        this.renderSelectEntries();
    }

    initPagination(total, entries) {
        this.pagination, total = total;
        this.pagination.noItemsPerPage = entries;
        this.pagination.noPages = Math.ceil(this.pagination.total / this.pagination.noItemsPerPage);
        this.pagination.actual = 1;
        this.pagination.pointer = 0;
        this.pagination.diff = this.pagination.noItemsPerPage - (this.pagination.total % this.pagination.noItemsPerPage);
    }

    generateUUID() {
        return (Date.now() * Math.floor(Math.random() * 100000)).toString();
    }

    createHTML() {
        this.element.innerHTML = `
        <div class = "datatable-container">
            <div class = "header-tools">
                <div class = "tools">
                    <ul class"header-buttons-container"></ul>
                </div>
            </div>
            <div class="search">
                <input type="text" class="search-input">
            </div>
        </div>
        <table class="databale">
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody>
            </body>
        </table>
        <div class="footer-tools">
            <div class="list-items">
                Mostar 
                <select name="n-enries" id="n-enries" class="n-enries"></select>
            </div>
            <div class="pages">
            </div>
        </div>
    </div> 
    `;
    }

    renderHeaders() {
        this.element.querySelector('thead tr').innerHTML = '';

        this.headers.forEach(header => {
            this.element.querySelector('thead tr').innerHTML = `<tr>${header}</tr>`;
        });
    }
    renderRows() {
        this.element.querySelector('tbody').innerHTML = '';

        let i = 0;
        const { pointer, total } = this.pagination;
        const limit = this.pagination.actual * this.pagination.noItemsPerPage;

        for (i = pointer; i < limit; i++) {
            if (i == total) break;

            const { id, values } = this.copyItems[i];
            const checked = this.isChecked(id);
            let data = '';

            data += `<td class="table-checkbox">
                        <input type="checkbox" class="datatable-checkbox" data-id="${id}" ${checked? "checked" : ""}</input>
                    </td>`;
            values.forEach(cell => {
                data += `<td>${cell}</td>`;
            });
            this.element.querySelector('tbody').innerHTML += `<tr>${data}</tr>`;
        }
    }
    isChecked() {
        const items = this.selected;
        let res = false;

        if (items.length == 0) return false;

        items.forEach(item => {
            if (item.id == id) res = true;
        });
        return res;
    }
    renderPagesButtons() {}
    renderHeadersButtons() {}
    renderHeadersSearch() {}
    renderSelectEntries() {}

}