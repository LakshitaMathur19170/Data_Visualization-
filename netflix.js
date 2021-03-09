async function getSheet(){
    const xlabels=[];
    const ylabels=[];
    const sheet1 = await fetch("database/Netflix-data.csv");
    const data = await sheet1.text();
    const row =data.split('\n');
    row.forEach(element => {
        const row =element.split(',');
        xlabels.push(row[0]);
        ylabels.push(row[1]);
    });
    return {xlabels,ylabels};
 }
    async function createGraph(){
        const data=await getSheet();
        const ctx = document.getElementById('Netflix').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.xlabels,
                datasets: [{
                    label: 'Netflix users (paying subscribers) by quarter',
                    data: data.ylabels,
                    fill: false,
                    backgroundColor:'#cd5d7d',
                    borderColor:'#cd5d7d',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function(value, index, values) {
                                return value+"million";
                            }
                        }
                    }]
                }
            }
        }); 
}
createGraph();
