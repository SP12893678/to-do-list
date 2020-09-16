import 'babel-polyfill'
import Vue from 'vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import vuetify from '@/plugins/vuetify'
import App from './Components/App.vue'

Vue.component('a-icon', Icon)

new Vue({
    vuetify,
    el: '#app',
    data() {
        return {}
    },
    mounted() {
        console.log('Vue run')
    },
    components: { App },
    template: '<App/>',
})
