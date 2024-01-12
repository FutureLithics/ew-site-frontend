import * as d3 from "d3";

const formatTime = d3.utcFormat("%b, %Y");

export default class Line {
  constructor(id, data, options) {
    this.elementId = id;
    this.data = data;
    this.options = options;

    this.dimensions = {
      x: 960,
      y: 240,
    };

    this.margins = {
      left: 60,
      right: 60,
      top: 60,
      bottom: 60,
    };

    this.initialSetup();
  }

  initialSetup() {
    this.setSVG();
    this.setAxes();
    this.draw();
  }

  setSVG() {
    this.container = d3.select(this.elementId);
    this.container.selectAll("*").remove();
    this.svg = this.container.append("svg");
    this.svg.attr("viewBox", `0 0 ${this.dimensions.x} ${this.dimensions.y}`);
    this.svg.attr("preserveAspectRatio", "xMinYMin meet");

    this.mainGroup = this.svg.append("g");

    this.width = this.svg.attr("width");
    this.height = this.svg.attr("height");
  }

  setXTicks(maxY) {
    const array = [0, 1, 2, 3, 4, 5];
    let int = maxY <= 1 ? (maxY * 100) / 5 : maxY / 5;

    return array.map((d) => {
      return maxY <= 1 ? Math.floor(d * int) / 100 : Math.floor(d * int);
    });
  }

  setAxes() {
    this.scaleX = d3
      .scaleTime()
      .domain(d3.extent(this.data, (d) => d.x))
      .range([this.margins.left, this.dimensions.x - this.margins.left]);

    const maxY = d3.max(this.data, (d) => d.y);

    this.scaleY = d3
      .scaleLinear()
      .domain([0, maxY + maxY / 5])
      .range([this.dimensions.y - this.margins.top, this.margins.top]);

    this.axisX = d3.axisBottom(this.scaleX).ticks(0);
    //.tickFormat(d3.timeFormat("%B"));

    this.axisY = d3.axisLeft(this.scaleY).tickValues(this.setXTicks(maxY));

    this.bottomAxis = this.mainGroup
      .append("g")
      .attr("class", "text-secondary")
      .attr(
        "transform",
        `translate(${0}, ${this.dimensions.y - this.margins.left})`,
      );

    this.leftAxis = this.mainGroup
      .append("g")
      .attr("class", "text-secondary")
      .attr("transform", `translate(${this.margins.left}, 0)`)
      .call(this.axisY);

    this.bottomAxis.call(this.axisX);

    this.mainGroup
      .append("g")
      .attr(
        "transform",
        `translate(${this.dimensions.x / 3}, ${this.dimensions.y - 10})`,
      )
      .append("text")
      .attr("text-anchor", "start")
      .text(() => {
        if (this.options.xLabel) {
          return this.options.xLabel;
        }
      });

    d3.selectAll(".text-secondary .domain").style("stroke", "darkgray");
  }

  draw() {
    const line = d3
      .line()
      .x((d) => this.scaleX(d.x))
      .y((d) => this.scaleY(d.y));

    this.linesGroup = this.mainGroup.append("g");

    this.lines = this.linesGroup
      .append("path")
      .attr("d", line(this.data))
      .attr("class", "chart-lines")
      .attr("stroke", "lightgreen")
      .attr("fill", "none")
      .attr("stroke-width", 3);

    this.verticalLine = this.linesGroup
      .append("line")
      .attr("stroke-width", 4)
      .attr("stroke", "skyblue")
      .style("opacity", 0.75)
      .attr("x1", () => this.scaleX(this.options.date))
      .attr("x2", () => this.scaleX(this.options.date))
      .attr("y2", this.scaleY.range()[1])
      .attr("y1", () => this.scaleY.range()[0]);

    this.setAnnotation(this.options.date, this.options.initialValue);
  }

  updateDate(date, value) {
    this.verticalLine.remove();

    this.verticalLine = this.linesGroup
      .append("line")
      .attr("stroke-width", 4)
      .attr("stroke", "skyblue")
      .style("opacity", 0.75)
      .attr("x1", () => this.scaleX(date))
      .attr("x2", () => this.scaleX(date))
      .attr("y2", this.scaleY.range()[1])
      .attr("y1", () => this.scaleY.range()[0]);

    this.setAnnotation(date, value);
  }

  setAnnotation(date, value) {
    if (this.annotation) {
      this.annotation.remove();
    }

    this.annotation = this.linesGroup
      .append("foreignObject")
      .attr("x", () => this.scaleX(date) - 60)
      .attr("y", () => this.scaleY.range()[1] - 55)
      .attr("width", "120px")
      .attr("height", "55px")
      .attr("class", "line-chart-annotation")
      .attr("viewBox", `0 0 ${150} ${55}`)
      .attr("preserveAspectRatio", "xMinYMin meet");

    this.annotation.append("xhtml:div").html(`<p>${formatTime(date)}</p>`);

    this.annotation
      .append("xhtml:div")
      .html(`<p><strong>Value: </strong>${value}</p>`);
  }
}
