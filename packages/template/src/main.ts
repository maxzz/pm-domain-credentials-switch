import { Section1_Header } from './components/section1-header';
import { Section2_About } from './components/section2-about';
import { Section3_UpdatedFiles, toggleItems } from './components/section3-updated-files';
import { Section4_GeneralInfo, generalInfoClick } from './components/section4-general-info';
import { Section5_Footer } from './components/section5-footer';
import '../index.css';

function App() {
    return `
        <div class="h-full grid grid-rows-[auto_minmax(0,1fr)_auto] text-sky-800">
            ${Section1_Header()}
            <div class="mx-auto h-full grid grid-rows-[auto_1fr] overflow-y-auto">
                ${Section2_About()}
                <div>
                    <main id="report-table"></main>
                    <div class="pb-4 px-4 max-w-[80ch] animate-slide-down hidden" id="general-info">
                        ${Section4_GeneralInfo()}
                    </div>
                </div>
            </div>
            ${Section5_Footer()}
        </div>`;
}

function createAppFragment() {
    const fragment = document.createDocumentFragment();

    const appNew = document.createElement('div');
    appNew.id = 'app';
    appNew.innerHTML = App();
    fragment.append(appNew);

    Section3_UpdatedFiles(fragment.querySelector('#report-table')!);

    return fragment;
}

function addEventListeners(fragment: DocumentFragment, appState: AppState) {
    fragment.querySelector<HTMLButtonElement>('#toggle-all')!.addEventListener('click', (event: MouseEvent) => {
        appState.expanded = !appState.expanded;
        toggleItems({ setOpen: appState.expanded, justToggle: event.ctrlKey });
    });

    generalInfoClick(fragment.querySelector<HTMLButtonElement>('#toggle-general-info')!);
}

type AppState = {
    expanded: boolean;
}

function main() {
    const appState: AppState = {
        expanded: false,
    };
    const fragment = createAppFragment();
    addEventListeners(fragment, appState);
    document.querySelector<HTMLDivElement>('#app')!.replaceWith(fragment);

    if (process.env.NODE_ENV !== 'production') {
        document.querySelector<HTMLDivElement>('#app')!.classList.add('debug-screens');
        document.getElementById('toggle-general-info')?.click();
        //appState.expanded = true, toggleItems({ setOpen: true });
    }
}
main();

// <!-- <br /> ${Button({ id: "counter" })} -->
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

// function singleReport(single: Report) {
//     const isEmpty = !Object.keys(single).length; //TODO: !report.inputs?.input?.length && !report.domcreds?.multiple?.length;
//     return `
//         <div class="px-4 p-2 grid grid-cols-[1fr_minmax(100px,auto)_1fr]">
//             <div class="col-start-2">
//                 ${TableAllInputs(single?.inputs)}
//                 ${isEmpty ? Para({ text: 'There are no manifest files using domain credentials. Nothing changed' }) : ''}
//             </div>
//         </div>`;
// }
//
// function App() {
//     return `
//         <div class="flex-1 from-[#d6efff] to-[#d3e9ff] text-primary-900 debug-screens">
//             ${PageHeader()}
//             ${reportData.map((report) => singleReport(report)).join('')}
//             ${TableModified(reportData)}
//         </div>`;
// }

//TODO: new CLI swithces: add and remove domain file prefix
//TODO: sort by login name
