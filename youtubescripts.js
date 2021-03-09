async function getSheet(){
    const xlabels=[];
    const ylabels=[];
    const sheet1 = await fetch("database/youtube.csv");
    const data = await sheet1.text();
    const row =data.split('\n');
    row.forEach(element => {
        const row =element.split(',');
        const year=row[0];
        xlabels.push(year);
        const user=row[1];
        ylabels.push(user);
    });
    return {xlabels, ylabels};
}
async function createGraph(){
    const data =await getSheet();
    const ctx = document.getElementById('Youtube').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'YouTube User and Usage Stats',
                data: data.ylabels,
                fill: false,
                backgroundColor:'#ff884b',
                borderColor:'#ff884b',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value+"billion";
                        }
                    }
                }]
            }
        }
    }); 
}
createGraph();
