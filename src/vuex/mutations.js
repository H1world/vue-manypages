export default{
  // 存储方法
  nochecked(state,nochecked){
    state.nochecked = nochecked
  },
  checked(state,checked){
    state.checked = checked
  },
  PauseChecked(state,PauseChecked){
    state.PauseChecked = PauseChecked
  },
  yearvalue(state,yearvalue){
    state.yearvalue = yearvalue
  },
  statevalue(state,statevalue){
    state.statevalue = statevalue
  },
  organizavalue(state,organizavalue){
    state.organizavalue = organizavalue
  },
  accountname(state,accountname){
    state.accountname = accountname
  },
  aftersure(state,aftersure){
    state.aftersure = aftersure
  },
  indextosapienstradid(state, indextosapienstradid) {
    state.indextosapienstradid = indextosapienstradid
  },
  indextosapienstradname(state, indextosapienstradname) {
    state.indextosapienstradname = indextosapienstradname
  },
  indextohotprojectstageid(state, indextohotprojectstageid) {
    state.indextohotprojectstageid = indextohotprojectstageid
  },
  indextohotprojectstagename(state, indextohotprojectstagename) {
    state.indextohotprojectstagename = indextohotprojectstagename
  },
  // 存储方法end
  // 省 市 共用
  getorgData(state,getorgData){
    state.getorgData = getorgData
  },
  getcityData(state,getcityData){
    state.getcityData = getcityData
  },
  getStageData(state,getStageData){
    state.getStageData = getStageData
  },
  getTradeData(state,getTradeData){
    state.getTradeData = getTradeData
  },
  pcprojectTeachingHeight(state, pcprojectTeachingHeight) {
    state.pcprojectTeachingHeight = pcprojectTeachingHeight
  },
}
