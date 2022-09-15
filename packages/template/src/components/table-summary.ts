import { folderInputSameDcItem, reportData } from "../utils/report-data";

function setupRowExpnaded(element: HTMLElement) {
    let expanded = false;

    function renderState() {
        element.innerHTML = `
        <div>login-name</div>
        <div>modified-text</div>

        <div>folder</div>
        <div>filename</div>
        
        ${!expanded ? '' : `
            <div class="py-2 text-xs">
                <div class="">{formName}</div>
                <div class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
                    <div class="text-xs">Prev URL:</div> <div class="text-red-700">{org}</div>
                    <div class="text-xs">New URL:</div> <div class="text-green-700">{mod}</div>
                </div>
            </div>

            <div class="py-2 text-xs">
                <div class="">{formName}</div>
                <div class="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2">
                    <div class="text-xs">Prev URL:</div> <div class="text-red-700">{org}</div>
                    <div class="text-xs">New URL:</div> <div class="text-green-700">{mod}</div>
                </div>
            </div>`
        }
        
    `;
    }

    renderState();
}

function setupRow(element: HTMLElement) {
    return `
        <div>login-name</div>
        <div>modified-text</div>
    `;
}

function setupTable(element: HTMLElement) {
    return;
}

export function createTable(element: HTMLElement) {
    const sameDcItems = folderInputSameDcItem(reportData);
    const flatItems = sameDcItems.map(({root, dcs}) => dcs).flat();

    const fragment = document.createDocumentFragment();

    flatItems.forEach((dcItem, idx) => {
        const el = document.createElement('div')
        el.innerHTML = `me ${idx}`;
        fragment.append(el);
    });

    element.append(fragment);
}
