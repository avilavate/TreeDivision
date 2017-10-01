import { divide } from '../infra/math';
import * as d3 from 'd3';

export class PlayGround {
    constructor(private noOfProfiles: number) { }
    render=()=>{
        var circle = d3.select("body").append("svg");
        circle.append("circle")
            .attr("cx", 65)
            .attr("cy", 65)
            .attr("r", 30)
            .attr('fill', 'none')
            .attr('stroke', '#008080')
          //  .attr('class', 'ourmission')
        circle.append('text')
            .attr('x', 65)
            .attr('y', 65)
            //  .attr('dx', 65)
            .text(this.noOfProfiles.toString());
    }
}
