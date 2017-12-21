import Vue from 'vue'
export default{
  //获取省.
  getShareOrgData(context) {
    var getShareOrgList = [];
    Vue.http.post(context.state.url+'system/getProvinceInfo', {existall:1},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getShareOrgList.push(...response.data.data)
    })
    context.commit('getorgData',getShareOrgList);
  },
  // 市.
  getShareCityData(context, data){
    var getShareCityList = [];
    Vue.http.post(context.state.url+'system/getCityInfo', {provinceid:data.provinceid},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getShareCityList.push(...response.data.data)
    })
    context.commit('getcityData',getShareCityList);
  },
  //获取阶段
  getStage(context) {
    var getStage = [];
    Vue.http.post(context.state.url+'system/getProjectProcessClass', {existall:1},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getStage.push(...response.data.data)
    })
    context.commit('getStageData',getStage);
  },
  //获取行业
  getTrade(context) {
    var getTrade = [];
    Vue.http.post(context.state.url+'system/getTrade', {existall:1},{emulateJSON: true}).then((response) => {Vue.info = JSON.stringify(response.data, null, 4);
      getTrade.push(...response.data.data);
    })
    context.commit('getTradeData', getTrade);
  },
}
