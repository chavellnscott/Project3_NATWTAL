//Create a function to hide all elements
function hideAll() {
    d3.select("#table-tab").attr("style", "display:none")
    d3.select("#plot-tab").attr("style", "display:none")
   d3.select("#map-tab").attr("style", "display:none")
}
//Create a click event that will populate the table
d3.select("#table-tab-id").on("click", () => {
    hideAll()
    d3.select("#table-tab").attr("style", "display:block")
    d3.select("#home-tab").attr("style", "display:none")
})
//Create a click event that will populate the plot
d3.select("#plot-tab-id").on("click", () => {
    hideAll()
    d3.select("#plot-tab").attr("style", "display:block")
    d3.select("#home-tab").attr("style", "display:none")
})
//Create a click event that will populate the map
d3.select("#map-tab-id").on("click", () => {
    hideAll()
    d3.select("#map-tab").attr("style", "display:block")
    d3.select("#home-tab").attr("style", "display:none") 
})
//Create a click event that will bring you back to the home tab
d3.select("#home-tab-id").on("click", () => {
    hideAll()
    d3.select("#home-tab").attr("style", "display:block")

})
//--TABLE--
// Select the table by id
let worldTable = d3.select('#world-data')
// Create a tbody
let worldTableBody = worldTable.append('tbody')
// Create the header for the table
let headerRow = d3.select("#world-data").select('thead').append('tr')
// Fill in the table with data
data.forEach(element => {
    let newRow = worldTableBody.append('tr')
    Object.entries(element).forEach(([key,value]) => {
        newRow.append('td').text(value)
    })
})

//--PLOT--
//Create the input box and dropdown for the plot
let languageInput = d3.select("#selLanguage");
let dataDropdownMenu = d3.select('#selDataset')
//Create an empty list for the dropdown options
let dropDownOptions = []
//Add the headers for the table and append options to the dropdown options list
Object.keys(data[0]).forEach(key => {
    headerRow.append('th').text(key)
    if(key != 'country' & key != 'officiallanguage')
        dropDownOptions.push(key)
})
//Add options for the dropdown
dropDownOptions.forEach(head => {
    currentData = dataDropdownMenu.append('option')
    currentData.text(head)
})
//Create an initial funtion that will populate the plot
function init() {
    //Create empty lists for the x and y values for the plot
    let countries = [] 
    let populations = []
    //Grab the countries and population from our data and append to the empty lists
    data.forEach(element =>{
        countries.push(element.country)
        populations.push(element.population)
    })
    //Create the trace for the plot
    let trace = {
        x: countries,
        y: populations,
        type: 'bar'
    }
    //Create the layout for the plot
    let layout = {
        title: 'Population of countries'
        };
    //Create a new plot using the trace and layout we just created
    Plotly.newPlot('plot',[trace],layout)
}
//Select the dropdown and imput box
d3.selectAll("#selLanguage").on("change", updatePlotly);
d3.selectAll("#selDataset").on("change", updatePlotly);
//Create a function that will change the plot depending on the input box and the dropdown
function updatePlotly() {
    //Create a variable for the value of the input box and dropdown
    let currentLanguage = languageInput.property("value");
    let dataSet = dataDropdownMenu.property("value")
    //Create empty list for the x-axis values
    let countries = []
    //Create empty lists for potential y-axis values
    let peaceIndexs = []
    let costOfLivings = []
    let peaceRanks = []
    let populationRanks = []
    let populations = []
    let populationDensitys = []
    //Loop through the data and append to the lists
    data.forEach(element => {
        //Create a variable to hold the official language(s) of the current country
        let language = element.officiallanguage.toLowerCase()
        //Only append to list if currentLanguage is in language
        if (language.includes(currentLanguage.toLowerCase())){
            countries.push(element.country)
            peaceIndexs.push(element.peaceindex)
            costOfLivings.push(element.costofliving) 
            peaceRanks.push(element.peacerank)
            populationRanks.push(element.populationrank)
            populations.push(element.population)
            populationDensitys.push(element.populationdensity)
        }
    })
        //Create the trace and layout for each dropdown option
        //Peace index 
        let tracePeaceIndex = {
            x: countries,
            y: peaceIndexs,
            type: 'bar'
        }
        let layoutPeaceIndex = {
            title: 'Peace Index of Countries That Speak ' + currentLanguage
            };
        if (dataSet == "peaceindex"){
            plotData = [tracePeaceIndex]
            layout = layoutPeaceIndex
        }
        //Cost of living
        let traceCostOfLiving = {
            x: countries,
            y: costOfLivings,
            type: 'bar'
        }
        let layoutCostOfLiving = {
            title: 'Cost Of Living of Countries That Speak ' + currentLanguage
            };
        if (dataSet == "costofliving"){
            plotData = [traceCostOfLiving]
            layout = layoutCostOfLiving
        }
        //Peace rank
        let tracePeaceRank = {
            x: countries,
            y: peaceRanks,
            type: 'bar'
        }
        let layoutPeaceRank = {
            title: 'Peace Rank of Countries That Speak ' + currentLanguage
            };
        if (dataSet == "peacerank"){
            plotData = [tracePeaceRank]
            layout = layoutPeaceRank
        }
        //Population rank
        let tracePopulationRank = {
            x: countries,
            y: populationRanks,
            type: 'bar'
        }
        let layoutPopulationRank = {
            title: 'Population Rank of Countries That Speak ' + currentLanguage
            };
        if (dataSet == "populationrank"){
            plotData = [tracePopulationRank]
            layout = layoutPopulationRank
        }
        //Population
        let tracePopulation = {
            x: countries,
            y: populations,
            type: 'bar'
        }
        let layoutPopulation = {
            title: 'Population of Countries That Speak ' + currentLanguage
            };
        if (dataSet == "population"){
            plotData = [tracePopulation]
            layout = layoutPopulation
        }
        //Population density
        let tracePopulationDensity = {
            x: countries,
            y: populationDensitys,
            type: 'bar'
        }
        let layoutPopulationDensity = {
            title: 'Population Densitys of Countries That Speak ' + currentLanguage
            };
        if (dataSet == "populationdensity"){
            plotData = [tracePopulationDensity]
            layout = layoutPopulationDensity
        }
        //Create the plot depending of which condition was met
        Plotly.newPlot('plot',plotData,layout)
}
//--MAP--
// Creating the map object
var myMap = L.map("map", {
    center: [0,0],
    zoom: 2
  });
  
// Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);
//Use D3 to read the geojson file
d3.json('countries.geojson').then(d=> {
    //Create a variable for the features in the geojson
    let features = d.features
    //Loop through each feature
    features.forEach(feature_data => {
        //Create a variable for the properties in each feature
        let country_properties = feature_data.properties
        //Create a variable for the country name in each properties
        let countryName = country_properties.ADMIN.toLowerCase()
        //Filter the data to only look at countries that appear in both data sets (our data json file and the countries geojson file)
        let country_new_data = data.filter(d=> d.country.toLowerCase() == countryName)[0]
        //If the countries match
        if (country_new_data) {
            //Add new data to the geojson file from the data json file
            Object.entries(country_new_data).forEach( ([k,v]) => {
                country_properties[k] = v
            })
        }
    });
    //Run the function to populate the map
    doTheThing(d)
})
//Create a function to populate the map
function doTheThing(d) {
    //Create a variable to hold the geojson data for the layer
    let myGeoJson =L.geoJson(d, {
        //Create a style for the map
        style: () =>{
            return {
                weight: 2,
                opacity: 1,
                fillColor: 'green',
                color: 'black',
                fillOpacity: 1
            };
     
    },
        //Loop through each feature and create popup or change style for each feature(country)
        onEachFeature: function (feature,layer){
            //Create a variable for the current country
            let country = feature.properties.ADMIN;
            //Add popup if country has data
            if(feature.properties.officiallanguage){
                layer.bindPopup(`<h3>${country}</h3><ol>Cost of living: ${feature.properties.costofliving}</ol>
                <ol>Peace Index: ${feature.properties.peaceindex}</ol>
                <ol>Official Language(s): ${feature.properties.officiallanguage}</ol>
                <ol>Peace Rank: ${feature.properties.peacerank}</ol>
                <ol>Population Rank: ${feature.properties.populationrank}</ol>
                <ol>Population: ${feature.properties.population}</ol>
                <ol>Population Density: ${feature.properties.populationdensity}</ol>`, {
                    maxWidth: 550
                });
                //Change style if mouse is over the feature(country)
                layer.on({mouseover: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'lightgreen'});
                }})
                //Change the style back when mouse is not over the feature(country)
                layer.on({mouseout: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'green'});
                }})
            }
            //Add popup for countries with no data
            else{
                layer.bindPopup(`<h3>${country}</h3>`)
                //Change style if mouse is over the feature(country)
                layer.on({mouseover: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'lightgray'});
                }})
                //Change the style back when mouse is not over the feature(country)
                layer.on({mouseout: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'gray'});
                }})
            }
    }})
    //Change the style of countries with no data
    myGeoJson.setStyle(function (feature) {
        if (!feature.properties.officiallanguage){
                return{
                    weight: 2,
                    opacity: 1,
                    fillColor: 'gray',
                    color: 'black',
                    fillOpacity: 1
                }
            }
    })
    //Add everything to the map
    myGeoJson.addTo(myMap);
    
}
//Create a function to change the style of each feature when the input box is updated
function updateLeaflet(){
    //Select the input box for the map
    let languageInput = d3.select('#selLanguage2')
    //Create variable for the input box value
    let currentLanguage = languageInput.property("value").toLowerCase();
    //Use D3 to read the geojson file
    d3.json('countries.geojson').then(d=> {
        //Create a variable for the features in the geojson
        let features = d.features
        //Loop through each feature
        features.forEach(feature_data => {
            //Create a variable for the properties in each feature
            let country_properties = feature_data.properties
            //Create a variable for the country name in each properties
            let countryName = country_properties.ADMIN.toLowerCase()
            //Filter the data to only look at countries that appear in both data sets (our data json file and the countries geojson file)
            let country_new_data = data.filter(d=> d.country.toLowerCase() == countryName)[0]
            //If the countries match
            if (country_new_data) {
                //Add new data to the geojson file from the data json file
                Object.entries(country_new_data).forEach( ([k,v]) => {
                    country_properties[k] = v
                })
            }
            
            language = country_properties.officiallanguage
            
    })
    //Create a variable to hold the geojson data for the layer
    let myGeoJson =L.geoJson(d, {
            //Create a style for the map. Default style
            style: () =>{
                return {
                    weight: 2,
                    opacity: 1,
                    fillColor: 'gray',
                    color: 'black',
                    fillOpacity: 1
                };
         
        },
        //Loop through each feature and create popup or change style for each feature(country)
        onEachFeature: function (feature,layer){
            //Create a variable for the current country
            let country = feature.properties.ADMIN;
            //Add popup if country has data...
            if(feature.properties.officiallanguage){
                //and if the currentLanguage is an official language of the country
                if (feature.properties.officiallanguage.toLowerCase().includes(currentLanguage)){
                    layer.bindPopup(`<h3>${country}</h3><ol>Cost of living: ${feature.properties.costofliving}</ol>
                    <ol>Peace Index: ${feature.properties.peaceindex}</ol>
                    <ol>Official Language(s): ${feature.properties.officiallanguage}</ol>
                    <ol>Peace Rank: ${feature.properties.peacerank}</ol>
                    <ol>Population Rank: ${feature.properties.populationrank}</ol>
                    <ol>Population: ${feature.properties.population}</ol>
                    <ol>Population Density: ${feature.properties.populationdensity}</ol>`, {
                        maxWidth: 550
                    });
                    //Change style if mouse is over the feature(country)
                    layer.on({mouseover: event =>{
                        let currentLayer = event.target
                        currentLayer.setStyle({fillColor: 'lightgreen'});
                    }})
                    //Change the style back when mouse is not over the feature(country)
                    layer.on({mouseout: event =>{
                        let currentLayer = event.target
                        currentLayer.setStyle({fillColor: 'green'});
                    }})
                }
                //Add popup for countries that don't have currentLanguage as an official language
                else {
                    layer.bindPopup(`<h3>${country}</h3><ol>Cost of living: ${feature.properties.costofliving}</ol>
                    <ol>Peace Index: ${feature.properties.peaceindex}</ol>
                    <ol>Official Language(s): ${feature.properties.officiallanguage}</ol>
                    <ol>Peace Rank: ${feature.properties.peacerank}</ol>
                    <ol>Population Rank: ${feature.properties.populationrank}</ol>
                    <ol>Population: ${feature.properties.population}</ol>
                    <ol>Population Density: ${feature.properties.populationdensity}</ol>`, {
                        maxWidth: 550
                    });
                    //Change style if mouse is over the feature(country)
                layer.on({mouseover: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'lightgray'});
                }})
                //Change the style back when mouse is not over the feature(country)
                layer.on({mouseout: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'gray'});
                }})
                }
            }
            //Add popup for countries with no data
            else{
                layer.bindPopup(`<h3>${country}</h3>`)
                //Change style if mouse is over the feature(country)
                layer.on({mouseover: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'lightgray'});
                }})
                //Change the style back when mouse is not over the feature(country)
                layer.on({mouseout: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'gray'});
                }})
            }
    }})
        //Change the style of countries that have the currentLanguage as an official language
        myGeoJson.setStyle(function (feature) {
            if (feature.properties.officiallanguage){
                if (feature.properties.officiallanguage.toLowerCase().includes(currentLanguage)){
                    return{
                        weight: 2,
                        opacity: 1,
                        fillColor: 'green',
                        color: 'black',
                        fillOpacity: 1
                    }
                }
            }
        })
        //Add everything to the map
        myGeoJson.addTo(myMap);
        });
        
        
}
hideAll()
//Run the initial function
init()