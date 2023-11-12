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
//Run the initial function
init()
