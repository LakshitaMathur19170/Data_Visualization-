async function getSheet(){
    const xlabels=[];
    const ylabels=[];
    const sheet1 = await fetch("database/hulu.csv");
    const data = await sheet1.text();
    const row =data.split('\n');
    row.forEach(element => {
        const row =element.split(',');
        const year=row[0];
        xlabels.push(year);
        const user=row[1];
        ylabels.push(user);
    });
    return {xlabels,ylabels};
}
async function createGraph(){
    const data=await getSheet();
    const ctx = document.getElementById('Hulu').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Hulu Ad-Free Subscribers',
                data: data.ylabels,
                fill: false,
                backgroundColor:'#ffcda3',
                borderColor:'#ffcda3',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value+" million";
                        }
                    }
                }]
            }
        }
    }); 
}
createGraph();
