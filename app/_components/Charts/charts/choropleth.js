import * as d3 from 'd3';
import * as topojson from 'topojson';

const colorSchemes = {
    'cold': d3.interpolateBlues,
    'hot': d3.interpolateReds
}

export default class Choropleth {
    constructor(id, data, options){
        this.elementId = id;
        this.data = data;
        this.options = options;
        this.usMap = options.topoData;

        this.setColorScale();
        this.setGeoData();
        this.initialSetup();
    }

    setColorScale(){
        const range = d3.extent(this.data.values(), d => d.temp);
        const colorScheme = colorSchemes[this.options.color];
        const orientation = this.options.scaleReversed ? range.reverse() : range;

        this.color = d3.scaleSequential(orientation, colorScheme);
    }

    setTopoJSON(){
        if (this.options.level.name == 'places') {
            return topojson.feature(this.usMap, this.usMap.objects.simple_geojson)
        } else {
            return topojson.feature(this.usMap, this.usMap.objects.counties)
        }
    }

    setGeoData(){
        this.featureIds = Object.keys(this.data);
        this.places = this.setTopoJSON();
        if (this.options.level.name == 'places') {
            this.placemesh = topojson.mesh(this.usMap, this.usMap.objects.simple_geojson, (a, b) => a !== b)
        }
    }

    initialSetup(){
        this.setSVG();
        this.generateTooltip();
        this.draw();
    }

    setFullScreen(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = width / height;

        console.log(ratio, 'ratio');

        const parent = d3.select(".svg-container");

        this.svg.attr('height', `${width}px`);
        this.svg.attr('width',  `${height}px`);
        this.svg.attr('transform', `translate(-${height/4}, ${width / 2})rotate(90)`)

        this.svg.attr('class', 'full-screen-svg');
    }

    setSVG(){
        this.container = d3.select(this.elementId);
        this.container.selectAll("*").remove();
        this.svg = this.container.append("svg")
        this.svg.attr('viewBox', "0 0 960 880");
        this.svg.attr("preserveAspectRatio", "xMinYMin meet");

        this.width = this.svg.attr('width')
        this.height = this.svg.attr('height')
    }

    setPathFeature(){
        if (this.options.level.name == 'places') {
            this.projection = d3.geoAlbersUsa().fitSize([960, 600], this.places);
            this.path = d3.geoPath().projection(this.projection);        
        } else {
            this.path = d3.geoPath(); 
        }
    }

    setPlacesEntityLines(){
        this.entityLines.attr("class", "places")
            .selectAll("path")
            .data(this.places.features)
            .enter()
            .append("path")
            .attr("d", this.path)
            .attr('fill',(d) => this.coloringFxn(d))
            .attr('stroke', (d) => this.coloringFxn(d))
            .on("mouseover", (d) => this.mouseover(d))
            .on("mouseout", (d) => this.mouseout(d));
    }

    setCountyEntityLines(){
        this.entityLines.attr("class", "counties")
            .selectAll("path")
            .data(this.places.features)
            .enter()
            .append("path")
            .attr("d", this.path)
            .attr('fill', (d) => this.coloringFxn(d))
            .attr('stroke', "gray")
            .on("mouseover", (d) => this.mouseover(d))
            .on("mouseout", (d) => this.mouseout(d));
    }

    draw(){
        this.setPathFeature(); 
        this.g = this.svg.append('g');
        this.width = this.options.containerRef.current.offsetWidth;

        
        this.options.fullScreen && this.setFullScreen();

        this.g.attr("transform", `translate(0, 0)scale(0.9)`);

        this.entityLines = this.g.append("g")

        if (this.options.level.name == 'places') {
            this.setPlacesEntityLines();
        } else {
            this.setCountyEntityLines();
        }

        this.setZoom();

    }

    coloringFxn(d){
        const value = this.data.get(d.id);

        if(value?.temp){
            return this.color(value.temp);
        } else {
            return 'lightgray';
        }
    }

    generateTooltip(){
        this.tooltip = this.container.append('div');

        this.tooltip.attr('class', 'tooltip hide');

        this.setTootlipHandlers();
    }

    setHighestKeyword(keyword){
        if (keyword == undefined) {
            return 'Not Available';
        }

        if (this.options.level.name == 'places') {
            return keyword;
        } else {
            let max;

            Object.keys(keyword).map((key) => {
                if (max == undefined) {
                    max = key;
                } else if(keyword[key] > keyword[max]){
                    max = key;
                }
            });

            return max;
        }
    }

    setTootlipHandlers(){
        this.mouseover = (d) => {
            this.tooltip.attr('class', 'tooltip show');

            const vals = this.data.get(d.target.__data__.id);
            const dataTarget = vals?.temp;
            const placeName = d.target.__data__?.properties?.name;
            const keyword = this.setHighestKeyword(vals?.keyword);

            const value = dataTarget ? Math.round(dataTarget * 100) / 100 : "No data available" 

            this.tooltip.html(`<div><p>Name: ${placeName}</p><p>Value: ${value}</p><p> Keyword: ${keyword}</p></div>`)
                .style("left", (d.pageX - 50) + "px")
                .style("top", (d.pageY - 200) + "px")
        }

        this.mouseout = (d) => {
            this.tooltip.attr('class', 'tooltip hide');
        }
    }

    setZoom(){
        let transform;

        const zoom = d3.zoom().on("zoom", e => {
          this.g.attr("transform", (transform = e.transform));
        });

        this.svg.call(zoom)
            .call(zoom.transform, d3.zoomIdentity);
    }

    
}