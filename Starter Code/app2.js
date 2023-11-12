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
                }
            }
            //Add popup for countries with no data
            else{
                layer.bindPopup(`<h3>${country}</h3>`)
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
