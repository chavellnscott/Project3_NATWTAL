// Creating the map object
var myMap = L.map("map", {
    center: [0,0],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
d3.json('countries.geojson').then(d=> {
    let features = d.features
    features.forEach(feature_data => {
        let country_properties = feature_data.properties
        let countryName = country_properties.ADMIN.toLowerCase()
        let country_new_data = data.filter(d=> d.country.toLowerCase() == countryName)[0]
        if (country_new_data) {
            country_properties['costofliving']=country_new_data.costofliving
            Object.entries(country_new_data).forEach( ([k,v]) => {
                country_properties[k] = v
                
            })
        }
    });
    doTheThing(d)
})
function doTheThing(d) {
    let myGeoJson =L.geoJson(d, {
        style: () =>{
            return {
                weight: 2,
                opacity: 1,
                fillColor: 'green',
                color: 'black',
                fillOpacity: 1
            };
     
    },
        onEachFeature: function (feature,layer){
            let country = feature.properties.ADMIN;
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
                layer.on({mouseover: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'lightgreen'});
                }})
                layer.on({mouseout: event =>{
                    let currentLayer = event.target
                    currentLayer.setStyle({fillColor: 'green'});
                }})
            }
            else{
                layer.bindPopup(`<h3>${country}</h3>`)
            }
    }})
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
    myGeoJson.addTo(myMap);
    
}
function updateLeaflet(){
    
    let languageInput = d3.select('#selLanguage2')
    let currentLanguage = languageInput.property("value").toLowerCase();
    console.log(currentLanguage)
    d3.json('countries.geojson').then(d=> {
        let features = d.features
        features.forEach(feature_data => {
            let country_properties = feature_data.properties
            let countryName = country_properties.ADMIN.toLowerCase()
            let country_new_data = data.filter(d=> d.country.toLowerCase() == countryName)[0]
            if (country_new_data) {
                country_properties['costofliving']=country_new_data.costofliving
                Object.entries(country_new_data).forEach( ([k,v]) => {
                    country_properties[k] = v
                    
                })
            }
            language = country_properties.officiallanguage
            
    })
    let myGeoJson =L.geoJson(d, {
            style: () =>{
                return {
                    weight: 2,
                    opacity: 1,
                    fillColor: 'gray',
                    color: 'black',
                    fillOpacity: 1
                };
         
        },
        onEachFeature: function (feature,layer){
            let country = feature.properties.ADMIN;
            if(feature.properties.officiallanguage){
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
                    layer.on({mouseover: event =>{
                        let currentLayer = event.target
                        currentLayer.setStyle({fillColor: 'lightgreen'});
                    }})
                    layer.on({mouseout: event =>{
                        let currentLayer = event.target
                        currentLayer.setStyle({fillColor: 'green'});
                    }})
                }
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
            else{
                layer.bindPopup(`<h3>${country}</h3>`)
            }
    }})
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
        myGeoJson.addTo(myMap);
        });
        
        
}
