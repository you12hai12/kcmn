<template>
	<div class="hello">
		<el-tabs v-model="activeItem" @tab-click="tabClick">
			<el-tab-pane label="表格" name="tables">
				<el-row>
					<el-col :span="3">
						学号：
						<el-input type="text" v-model="no" style="width:120px;" />
					</el-col>
					<el-col :span="3">
						姓名：
						<el-input type="text" v-model="name" style="width:120px;" />
					</el-col>
					<el-col :span="3">
						年龄：
						<el-input type="text" v-model="age" style="width:120px;" />
					</el-col>
					<el-col :span="10">
						<el-button type="success" round @click="queryStu" icon="el-icon-search">查询</el-button>
						<el-button type="primary" round @click="addStu" icon="el-icon-plus">新增</el-button>
						<el-button type="warning" round @click="editStu" icon="el-icon-edit">修改</el-button>
						<el-button type="danger" round @click="delStu" icon="el-icon-delete">删除</el-button>
						<el-button type="success" round @click="importStu" icon="el-icon-upload2">导入</el-button>
						<el-button type="primary" round @click="exportStu" icon="el-icon-download">导出</el-button>
					</el-col>
					<el-col :span="24">
						<el-table :data="tableData" stripe @row-click="rowClick" style="width: 100%">
							<el-table-column align="center" prop="sno" label="学号"></el-table-column>
							<el-table-column align="center" prop="sname" label="姓名"></el-table-column>
							<el-table-column align="center" prop="sage" label="年龄"></el-table-column>
						</el-table>
					</el-col>
					<el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="30%" center>
						<el-form :model="form">
							<el-form-item label="学号" :label-width="formLabelWidth"><el-input v-model="form.sno" auto-complete="off"></el-input></el-form-item>
							<el-form-item label="姓名" :label-width="formLabelWidth"><el-input v-model="form.sname" auto-complete="off"></el-input></el-form-item>
							<el-form-item label="年龄" :label-width="formLabelWidth"><el-input v-model="form.sage" auto-complete="off"></el-input></el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button type="primary" @click="addData">确 定</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</div>
					</el-dialog>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="Echarts图形" name="charts"><charts></charts></el-tab-pane>
			<el-tab-pane label="FusionCharts图形" name="fusioncharts"><f-ccharts></f-ccharts></el-tab-pane>
			<el-tab-pane label="HighCharts图形" name="highcharts"><high-chart></high-chart></el-tab-pane>
			<el-tab-pane label="Vue进度条" name="vues">
				<el-progress type="circle" :percentage="percentage" :color="colors" :format="format"></el-progress>
				<el-progress :percentage="percentage" :color="colors" ></el-progress>
			</el-tab-pane>
			<el-tab-pane label="Vue步骤条" name="steps">
				<el-row>
					<el-col :span="24">
						<el-steps :active="stepsActive" finish-status="success">
							<el-step title="1"></el-step>
							<el-step title="2"></el-step>
							<el-step title="3"></el-step>
							<el-step title="4"></el-step>
						</el-steps>
						<el-button @click="nextStep">下一步</el-button>
					</el-col>
					<el-col :span="24">
						<el-steps :space="200" :active="1" finish-status="success">
						  <el-step title="刚开始"></el-step>
						  <el-step title="进行中"></el-step>
						  <el-step title="已结束"></el-step>
						</el-steps>
					</el-col>
					<el-col :span="24">
						<el-steps :active="2" align-center>
						  <el-step title="步骤1" description="星期一"></el-step>
						  <el-step title="步骤2" description="星期二"></el-step>
						  <el-step title="步骤3" description="星期三"></el-step>
						  <el-step title="步骤4" description="星期四"></el-step>
						</el-steps>
					</el-col>
					<el-col :span="24">
						<el-steps :active="1">
						  <el-step title="步骤 1" icon="el-icon-edit"></el-step>
						  <el-step title="步骤 2" icon="el-icon-upload"></el-step>
						  <el-step title="步骤 3" icon="el-icon-picture"></el-step>
						</el-steps>
					</el-col>
					<el-col :span="24">
						<div style="height:400px; text-align: center; vertical-align: middle; width: 100%;">
							<el-steps direction="vertical" :active="1" align-center>
								<el-step title="步骤 1"></el-step>
								<el-step title="步骤 2"></el-step>
								<el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
							</el-steps>
						</div>
					</el-col>
					<el-col :span="24">
						<el-steps :active="1" simple>
						  <el-step title="步骤 1" icon="el-icon-edit"></el-step>
						  <el-step title="步骤 2" icon="el-icon-upload"></el-step>
						  <el-step title="步骤 3" icon="el-icon-picture"></el-step>
						</el-steps>

						<el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
						  <el-step title="步骤 1" ></el-step>
						  <el-step title="步骤 2" ></el-step>
						  <el-step title="步骤 3" ></el-step>
						</el-steps>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import Charts from './Charts';
import FCcharts from './FCcharts';
import HighChart from './HighChart';
const axios = require('axios');
const qs = require('qs');

export default {
	name: 'TableOperation',
	data() {
		return {
			activeItem: 'tables',
			no: '',
			name: '',
			age: '',
			tableData: [],
			dialogFormVisible: false,
			dialogTitle: '新增学生',
			form: {
				sno: '',
				sname: '',
				sage: ''
			},
			formLabelWidth: '120px',
			percentage: 0,
			colors: [
				{color: '#676c6c', percentage: 10},
				{color: '#f56c6c', percentage: 20},
				{color: '#aaa23c', percentage: 30},
			    {color: '#e6a23c', percentage: 40},
				{color: '#898989', percentage: 50},
			    {color: '#5cb87a', percentage: 60},
				{color: '#695658', percentage: 70},
			    {color: '#1989fa', percentage: 80},
				{color: '#363636', percentage: 90},
			    {color: '#6f7ad3', percentage: 100}
			],
			stepsActive:0
		};
	},
	components: {
		Charts,
		FCcharts,
		HighChart
	},
	created() {
		var that = this;
		axios({
			method: 'post',
			url: '/api/user/queryOne',
			data: qs.stringify({})
		})
		.then(function(res) {
			if (res.data && res.data.length > 0) {
				that.form.sno = res.data[0].sno;
				that.form.sname = res.data[0].sname;
				that.form.sage = res.data[0].sage;
			}
		})
		.catch(function(err) {
			console.log(err);
		});

		axios({
			method: 'post',
			url: '/api/user/queryAll',
			data: qs.stringify({})
		})
		.then(function(res) {
			if (res.data && res.data.length > 0) {
				that.tableData = res.data;
			}
		})
		.catch(function(err) {
			console.log(err);
		});
		
		let i = 1;
		setInterval(function(){
			that.percentage += i;
			if (that.percentage > 100) {
			  that.percentage = 100;
			}
			i++
		},1000);
	},
	methods: {
		tabClick() {},
		rowClick(row, event, column) {
			this.no = row.sno;
		},
		addStu() {
			this.dialogFormVisible = true;
			this.dialogTitle = '新增学生';
		},
		queryStu() {},
		addData() {
			var sno = this.form.sno;
			var sname = this.form.sname;
			var sage = this.form.sage;
			var dt = this.dialogTitle;
			var urlParams = 'add';
			if (dt == '修改学生') {
				urlParams = 'edit';
			}
			axios({
				method: 'post',
				url: `/api/user/${urlParams}Stu`,
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: qs.stringify({
					sno: sno,
					sname: sname,
					sage: sage
				})
			})
			.then(res => {
				this.freshData();
				this.$message(`${dt}成功!`);
				this.dialogFormVisible = false;
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		editStu() {
			this.dialogFormVisible = true;
			this.dialogTitle = '修改学生';
		},
		delStu() {
			var sno = this.no;
			if (!sno) {
				this.$alert('请选择一行!', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						this.$message({
							type: 'info',
							message: `学号不能为空`
						});
					}
				});
				return false;
			}
			axios({
				method: 'post',
				url: '/api/user/delStu',
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				data: qs.stringify({
					sno: sno
				})
			})
			.then(res => {
				this.freshData();
				this.$message(`删除成功!`);
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		importStu() {},
		exportStu() {
			require.ensure([], () => {
				const { export_json_to_excel } = require('../assets/js/Export2Excel');
				const tHeader = ['学号', '姓名', '年龄'];
				const filterVal = ['sno', 'sname', 'sage'];
				const list = this.tableData;
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '学生表'+this.queryCurrentTime());
			});
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]))
		},
		queryCurrentTime() {
			let date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();
			
			return `${year}${month<10?'0'+month:month}${day<10?'0'+day:day}${hour<10?'0'+hour:hour}${minute<10?'0'+minute:minute}${second<10?'0'+second:second}`
		},
		freshData() {
			axios({
				method: 'post',
				url: '/api/user/queryAll',
				data: qs.stringify({})
			})
			.then(res => {
				console.log(res);
				if (res.data && res.data.length > 0) {
					this.tableData = res.data;
				}
			})
			.catch(function(err) {
				console.log(err);
			});
		},
		increase(i) {
			this.percentage = 10*i;
			if (this.percentage > 100) {
			  this.percentage = 100;
			}
        },
		format(percentage) {
			let res = 0;
			return Math.ceil(percentage/5) + 's'
		},
		nextStep() {
			if (this.stepsActive++ > 4) this.stepsActive = 0;
		}
	}
};
</script>

<style scoped>
h1,
h2 {
	font-weight: normal;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
