let worldTable = d3.select('#world-data')
let worldTableBody = worldTable.append('tbody')
let headers = []
let headerRow = d3.select("#world-data").select('thead').append('tr')
Object.keys(data[0]).forEach(key => {
    headerRow.append('th').text(key)
    if(key != 'country' & key != 'officiallanguage')
        headers.push(key)
})

data.forEach(element => {
    let newRow = worldTableBody.append('tr')
    Object.entries(element).forEach(([key,value]) => {
        newRow.append('td').text(value)
    })
})
let languageInput = d3.select("#selLanguage");
let dataDropdownMenu = d3.select('#selDataset')

headers.forEach(head => {
    currentData = dataDropdownMenu.append('option')
    currentData.text(head)
})

function init() {
    let countries = [] 
    let populations = []
    data.forEach(element =>{
        countries.push(element.country)
        populations.push(element.population)
    })
    let trace = {
        x: countries,
        y: populations,
        type: 'bar'
    }
    let layout = {
        title: 'Population of countries'
        };
    Plotly.newPlot('plot',[trace],layout)
}
d3.selectAll("#selLanguage").on("change", updatePlotly);
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    let currentLanguage = languageInput.property("value");
    let dataSet = dataDropdownMenu.property("value")
    let countries = []
    let peaceIndexs = []
    let costOfLivings = []
    let peaceRanks = []
    let populationRanks = []
    let populations = []
    let populationDensitys = []

    data.forEach(element => {
        let language = element.officiallanguage.toLowerCase()
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
        let tracePeaceIndex = {
            x: countries,
            y: peaceIndexs,
            type: 'bar'
        }
        let layoutPeaceIndex = {
            title: 'Peace Index of Countries That Speak ' + currentLanguage
            };

        let traceCostOfLiving = {
            x: countries,
            y: costOfLivings,
            type: 'bar'
        }
        let layoutCostOfLiving = {
            title: 'Cost Of Living of Countries That Speak ' + currentLanguage
            };

        let tracePeaceRank = {
            x: countries,
            y: peaceRanks,
            type: 'bar'
        }
        let layoutPeaceRank = {
            title: 'Peace Rank of Countries That Speak ' + currentLanguage
            };
        
        let tracePopulationRank = {
            x: countries,
            y: populationRanks,
            type: 'bar'
        }
        let layoutPopulationRank = {
            title: 'Population Rank of Countries That Speak ' + currentLanguage
            };

        let tracePopulation = {
            x: countries,
            y: populations,
            type: 'bar'
        }
        let layoutPopulation = {
            title: 'Population of Countries That Speak ' + currentLanguage
            };

        let tracePopulationDensity = {
            x: countries,
            y: populationDensitys,
            type: 'bar'
        }
        let layoutPopulationDensity = {
            title: 'Population Densitys of Countries That Speak ' + currentLanguage
            };
    
        if (dataSet == "costofliving"){
            plotData = [traceCostOfLiving]
            layout = layoutCostOfLiving
        }
        if (dataSet == "peaceindex"){
            plotData = [tracePeaceIndex]
            layout = layoutPeaceIndex
        }
        if (dataSet == "peacerank"){
            plotData = [tracePeaceRank]
            layout = layoutPeaceRank
        }
        if (dataSet == "populationrank"){
            plotData = [tracePopulationRank]
            layout = layoutPopulationRank
        }
        if (dataSet == "population"){
            plotData = [tracePopulation]
            layout = layoutPopulation
        }
        if (dataSet == "populationdensity"){
            plotData = [tracePopulationDensity]
            layout = layoutPopulationDensity
        }
        Plotly.newPlot('plot',plotData,layout)
    
        
}
init()
