// rework of https://gist.github.com/alojzije/11127839 by yolona-oss
import { RandomString } from 'helpers/Random'

function drawPath(svg: JQuery<SVGElement>, path: JQuery<HTMLElement/*SVGPathElement*/>, startX: number, startY: number, endX: number, endY: number) {
        function signum(x: number) {
                return (x < 0) ? -1 : 1;
        }

        function absolute(x: number) {
                return (x < 0) ? -x : x;
        }

        // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
        let stroke: number
        if (typeof path.attr("stroke-width") == "string") {
                stroke = parseFloat(path.attr("stroke-width") as string)
        } else {
                stroke = 10
        }
        // check if the svg is big enough to draw the path, if not, set heigh/width
        if (Number(svg.attr("height")) <  endY) {
                console.log("setting new height", endY)
                svg.attr("height", endY);
        }
        if (Number(svg.attr("width" )) < (startX + stroke)) {
                console.log("setting new width", (startX + stroke))
                svg.attr("width", (startX + stroke));
        }
        if (Number(svg.attr("width" )) < (endX   + stroke)) {
                console.log("setting new width", (endX   + stroke))
                svg.attr("width", (endX   + stroke));
        }

        let deltaX = (endX - startX) * 0.15;
        let deltaY = (endY - startY) * 0.15;
        // for further calculations which ever is the shortest distance
        let delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

        // set sweep-flag (counter/clock-wise)
        // if start element is closer to the left edge,
        // draw the first arc counter-clockwise, and the second one clock-wise
        let arc1 = 0; let arc2 = 1;
        if (startX > endX) {
                arc1 = 1;
                arc2 = 0;
        }
        // draw tha pipe-like path
        // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
        path.attr("d",  "M"  + startX + " " + startY +
                " V" + (startY + delta) +
                " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                " H" + (endX - delta*signum(deltaX)) + 
                " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                " V" + endY );
}

interface ConnectionProp {
        width: string
        color: string
}

interface Connection {
        startEl: JQuery<Element>
        endEl: JQuery<Element>
        pathId: string
}

export default class LineDrawer {
        private svg: JQuery<SVGElement>
        private connections: Connection[]

        constructor(private container: JQuery<Element>) {
                // @ts-ignore
                this.svg = $('<svg width="0" height="0"></svg>') as JQuery<SVGElement>
                $(container).append(this.svg)
                this.connections = new Array()

                window.addEventListener("resize", () => {
                        // reset svg each time 
                        $(this.svg).attr("height", "0");
                        $(this.svg).attr("width", "0");
                        this.connections.forEach(c => {
                                this.drawConnection(c)
                        })
                })
        }

        createConnection(startEl: JQuery<Element>, endEl: JQuery<Element>, props: ConnectionProp) {
                const id = "path"+RandomString(5)
                this.svg.append(`<path
id="${id}"
d="M0 0"
stroke="${props.color}"
fill="none"
stroke-width="${props.width}"
style="stroke: ${props.color}; fill: none; stroke-width: ${props.width};"></path>`
                )

                const connection = {
                        startEl,
                        endEl,
                        pathId: id
                }

                this.connections.push(connection)
                this.drawConnection(connection)

                return this
        }

        private drawConnection(props: Connection) {
                let startElem = props.startEl
                let endElem = props.endEl
                // if first element is lower than the second, swap!
                if (startElem.offset()!.top > endElem.offset()!.top){
                        let temp = startElem;
                        startElem = endElem;
                        endElem = temp;
                }

                // get (top, left) corner coordinates of the svg container   
                let svgTop  = this.container.offset()!.top;
                let svgLeft = this.container.offset()!.left;

                // get (top, left) coordinates for the two elements
                let startCoord = startElem.offset();
                let endCoord   = endElem.offset();

                // calculate path's start (x,y)  coords
                // we want the x coordinate to visually result in the element's mid point
                let startX = startCoord!.left + 0.5*Number(startElem.outerWidth()) - svgLeft;    // x = left offset + 0.5*width - svg's left offset
                let startY = startCoord!.top  + Number(startElem.outerHeight()) - svgTop;        // y = top offset + height - svg's top offset

                // calculate path's end (x,y) coords
                let endX = endCoord!.left + 0.5*Number(endElem.outerWidth()) - svgLeft;
                let endY = endCoord!.top - svgTop;

                console.log(`start {${startX}, ${startY}} end {${endX}, ${endY}}`)

                drawPath(this.svg, $("#"+props.pathId), startX, startY, endX, endY);
        }
}
