import {PlayGround} from './play'

export function DrawProfile(noOfProfiles:number=10){
    let obhPlayGround=new PlayGround(noOfProfiles);
    obhPlayGround.render();
}