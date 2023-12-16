import * as d3 from 'd3';
import * as topojson from 'topojson';
import topoMap from '../datasets/counties-albers-10m.json';

const colorSchemes = {
    'cold': d3.interpolateBlues,
    'hot': d3.interpolateReds
}

export default class Choropleth {
    constructor(id, data, options){
        this.elementId = id;
        this.data = data;
        this.options = options;
        this.usMap = topoMap;

        this.setColorScale();
        this.setGeoData();
        this.initialSetup();
    }

    setColorScale(){
        const range = d3.extent(this.data.values());
        const colorScheme = colorSchemes[this.options.color];

        this.color = d3.scaleSequential(range, colorScheme);
    }

    setGeoData(){
        this.featureIds = Object.keys(this.data);
        this.counties = topojson.feature(this.usMap, this.usMap.objects.counties)
        this.states = topojson.feature(this.usMap, this.usMap.objects.states)
        this.statemap = new Map(this.states.features.map(d => [d.id, d]))
        this.statemesh = topojson.mesh(this.usMap, this.usMap.objects.states, (a, b) => a !== b)
    }

    initialSetup(){
        this.setSVG();
        this.draw();
    }

    setSVG(){
        this.container = d3.select(this.elementId);
        this.container.selectAll("*").remove();
        this.svg = this.container.append("svg")
        this.svg.attr('viewBox', "0 0 960 600");
        this.svg.attr("preserveAspectRatio", "xMinYMin meet")
    }

    draw(){
        this.path = d3.geoPath(); 
        
        this.g = this.svg.append('g');
        this.width = this.options.containerRef.current.offsetWidth;

        console.log(this.width)

        this.g.attr("transform", `translate(${this.width / 10}, 0)scale(0.8)`);

        this.entityLines = this.g.append("g")
        this.mesh = this.g.append("g")

        this.entityLines.attr("class", "counties")
            .selectAll("path")
            .data(this.states.features)
            .enter()
            .append("path")
            .attr('fill', d => this.coloringFxn(d))
            .attr('stroke', 'gray')
            .attr("d", this.path);

    }

    coloringFxn(d){
        const value = this.data.get(d.id);

        if(value){
            return this.color(this.data.get(d.id));
        } else {
            return 'lightgray';
        }
    }

    
}