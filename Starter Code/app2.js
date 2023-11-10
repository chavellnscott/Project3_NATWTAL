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
                color: 'green',
                fillOpacity: 0.3
            };
     
    },
        onEachFeature: function (feature,layer){
            let country = feature.properties.ADMIN;
            
            layer.bindPopup(`<h3>${country}</h3><ol>Cost of living: ${feature.properties.costofliving}</ol>
            <ol>Peace Index: ${feature.properties.peaceindex}</ol>
            <ol>Official Language(s): ${feature.properties.officiallanguage}</ol>
            <ol>Peace Rank(s): ${feature.properties.peacerank}</ol>
            <ol>Population Rank(s): ${feature.properties.populationrank}</ol>
            <ol>Population(s): ${feature.properties.population}</ol>
            <ol>Population Density(s): ${feature.properties.populationdensity}</ol>`, {
                maxWidth: 550,
            })
    
    }})
    myGeoJson.addTo(myMap);
    
}
function updateLeaflet(){
    let currentLanguage = languageInput.property("value");
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
        let myGeoJson =L.geoJson(d, {
            style: () =>{
                return {
                    weight: 2,
                    opacity: 1,
                    color: 'blue',
                    fillOpacity: 0.3
                };
         
        },
            onEachFeature: function (feature,layer){
                let country = feature.properties.ADMIN;
                
                layer.bindPopup(`<h3>${country}</h3><ol>Cost of living: ${feature.properties.costofliving}</ol>
                <ol>Peace Index: ${feature.properties.peaceindex}</ol>
                <ol>Official Language(s): ${feature.properties.officiallanguage}</ol>
                <ol>Peace Rank(s): ${feature.properties.peacerank}</ol>
                <ol>Population Rank(s): ${feature.properties.populationrank}</ol>
                <ol>Population(s): ${feature.properties.population}</ol>
                <ol>Population Density(s): ${feature.properties.populationdensity}</ol>`, {
                    maxWidth: 550,
                })
        
        }})
        myGeoJson.addTo(myMap);
    })
}