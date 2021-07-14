import Vue from "vue"
import Vuex from "vuex"
//uniapp- vuex不需要下载,内置有
Vue.use(Vuex)


const store = new Vuex.Store({
	state:{
		userData: {},
	},
	mutations:{
		addUserData(state,userInfo){
			state.userData = userInfo
		},
		addPushOpenid(state,opId){
			state.userData.openid = opId
		}
	}
})
export default store;