import {PlayGround} from './play'

export function DrawProfile(){
    let parseElement=<HTMLInputElement>(document.getElementById("profiles"));
    let profiles=parseInt(parseElement.value);
    let objPlayGround=new PlayGround(profiles);
    objPlayGround.getNumberofGroups(profiles);
}