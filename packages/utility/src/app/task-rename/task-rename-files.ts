import { RootGroup, TargetGroup } from "../../app-types";
import { appOptions, notes } from "../app-env";
import { color, filterFilesByDomain } from "../../utils";
import { step1_LoadManifests } from "../task-common";
import path from "path";

function getAutoName(prefix: string): { prefix: string; ourAutoNmae: boolean; ending: string; } {
    const mOur = prefix.match(/^([\s\S]*)___([\s\S]*)/); //TODO: place it anywhere
    return {
        prefix: mOur ? mOur[1] : prefix,
        ending: mOur ? mOur[2] : '',
        ourAutoNmae: !!mOur,
    };
}

type RenamePair = { //TODO: check length root + dir + new name < 255
    oldName: string;
    newName: string;
};

function processRootGroup(rootGroup: RootGroup, addOrRemove: boolean) {
    const targetGroup = step1_LoadManifests(rootGroup);
    filterFilesByDomain(targetGroup, appOptions.domain);

    const renamePairs = [];

    targetGroup.files.forEach((fileMeta) => {
        const dirname = path.dirname(fileMeta.short);
        const filename = path.basename(fileMeta.short);
        //console.log(`    dir: ${dirname} filename: ${filename}`);

        const m = filename.match(/(.*)({[a-zA-Z0-9]{8,8}-[a-zA-Z0-9]{4,4}-[a-zA-Z0-9]{4,4}-[a-zA-Z0-9]{4,4}-[a-zA-Z0-9]{12,12}})(.*)\.dpm/);
        if (m) {
            const [, prefixRaw, name, suffix] = m;

            const domain = fileMeta.urls?.[0].oParts?.domain || '';
            if (!domain) {
                console.log(color.yellow(`${filename} not a website`));
                return;
            }

            const { prefix, ourAutoNmae: isAuto } = getAutoName(prefixRaw);

            console.log(`url: ${domain}___${name}${suffix}.dpm was: ${isAuto ? '___' : '   '} auto:'${prefix}' a:'${prefixRaw}'`); //TODO: 'C\\{63b8feef-c560-4777-b26a-70413303c096}.dpm', // path.basename
            // console.log(`b: ${name} c:'${suffix}' ${isAuto ? '___' : '   '} auto:'${prefix}' url: ${domain} a:'${prefixRaw}'`); //TODO: 'C\\{63b8feef-c560-4777-b26a-70413303c096}.dpm', // path.basename

            if (addOrRemove) {

            } else {

            }
        } else {
            console.log(color.red(`no match ${fileMeta.short}`));
        }
    });
}

export function executeTaskRename(rootGroups: RootGroup[], addOrRemove: boolean) {
    //throw new Error('Not implemented yet');
    rootGroups.forEach((rootGroup) => processRootGroup(rootGroup, addOrRemove));
    notes.add(`All done`);
}
