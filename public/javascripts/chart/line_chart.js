let chartbox = document.querySelector('.chart_container');

let chart_list = [];

function attach_Chart(item_name, chart_class_name, labels, value_list, color) {
    let ctx = document.getElementById(chart_class_name).getContext('2d');
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: item_name,
                backgroundColor: color, //'rgb(99, 255, 132)'
                borderColor: 'rgb(0, 0, 0)',
                data: value_list,
                fill: true,
                tension : 1,
                pointStyle : 'circle'
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
        responsive: false,
        plugins: {
            title: {
            display: true,
            text: 'Chart.js Line Chart'
            },
        },
        interaction: {
            mode: 'index',
            intersect: false
        },
        scales: {
            x: {
            display: true,
            title: {
                display: true,
                text: 'Month'
            }
            },
            y: {
            display: true,
            title: {
                display: true,
                text: 'Value'
            }
            }
        }
        },
        animations: {
            y: {
              easing: 'easeInOutElastic',
              from: (ctx) => {
                if (ctx.type === 'data') {
                  if (ctx.mode === 'default' && !ctx.dropped) {
                    ctx.dropped = true;
                    return 0;
                  }
                }
              }
            }
          },
    };

    

    let created_chart = new Chart(ctx, config);

    
    // created_chart.canvas.parentNode.style.height = '600px';
    // created_chart.canvas.parentNode.style.width = '600px';
    
    return created_chart;
}

function create_Chart(item_name ,img_name, labels, value_list, color) {
    
    let chart_frame = `
        <div id = "${item_name}">
            <div class="chart_subj">
                <img src="/images/chart/${img_name}.png" alt="">
                <div>${item_name}</div>
            </div>
            <canvas id="${img_name}_chart" width="800" height="400"></canvas>
        </div>
    `
    let div = document.createElement('div');
    div.innerHTML = chart_frame;
    chartbox.appendChild(div);

    let chart = attach_Chart(item_name , `${img_name}_chart`, labels, value_list, color);
    chart_list.push(chart);
    
    //console.log(chart.data.datasets);
}

