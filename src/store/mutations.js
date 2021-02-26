import * as types from './mutation-types'
export default {
	//更新字典数据
	[types.UPDATE_dict](state,newData){
		state.dictList=newData
	},
	//更新用户信息
	[types.UPDATE_userInfo](state,newData){
		state.userInfo=newData
	},
	//更新用户信息
	[types.UPDATE_supName](state,newData){
		console.log('state==>',state)
		state.supName=newData
	},
	//更新导航名字
	[types.UPDATE_navName](state,newData){
		state.navName=newData
	},
	//更新左侧导航
	[types.UPDATE_leftNav](state,newData){
		console.log('UPDATE_navName==>',state)
		state.leftNav=newData
	},
	//更新fix abs tab
	[types.UPDATE_tab](state,newData){
		console.log(newData,state)
		state.acitveTab=newData
	}


	
}