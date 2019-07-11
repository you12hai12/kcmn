import Vue from 'vue'
import Router from 'vue-router'
import TableOperation from '@/components/TableOperation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableOperation',
      component: TableOperation
    }
  ]
})
