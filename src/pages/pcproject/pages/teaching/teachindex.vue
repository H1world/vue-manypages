<template>
  <div>
      <div class="inleft-list fl" :style="{'height':leftheight}">
        <el-tree
          :data="data"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </div>
      <div class='teachingcontent fl' :style="{'height':leftheight}"><router-view></router-view></div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default{
    data(){
        return{
            data: [
                {
                label: '教学课程管理',
                here: '/teaching/teachingcourse',
                }, 
                {
                label: '一级 2',
                children: [
                    {
                        label: '二级 2-1',
                        here: '/teaching',
                    }, 
                    {
                        label: '二级 2-2',
                        here: '',
                    }
                    ]
                }, 
                {
                label: '一级 3',
                children: [
                    {
                        label: '二级 3-1',
                    }, 
                    {
                        label: '二级 3-2',
                    }
                    ]
                }
            ],
            defaultProps: {
            children: 'children',
            label: 'label'
            },
            leftheight:'',
        }
    },
    mounted(){
        this.calculationHeight();
    },
    methods:{
        handleNodeClick(data) {
            // console.log(data);
            this.$router.push({path:data.here})
        },
        calculationHeight(){
            var height = this.$store.state.pcprojectTeachingHeight;
            this.leftheight = height-53-192-50+'px';
        }
    },
    }
</script>

<style lang='less'>
.inleft-list{
    width:300px;
    background: #2f4050 !important;
    .el-tree{
        background: #2f4050 !important;
        color:#a7b1c2 !important;
        .el-tree-node__content{
            padding: 10px 0;
        }
    }
    .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
        background:#293846 !important;
        color:#fff !important;
    }
}
</style>
