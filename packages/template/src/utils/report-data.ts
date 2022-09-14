import { ItemDuplicate, ItemInputFile, Report, ReportRecords } from '@pmac/shared-types';

export { reports as reportData } from './test-data';

function getInputs(report: Report): Record<string, ItemInputFile> {
    const inputs = report.inputs?.input?.reduce<Record<string, ItemInputFile>>((acc, val) => {
        acc[val.id] = val;
        return acc;
    }, {});
    return inputs || {};
}

export type InputSameDcItem = {
    dup: ItemDuplicate;
    src: ItemInputFile;
};

export type FolderInputSameDcItem = {
    root: string;
    dcs: InputSameDcItem[];
};

function getSameDc(report: Report): InputSameDcItem[] {
    const inputs = getInputs(report);
    return report.domcreds?.multiple?.map((item) => ({ dup: item, src: inputs[item.id], } as InputSameDcItem)) || [];
}

export function folderInputSameDcItem(reportRecords: ReportRecords): FolderInputSameDcItem[] {
    return reportRecords.map((report) => {
        const sameDcItems = getSameDc(report);
        return {
            root: report.root,
            dcs: sameDcItems,
        };
    });
}

export type InputSameDcItemByDomains = Record<string, InputSameDcItem[]>; // domain -> manifest files

export function splitByDomains(items: InputSameDcItem[]): InputSameDcItemByDomains {
    const rv: InputSameDcItemByDomains = {};

    items.forEach((item) => {
        const domain = item.src.urls[0]?.domain;
        if (domain) {
            !rv[domain] && (rv[domain] = []);
            rv[domain].push(item);
        }
    });

    return rv;
}