import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/components/HomeView'
import CreateNewSeries from '@/components/CreateNewSeries'
import ListSeries from '@/components/ListSeries'
import Serie from '@/components/Serie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/skapa-ny',
      name: 'CreateNewSeries',
      component: CreateNewSeries
    },
    {
      path: '/serier',
      name: 'ListSeries',
      component: ListSeries
    },
    {
      path: '/serie/:serieId',
      name: 'Serie',
      component: Serie,
      props: true
    }
  ]
})
