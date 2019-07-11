<template>
	<el-row>
		<el-col :span="8">
			<vue-highcharts :options="options" ref="columnCharts"></vue-highcharts>
		</el-col>
		<el-col :span="8">
			<vue-highcharts :options="options1" ref="lineCharts"></vue-highcharts>
		</el-col>
		<el-col :span="8">
			<vue-highcharts :options="options2" ref="pieCharts"></vue-highcharts>
		</el-col>
	</el-row>
</template>

<script>
import Exporting from '../../node_modules/highcharts/modules/Exporting.js'
import Drilldown from '../../node_modules/highcharts/modules/Drilldown.js'
import Highcharts from 'highcharts'
import VueHighcharts from 'vue2-highcharts'

Drilldown(Highcharts);
Exporting(Highcharts);

const axios = require('axios')
const qs = require('qs')

let xdata = []
let ydata = []
let pies = []
const asyncData = {
  name: '星期',
  marker: {
    symbol: 'square'
  },
  data: ydata
}

const pieData = {
  name: '销售量',
  colorByPoint: true,
  data: pies
}


export default {
	name: 'HighChart',
	components: {
        VueHighcharts
    },
    data(){
      return{
        options: {
          chart: {
            type: 'column'
          },
          title: {
            text: '销售量'
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            categories: xdata
          },
          yAxis: {
            title: {
              text: '销售量'
            },
            labels: {
              formatter: function () {
                return this.value + '';
              }
            },
			className: 'highcharts-column'
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            },
			series: { 
				cursor: 'pointer', 
				events: { 
					click: function(e) { 
						let label =  e.point.category
						let value = e.point.y
						console.log(label,value);
					} 
				} 
			} 
          },
          series: []
        },
		options1: {
		  chart: {
		    type: 'spline'
		  },
		  title: {
		    text: '销售量'
		  },
		  subtitle: {
		    text: ''
		  },
		  xAxis: {
		    categories: xdata
		  },
		  yAxis: {
		    title: {
		      text: '销售量'
		    },
		    labels: {
		      formatter: function () {
		        return this.value + '';
		      }
		    }
		  },
		  tooltip: {
		    crosshairs: true,
		    shared: true
		  },
		  credits: {
		    enabled: false
		  },
		  plotOptions: {
		    spline: {
		      marker: {
		        radius: 4,
		        lineColor: '#666666',
		        lineWidth: 1
		      }
		    },
			series: { 
				cursor: 'pointer', 
				events: { 
					click: function(e) { 
						let label =  e.point.category
						let value = e.point.y
						console.log(label,value);
					} 
				} 
			} 
		  },
		  series: []
		},
		options2: {
		  chart: {
		    plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		  },
		  title: {
		    text: '销售量'
		  },
		  subtitle: {
		    text: ''
		  },
		  tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		  },
		  credits: {
		    enabled: false
		  },
		  plotOptions: {
		    pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
				}
			},
			series: { 
				cursor: 'pointer', 
				events: { 
					click: function(e) { 
						let label =  e.point.name
						let value = e.point.y
						console.log(label,value);
					} 
				} 
			} 
		  },
		  series: []
		}
      }
    },
	mounted(){
		axios({
			method: 'post',
			url: '/api/user/queryChart',
			data: qs.stringify({
				
			})
		}).then((res) => {
			if(res.data && res.data.length > 0){
				for (let i = 0; i < res.data.length; i++) {
					xdata.push(res.data[i].week);
					ydata.push(res.data[i].sales);
					pies.push({name:res.data[i].week,y:res.data[i].sales})
				}
				this.buildColumn()
				this.buildLine()
				this.buildPie()
			}
		}).catch(function(err) {
			console.log(err);
		});
	},
    methods: {
		buildColumn(){
			let columnCharts = this.$refs.columnCharts;
			columnCharts.delegateMethod('showLoading', '正在加载中...');
			setTimeout(() => {
				columnCharts.addSeries(asyncData);
				columnCharts.hideLoading();
			}, 2000)
		},
        buildLine(){
            let lineCharts = this.$refs.lineCharts;
            lineCharts.delegateMethod('showLoading', '正在加载中...');
            setTimeout(() => {
              lineCharts.addSeries(asyncData);
              lineCharts.hideLoading();
            }, 2000)
        },
		buildPie(){
		    let pieCharts = this.$refs.pieCharts;
		    pieCharts.delegateMethod('showLoading', '正在加载中...');
		    setTimeout(() => {
		      pieCharts.addSeries(pieData);
		      pieCharts.hideLoading();
		    }, 2000)
		}
    }
};
</script>

<style scoped>
	.highcharts-column{
		fill: #90ed7d;
		stroke: #90ed7d;
	}
</style>
