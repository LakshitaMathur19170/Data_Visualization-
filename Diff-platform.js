async function getSheet2(){
    const xlabels=[];
    const ylabels=[];
    const sheet1 = await fetch("database/Diff-platform.csv");
    const data = await sheet1.text();
    const row =data.split('\n');
    row.forEach(element => {
        const row =element.split(',');
        xlabels.push(row[0]);
        ylabels.push(row[1]);
    });
    return {xlabels,ylabels};
}
jQuery(async function createPie(){
    const data=await getSheet2();
    const ctx = document.getElementById('Platform').getContext('2d');
    var Platform = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Different platform',
                data: data.ylabels,
                fill: false,
                backgroundColor: [
                    '#cd5d7d',
                    '#ff884b',
                    '#ef4f4f',
                    '#ee9595',
                    '#ffcda3',
                    '#74c7b8'
                ]
            }]
        },
        options: {
           legend:{
               position:'bottom'
           }
        }
    });
    $("#Platform").click(
        function(event){
            var activepoints =Platform.getElementsAtEvent(event);
            console.log(activepoints);
            if(activepoints.length>0){
                var clickedIndex=activepoints[0]["_index"];
                var socialMedia=Platform.data.labels[clickedIndex];
                var users=Platform.data.datasets[0].data[clickedIndex];
                if(socialMedia.localeCompare("Netflix")==0){
                    window.scrollTo(950,260);
                }else if(socialMedia.localeCompare("YouTube")==0){
                    window.scrollTo(1000,260);
                }else if(socialMedia.localeCompare("Hulu")==0){
                    window.scrollTo(260,960);
                }else if(socialMedia.localeCompare("Amazon Prime")==0){
                    window.scrollTo(260,960);
                }else if(socialMedia.localeCompare("Disney Plus")==0){
                    window.scrollTo(260,960);
                }

            }
        }
    )
})