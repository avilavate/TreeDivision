import { PlayGround } from './play'
import * as d3 from 'd3';
import { IZoomViewPartitions } from '../infra/types';

export function Reset() {
    window.location.href = window.location.href;
}

export function DrawProfile() {

    let parseElement = <HTMLInputElement>(document.getElementById("profiles"));
    let parseCheck = <HTMLInputElement>(document.getElementById("relative"));
    console.log(parseCheck.value);
    let profiles = !!parseElement ? parseInt(parseElement.value) : 0;
    let subsequentPartitions = [0];

    let objPlayGround = new PlayGround(profiles);

    d3.select("svg").remove();
    var myNode = document.getElementById("content");
    myNode.innerHTML = '';
    if (PlayGround.intermediateZoomedProfiles.zoomLevel === 0) {
        d3.select("svg").remove();
        let parts = objPlayGround.getParts(profiles);
        parts.partitions.forEach(p => {
            if (p !== 0)
                objPlayGround.render(p)
        });

        PlayGround.intermediateZoomedProfiles.partition = parts.partitions;
        PlayGround.intermediateZoomedProfiles.zoomLevel++;
        //subsequentPartitions = objPlayGround.getNumberofGroups();
    }
    else {
        d3.select("svg").remove();
        d3.select(".graph").selectAll("*").remove();
        var myNode = document.getElementById("content");
        myNode.innerHTML = '';
        console.log(PlayGround.intermediateZoomedProfiles);
        let zoomPartViews: IZoomViewPartitions[] = [];
        PlayGround.intermediateZoomedProfiles.partition.forEach(p => {
            if (p !== 0)
                zoomPartViews.push(objPlayGround.getParts(p));
        });
        PlayGround.intermediateZoomedProfiles.zoomLevel++;
        PlayGround.intermediateZoomedProfiles.partition = new Array<number>();
        d3.select("svg").remove();
        zoomPartViews.forEach(z => {
            z.partitions.forEach(a => {
                if (a !== 0)
                    PlayGround.intermediateZoomedProfiles.partition.push(a);
            })
        });
        d3.select("svg").remove();
        var myNode = document.getElementById("content");
        myNode.innerHTML = '';
        PlayGround.intermediateZoomedProfiles.partition.forEach(p => {
            if (p !== 0)
                objPlayGround.render(p);
        })
    }
}
