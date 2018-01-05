<template>
  <div>
        <h1>创建课程</h1>

        课程名称: 
        <el-input
            placeholder="请输入内容"
            v-model="input10"
            clearable>
        </el-input>
        
        课程logo:
        <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

          <div class="block">
            <span class="demonstration">课程有效期:</span>
            <el-date-picker
            v-model="value6"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </div>

        授课工具:
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>

        课程介绍:
        <quill-editor ref="myTextEditor"
              v-model="content"
              :config="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">
        </quill-editor>


  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default{
        data(){
            return{
                content: '',
                input10: '',
                imageUrl: '',
                value6: '',
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                isIndeterminate: true,
                editorOption: {
                // something config
                }
            }
        },
        components: {
            quillEditor
        },
        methods:{
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isLt20M = file.size / 1024 / 1024 < 20;

                if (!isJPG && !isGIF && !isPNG) {
                this.$message.error('上传logo必须是JPG/GIF/PNG 格式!');
                }
                if (!isLt20M) {
                this.$message.error('上传logo大小不能超过 20MB!');
                }
                return (isJPG || isGIF || isPNG) && isLt20M;
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },

            onEditorBlur(editor) {
            console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
            console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
            console.log('editor ready!', editor)
            },
            // onEditorChange({ editor, html, text }) {
            // // console.log('editor change!', editor, html, text)
            // this.content = html
            // }

        },
        computed: {
            editor() {
            return this.$refs.myTextEditor.quillEditor
            }
        },
        mounted() {
            console.log('this is my editor', this.editor)
        }
    }
</script>

<style lang='less'>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
