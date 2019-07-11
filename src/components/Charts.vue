<template>
	<el-row>
		<el-col :span="3">
			标签：<el-input type="text" v-model="chartLabel" style="width:120px;"/>
		</el-col>
		<el-col :span="3">
			图值：<el-input type="text" v-model="chartValue" style="width:120px;"/>
		</el-col>
		<el-col :span="18">
		  <el-button type="success" round>查询</el-button>
		  <el-button type="primary" round @click="addChartData">新增</el-button>
		  <el-button type="warning" round @click="editChartData">修改</el-button>
		  <el-button type="danger" round @click="delChartData">删除</el-button>
		</el-col>
		<el-col :span="8">
			<div id="column" :style="{width:ewidth,height:eheight}"></div>
		</el-col>
		<el-col :span="8">
			<div id="line" :style="{width:ewidth,height:eheight}"></div>
		</el-col>
		<el-col :span="8">
			<div id="pie" :style="{width:ewidth,height:eheight}"></div>
		</el-col>
		<el-dialog :title="chartTitle" :visible.sync="chartVisible" width="30%" center>
		  <el-form :model="form">
			<el-form-item label="图标" :label-width="formLabelWidth">
			  <el-input v-model="form.clabel" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="图值" :label-width="formLabelWidth">
			   <el-input v-model="form.cvalue" auto-complete="off"></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="sureClick">确 定</el-button>
			<el-button @click="chartVisible = false">取 消</el-button>
		  </div>
		</el-dialog>
	</el-row>
</template>

<script>
	import Vue from 'vue'
	import echarts from 'echarts'
	Vue.prototype.$echarts = echarts
	
	const axios = require('axios')
	const qs = require('qs')
	
	export default {
		name: 'Charts',
		data () {
			return {
				ewidth: '600px',
				eheight: '400px',
				xtitle: '',
				ytitle: '',
				xdata: [],
				ydata: [],
				pieData: [],
				chartLabel: '',
				chartValue: '',
				chartTitle: '新增',
				chartVisible: false,
				formLabelWidth: '120px',
				form: {
				    clabel: '',
				    cvalue: ''
				}
			}
		},
		mounted() {
			this.drawColumn()
			this.drawLine()
			this.drawPie()
		},
		created() {
			axios({
				method: 'post',
				url: '/api/user/queryTitle',
				data: qs.stringify({
					
				})
			}).then((res) => {
				if(res.data && res.data.length > 0){
					for (let i = 0; i < res.data.length; i++) {
						if(res.data[i].COLUMN_NAME == 'week'){
							this.xtitle = COLUMN_COMMENT
						}
						if(res.data[i].COLUMN_NAME == 'sales'){
							this.ytitle = COLUMN_COMMENT
						}
					}
					
					this.drawColumn()
				}
			}).catch(function(err) {
				console.log(err);
			});
			
			axios({
				method: 'post',
				url: '/api/user/queryChart',
				data: qs.stringify({
					
				})
			}).then((res) => {
				if(res.data && res.data.length > 0){
					for (let i = 0; i < res.data.length; i++) {
						this.xdata.push(res.data[i].week);
						this.ydata.push(res.data[i].sales);
						this.pieData.push({name:res.data[i].week,value:res.data[i].sales})
					}
					this.drawColumn()
					this.drawLine()
					this.drawPie()
				}
			}).catch(function(err) {
				console.log(err);
			});
		},
		methods:{
			sureClick() {
				let week = this.form.clabel;
				let sales = this.form.cvalue;
				let dt = this.chartTitle;
				var urlParams = 'add';
				if(dt == "修改"){
					urlParams = 'edit';
				}else{
					this.xdata.push(week);
					this.ydata.push(sales);
					this.pieData.push({name:week,value:sales})
				}
				axios({
					method: 'post',
					url: `/api/user/${urlParams}Chart`,
					headers: { 'content-type': 'application/x-www-form-urlencoded' },
					data: qs.stringify({
						week: week,
						sales: sales
					})
				}).then((res) => {
					this.$message(`${dt}成功!`)
					this.drawColumn()
					this.drawLine()
					this.drawPie()
					this.chartVisible = false
				}).catch(function(err) {
					console.log(err);
				});
			},
			addChartData() {
				this.chartVisible = true
				this.chartTitle = '新增'
			},
			editChartData() {
				this.chartVisible = true
				this.chartTitle = '修改'
			},
			delChartData() {
				let lab = this.chartLabel
				axios({
					method: 'post',
					url: `/api/user/delChart`,
					headers: { 'content-type': 'application/x-www-form-urlencoded' },
					data: qs.stringify({
						week: lab
					})
				}).then((res) => {
					this.$message(`删除成功!`)
					this.drawColumn()
					this.drawLine()
					this.drawPie()
				}).catch(function(err) {
					console.log(err);
				});
			},
			drawColumn() {
				let that = this
				let column = this.$echarts.init(document.getElementById('column'))
				column.setOption({
					title:{
						text: ''
					},
					tooltip: {
						
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					xAxis: {
						data: this.xdata
					},
					yAxis: {
						
					},
					series: [{
						name: this.ytitle,
						type: 'bar',
						data: this.ydata
					}]
				})
				
				column.on('click', function(params){
					let name = params.name
					let value = params.value
					that.chartLabel = name
					that.chartValue = value
					console.log(name,value)
				})
			},
			drawLine() {
				let line = this.$echarts.init(document.getElementById('line'))
				line.setOption({
					title: {
						text: ''
					},
					tooltip: {
						
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							magicType : {show: true, type: ['line', 'bar']},
							restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					xAxis: {
						data: this.xdata
					},
					yAxis: {
						
					},
					series: [{
						name: '',
						type: 'line',
						data: this.ydata
					}]
				})
				
				line.on('click', function(params){
					let name = params.name
					let value = params.value
					console.log(name,value)
				})
			},
			drawPie() {
				let pie = this.$echarts.init(document.getElementById('pie'))
				pie.setOption({
					title: {
						text: ''
					},
					tooltip: {
						
					},
					legend: {
						show: false,
						orient: 'horizontal',
						left: 'center',
						data: this.xdata
					},
					toolbox: {
						show : true,
						feature : {
							mark : {show: true},
							dataView : {show: true, readOnly: false},
							//magicType : {show: true, type: ['line', 'bar']},
							//restore : {show: true},
							saveAsImage : {show: true}
						}
					},
					series: [{
						name: '销售量',
						type: 'pie',
						radius: '55%',
						center: ['50%','50%'],
						data: this.pieData
					}]
				})
				
				pie.on('click', function(params){
					let name = params.name
					let value = params.value
					console.log(name,value)
				})
			}
		}
	}
</script>

<style scoped>
	.el-dialog{
		text-align: left !important;
	}
</style>
