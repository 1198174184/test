<template>
    <div>
        <el-card class="card-primary" shadow="never">
            <div slot="header">
                <div class="row">
                    <div class="col-auto mr-auto"><span>自定义表单</span></div>
                </div>

            </div>
            <div class="row">
                <div class="col-9">
                    <el-card shadow="never">
                        <div slot="header">
                            <div class="row">
                                <div class="col-auto mr-auto"><span>表单预览</span></div>
                            </div>
                        </div>

                    <div>

                        <el-form label-width="80px">
                            <draggable v-model="formlist" :options="{draggable:'.form-item'}" @change="changeSort">
                            <div class="row form-item"  v-for="(field,index) of formlist" >
                            <div class="col-10 " >
                            <el-form-item
                                          :label="field.label" :prop="field.name">
                                <el-form-field :item="field.item" :value="field.value"
                                ></el-form-field>
                            </el-form-item>
                            </div>
                            <div class="col">
                                <el-button type="primary" icon="el-icon-edit"  @click="editItem(index)" circle></el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="delItem(index)" circle></el-button>
                            </div>
                            </div>
                            </draggable>
                        </el-form>

                    </div>
                    </el-card>
                </div>
                <div class="col">
                    <el-card shadow="never">
                        <div slot="header">
                            <div class="row">
                                <div class="col" style="text-align: center;font-weight: bold"><span>项目设计</span></div>
                            </div>
                        </div>
                        <el-collapse accordion>
                            <el-collapse-item>
                                <template slot="title">
                                    预留字段 <i class="header-icon el-icon-info"></i>
                                </template>
                                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                            </el-collapse-item>
                            <el-collapse-item>
                                <template slot="title">
                                    自定义字段 <i class="header-icon el-icon-info"></i>
                                </template>
                                <div class="col mt-2">
                                    <span class="click-tag" v-for="item in tableItem" @click="addFormItem(item.type)">{{item.name}}</span>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </el-card>
                    <el-card shadow="never" style="margin-top: 10px"  v-if="editModel">
                        <div slot="header">
                            <div class="row">
                                <div class="col" style="text-align: center;font-weight: bold;"><span>编辑字段</span></div>
                            </div>
                        </div>
                        <div class="col" >
                            <el-form label-width="40px">
                                <el-form-item label="名称"  v-if="activeItem.label">
                                    <el-input v-model="activeItem.label" placeholder="请输入内容"></el-input>
                                </el-form-item>
                                <el-form-item label="选项" v-if="activeItem.hasitems" >
                                <el-select
                                        v-model="activeItem.item.items"
                                        multiple
                                        filterable
                                        allow-create
                                        default-first-option
                                        placeholder="请添加选项">
                                    <el-option
                                            v-for="(item,index) in activeItem.item.items"
                                            :key="index"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-card>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
  import ElFormField from '@/components/form/ElFormField'
  import draggable from 'vuedraggable'
  export default {
    components: {
      ElFormField,
      draggable
    },
    data () {
      return {
        activeItem: {},
        formlist: [],
        editModel:false,
        tableItem: [
          {name: '单行文本', type: 'text'},
          {name: '多行文本', type: 'textare'},
          {name: '单项选择', type: 'radio-group'},
          {name: '多项选择', type: 'checkbox-group'},
          {name: '下拉选择', type: 'select'},
          {name: '级联下拉', type: 'cascader'},
          {name: '时间选择', type: 'time-range'},
          {name: '日期选择', type: 'date-range'},
          {name: '日期时间选择', type: 'data-time-range'}
        ],
      }
    },
    methods: {
      changeSort(e){
        console.log(e)
      },
      editItem(index) {
        this.editModel = true
        this.activeItem = this.formlist[index]
      },
      delItem(index) {
        this.formlist.splice(index,1)
      },
      addFormItem (type) {
        let item
        switch (type) {
          case 'text':
            item = {value: '', disabled: false, label: 'label',hasitems:false, item: {holder: 'text', placeholder: '默认'}}
            break
          case 'textare':
            item = {
              value: '',
              disabled: false,
              label: 'label',
              hasitems:false,
              item: {holder: 'textare', placeholder: '默认', rows: '5', cols: '20'},
            }
            break
          case 'radio-group':
            item = {value: '', disabled: false, label: 'label', hasitems:true,item: {holder: 'radio-group', items: ['选项'] ,name:'sex'}}
            break
          case 'checkbox-group':
            item = {value: '', disabled: false, label: 'label',hasitems:true, item: {holder: 'checkbox-group', items: ['选项']}}
            break
          case 'select':
            item = {value: '', disabled: false, label: 'label',hasitems:true, item: {holder: 'select', items: ['选项']}}
            break
          case 'time-range':
            item = {value: '', disabled: false, label: 'label', hasitems:false, item: {holder: 'time-range'}}
            break
          case  'date-range':
            item = {value: '', disabled: false, label: 'label', hasitems:false, item: {holder: 'date-range',type:"date"}}
            break
          case 'data-time-range':
            item = {value: '', disabled: false, label: 'label',hasitems:false,  item: {holder: 'date-time-range',type:"datetime"}}
            break
          default:
        }
        this.formlist.push(item)
        console.log(this.formlist)
      },
    },
    mounted () {
      this.$store.commit('setPageTitle', '自定义表单')
    },
  }
</script>
<style>
    .click-tag {
        font-size: 12px;
        display: inline-block;
        background-color: #1ab394;
        margin: 5px;
        color: white;
        padding: 3px 10px;
        border-radius: 20px;
        cursor: pointer;
    }
</style>