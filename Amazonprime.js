async function getSheet(){
    const xlabels=[];
    const ylabels=[];
    const sheet1 = await fetch("database/Amazonprime.csv");
    const data = await sheet1.text();
    const row =data.split('\n');
    row.forEach(element => {
        const row =element.split(',');
        const year=row[0];
        xlabels.push(year);
        const user=row[1];
        ylabels.push(user);
        console.log(year,user);
    });
    return {xlabels,ylabels};
}
async function createGraph(){
    const data=await getSheet();
    const ctx = document.getElementById('Amazonprime').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Amazon Prime Video Subscription',
                data: data.ylabels,
                fill: false,
                backgroundColor:'#ef4f4f',
                borderColor:'#ef4f4f',
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
