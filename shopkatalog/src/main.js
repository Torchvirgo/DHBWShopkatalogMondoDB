import Vue from 'vue'
import App from './App.vue'
import router from '../router'

new Vue({
    router,
    render: h => h(App), //Rendern
  })
.$mount('#app') //Mounten des Renders

/* const app = Vue.createApp({
    router,
    render: h => h(App),
})
app.mount('#app') */



