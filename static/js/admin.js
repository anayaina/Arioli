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
        this.initpagination(this.items.length, this.numberOfEntries);

        const container = docuemnt.createElement('div');
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
        this.pagination.diff = this.paginations.noItemsPerPage - (this.pagination.total % this.pagination.noItemsPerPage);
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
    renderRows() {}
    renderPagesButtons() {}
    renderHeadersButtons() {}
    renderHeadersSearch() {}
    renderSelectEntries() {}

}