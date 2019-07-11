<template>
	<el-row>
		<el-col :span="8">
			<fusioncharts :type="type1"
			              :width="width"
						  :height="height"
						  :dataFormat="dataFormat"
						  :dataSource="dataSource1"
						  @dataplotClick="columnClick"></fusioncharts>
		</el-col>
		<el-col :span="8">
			<fusioncharts :type="type2"
			              :width="width"
						  :height="height"
						  :dataFormat="dataFormat"
						  :dataSource="dataSource2"
						  @dataplotClick="columnClick"></fusioncharts>
		</el-col>
		<el-col :span="8">
			<fusioncharts :type="type3"
			              :width="width"
						  :height="height"
						  :dataFormat="dataFormat"
						  :dataSource="dataSource3"
						  @dataplotClick="columnClick"></fusioncharts>
		</el-col>
	</el-row>
</template>

<script>
	import Vue from 'vue'
	
	let datas = []
	
	export default {
		name: 'FCcharts',
		data() {
			return {
				type1: 'column2d',
				type2: 'line',
				type3: 'pie2d',
				width: '600',
				height: '400',
				dataFormat: 'json',
				dataSource1: {
				  "chart": {
					  "caption": "销售量",
					  "subCaption": "2019年",
					  "showPercentInTooltip": "0",
					  "exportEnabled": "1",
					  "useDataPlotColorForLabels": "1",
					  "theme": "candy"
				  },
				  "data": datas
				},
				dataSource2: {
				  "chart": {
					  "caption": "销售量",
					  "subCaption": "2019年",
					  "showPercentInTooltip": "0",
					  "exportEnabled": "1",
					  "useDataPlotColorForLabels": "1",
					  "theme": "carbon"
				  },
				  "data": datas
				},
				dataSource3: {
				  "chart": {
					  "caption": "销售量",
					  "subCaption": "2019年",
					  "showPercentInTooltip": "0",
					  "exportEnabled": "1",
					  "useDataPlotColorForLabels": "1",
					  "theme": "ocean"
				  },
				  "data": datas
				}
			}
		},
		created: () => {
			Vue.http.post('/api/user/queryChart',{},{emulateJSON:true}).then(function(res){
				let data = res.body
				for(let i=0;i<data.length;i++){
					datas.push({'label':data[i].week,'value':data[i].sales})
				}
			},function(err){
				console.log(err)
			})
		},
		methods:{
			columnClick(e) {
				let label = e.data.categoryLabel
				let value = e.data.value
				console.log(label,value)
			}
		}
	}
</script>

<style>
</style>
