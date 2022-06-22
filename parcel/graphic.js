import ID from './signup.js'
var x = []
var y = []
// 2D繪圖
var ctx = document.getElementById('mychart').getContext('2d')
var linechart = new Chart(ctx, {
    type: 'line',
    data: {
        // x軸
        labels: [],
        datasets: [{
            label: 'Money',
            // y軸
            data: [],
            fill: true,
            // 線的顏色
            borderColor: '#FFFFFF',
            // 填滿的顏色
            backgroundColor: '#FFFFFF'
        }]
    },
})


function getGraphData(project_name, personal_or_joint, color){
    var back_color_r = color.slice(1, 3)
    var back_color_g = color.slice(3, 5)
    var back_color_b = color.slice(5, 7)
    back_color_r = Number.parseInt(back_color_r, 16)
    back_color_g = Number.parseInt(back_color_g, 16)
    back_color_b = Number.parseInt(back_color_b, 16)

    linechart.destroy()
    $.get('./getGraphDetail',{
        id: ID,
        name: project_name,
      }, (data)=>{
        x = data[0]
        y = data[1]
        linechart = new Chart(ctx, {
            type: 'line',
            data: {
                // x軸
                labels: x,
                datasets: [{
                    label: 'Money',
                    // y軸
                    data: y,
                    fill: true,
                    // 線的顏色
                    borderColor: color,
                    // 填滿的顏色
                    backgroundColor: `rgba(${back_color_r},${back_color_g},${back_color_b},0.15)`
                }]
            },
        })
      })
}
export default {
    getGraphData,
}