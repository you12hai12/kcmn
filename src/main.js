// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts/core'

import FusionTheme from 'fusioncharts/themes/es/fusioncharts.theme.fusion'
import FusionCandy from 'fusioncharts/themes/es/fusioncharts.theme.candy'
import FusionCarbon from 'fusioncharts/themes/es/fusioncharts.theme.carbon'
import FusionFint from 'fusioncharts/themes/es/fusioncharts.theme.fint'
import FusionGammel from 'fusioncharts/themes/es/fusioncharts.theme.gammel'
import FusionOcean from 'fusioncharts/themes/es/fusioncharts.theme.ocean'
import FusionZune from 'fusioncharts/themes/es/fusioncharts.theme.zune'

import Pie2D from 'fusioncharts/viz/pie2d'
import LineChart from 'fusioncharts/viz/line'
import Column3DChart from 'fusioncharts/viz/column3d'
import Column2DChart from 'fusioncharts/viz/column2d'
import Bar2DChart from 'fusioncharts/viz/bar2d'
import AreaChart from 'fusioncharts/viz/area2d'

import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(VueFusionCharts,FusionCharts,FusionTheme,FusionCandy,FusionCarbon,FusionFint,FusionGammel,FusionOcean,FusionZune,
        Pie2D,LineChart,Column3DChart,Column2DChart,Bar2DChart,AreaChart)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
