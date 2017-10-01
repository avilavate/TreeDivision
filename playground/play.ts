import { divide, getNextPartitions } from '../infra/math';
import * as d3 from 'd3';

export class PlayGround {
    constructor(private noOfProfiles: number) {

        divide(this.noOfProfiles)
    }
    getNumberofGroups = () => {
        if (this.noOfProfiles == 0 || this.noOfProfiles == 1) return this.noOfProfiles;
        else {
            let groupPartitions = getNextPartitions(this.noOfProfiles);
            try {
                groupPartitions.partitions.forEach(partition => {
                    this.render(partition);
                });
            } catch (e) {
                console.log("Can't render: " + e);
            }
        }
    }

    private render = (groupPartition: number = 0) => {
        console.log(groupPartition);
        var circle = d3.select("body").append("svg");
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
