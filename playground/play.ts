import { divide, getNextPartitions } from '../infra/math';
import * as d3 from 'd3';
import { IZoomView, IZoomViewPartitions } from '../infra/types';

export class PlayGround {
    public static intermediateZoomedProfiles: IZoomView = { partition: [0], zoomLevel: 0 };
    constructor(public noOfProfiles: number) {
    }
    getParts=(part:number):IZoomViewPartitions=>{
      return  getNextPartitions(part);
    }
    getNumberofGroups = () => {
        d3.select("svg").remove();
        if (this.noOfProfiles == 0 || this.noOfProfiles == 1) {
            if (PlayGround.intermediateZoomedProfiles.zoomLevel === 0) {
                PlayGround.intermediateZoomedProfiles.zoomLevel = PlayGround.intermediateZoomedProfiles.zoomLevel + 1;
                PlayGround.intermediateZoomedProfiles.partition = [this.noOfProfiles];
            }
            return PlayGround.intermediateZoomedProfiles.partition;
        }
        else {
            let groupPartitions = getNextPartitions(this.noOfProfiles);
            PlayGround.intermediateZoomedProfiles = {
                partition: groupPartitions.partitions,
                zoomLevel: PlayGround.intermediateZoomedProfiles.zoomLevel + 1
            }

            try {
                groupPartitions.partitions.forEach(partition => {
                    this.render(partition);
                });
            } catch (e) {
                console.log("Can't render: " + e);
            }
        }
    }

    public render = (groupPartition: number = 0) => {
        console.log(groupPartition);
        let circle = d3.select("div").append("svg");
        circle.append("circle")
            .attr("cx", 65)
            .attr("cy", 65)
            .attr("r", 30)
            .attr('fill', 'none')
            .attr('stroke', '#008080')
        circle.append('text')
            .attr('x', 65)
            .attr('y', 65)
            //  .attr('dx', 65)
            .text(groupPartition.toString());
    }
}
