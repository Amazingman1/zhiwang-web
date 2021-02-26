<template>
  <div>
    直接在demo页面查看各个组件用法
    配置路由的情况 如果是菜单页面 加上isnav: true,
    <uploadmany :files-type="filesType" :config="config" />
    <span style="margin:20px" @click="getpick">点击查看上传的图片</span>

    <data-list ref="datalist" :filters="filterList" :total="total" @data-refresh="handleRefresh">
      <div class="addbtn">
        <el-button type="primary" size="small" @click="codeDialog=true">报件申请</el-button>
      </div>
      <el-table :data="listData" highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column label="操作" fixed="left" width="240" align="left">
          <template slot-scope="{row}">
            <el-button size="medium" type="text">编辑{{ row }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="applyCode" label="申请编号" min-width="190" />
        <el-table-column prop="custName" label="客户姓名" min-width="150" />
        <el-table-column prop="idCode" label="证件号码" min-width="200" />
        <el-table-column prop="carBrandName" label="品牌" min-width="150" />
        <el-table-column prop="employee" label="业务员姓名" min-width="150">
          <template slot-scope="scope">{{ scope.row.employee }}</template>
        </el-table-column>
        <el-table-column prop="source" label="所属公司" min-width="150">
          <template slot-scope="scope">{{ scope.row.store }}</template>
        </el-table-column>
        <el-table-column prop="source" label="申请时间" min-width="180">
          <template slot-scope="scope">{{ scope.row.applyTime }}</template>
        </el-table-column>
        <el-table-column prop="source" label="审核时间" min-width="180">
          <template slot-scope="scope">{{ scope.row.approvalTime }}</template>
        </el-table-column>
      </el-table>
    </data-list>
    <div>数字运算</div>
    <span>{{ 111111111.22| formatMoney }}</span>
    <em>(钱转科学法)</em>
    <div>
      <em>0.1+0.2=</em>
      <span>{{ (0).adds(...[0.1,0.2]) }}</span>
    </div>
    <div>
      <em>0.1-0.2-0.3=</em>
      <span>{{ (0.1).sub(...[0.2,0.3]) }}</span>
    </div>
    <div>
      <em>0.1*0.2=</em>
      <span>{{ (0.1).mul(...[0.2]) }}</span>
    </div>
    <div>
      <em>0.1/0.2=</em>
      <span>{{ (0.1).divide(...[0.2]) }}</span>
    </div>
    <em>遇到数字运算带小数 请使用这4个方法去,不然小数将会出问题</em>

    <div>常用正则</div>

    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="范围" prop="range">
        <el-input v-model="ruleForm.range" />
      </el-form-item>
    </el-form>
    <button @click="aa">aa</button>
  </div>
</template>

<script>
import storage from 'good-storage'
import api from '@/api'
import imgdemo from '@/assets/logo.png'
export default {
  name: '',
  components: {},
  data() {
    return {
      filesType: {
        filelist: [
          { url: imgdemo, uid: 1, name: '例子' } // 给默认图片
        ],
        imageList: [
          { url: imgdemo, uid: 1, name: '例子' } // 给默认图片
        ] // 上传的文件初始化,上传完毕后 直接操作这个就可以了
      },
      config: {
        // 下面的配置 不传就是不限制
        size: 10, // 最大10m
        limit: 5, // 限制5个,
        reg: ['png', 'jpeg'] // 只允许上传png jpeg,
      },

      //  上面是上传组件的解释
      total: 0,
      filterList: [
        {
          label: '输入框:',
          type: 'input',
          field: 'input',
          size: 'small'
        },

        {
          label: '选择:',
          type: 'select',
          field: 'select',
          size: 'small',
          options: [
            {
              label: '第一个选择',
              value: 1
            },
            {
              label: '第二个选择',
              value: 2
            }
          ]
        },
        {
          label: '树形:',
          type: 'tree',
          field: 'tree',
          size: 'small',
          options: [
            {
              value: 'zhinan',
              label: '指南',
              children: [
                {
                  value: 'shejiyuanze',
                  label: '设计原则',
                  children: [
                    {
                      value: 'yizhi',
                      label: '一致'
                    },
                    {
                      value: 'fankui',
                      label: '反馈'
                    },
                    {
                      value: 'xiaolv',
                      label: '效率'
                    },
                    {
                      value: 'kekong',
                      label: '可控'
                    }
                  ]
                },
                {
                  value: 'daohang',
                  label: '导航',
                  children: [
                    {
                      value: 'cexiangdaohang',
                      label: '侧向导航'
                    },
                    {
                      value: 'dingbudaohang',
                      label: '顶部导航'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: '时间范围:',
          type: 'daterange',
          size: 'small',
          field: ['applyStartTime', 'applyEndTime']
        },
        {
          label: '时间范围:',
          type: 'date',
          size: 'small',
          field: 'date'
        },
        {
          label: '输入范围:',
          type: 'inputrange',
          field: 'inputrange',
          size: 'small',
          isSeparated: 1
        },
        {
          label: '',
          type: 'inputrange',
          field: 'inputrange2',
          size: 'small'
        }
      ],
      listData: [],
      // 上面是列表查询组件的用法  filterList代表搜索条件,如果下拉选项是异步数据,filterList丢入computed,computed注释代码为例子
      ruleForm: {
        password: '',
        range: ''
      },
      rules: {
        password: this.$rules.getReg(
          '请输入6-18位字母数字混合的密码',
          'change',
          this.$pattern.loginPassWord,
          false
        ),
        // 第一个参数是错误的提示信息,必填
        // 第二个参数,默认是blur,如需更改请传入
        // 第三个参数,如果需要正则校验 就传入,非必填
        // 第四个参数 如果输入需要校验正则 但不是必填项 请传入false,默认true
        range: this.$rules.getRangeReg(5, 10, '请输入5-10')
        // 正则校验范围 三个参数依次为 最小值 最大值  错误提示
      }
    }
  },
  computed: {
    // filterList: function() {
    //   return [
    //     {
    //       label: '客户信息:',
    //       type: 'input',
    //       field: 'custInfo',
    //       size: 'small',
    //       placeholder: '请输入客户姓名/手机号码'
    //     },
    //     {
    //       label: '意向车辆用途:',
    //       type: 'select',
    //       field: 'intentionCarUsing',
    //       size: 'small',
    //       options: this.$store.state.dictList.carPurpose,
    //       placeholder: '全部'
    //     },
    //     {
    //       label: '意向车辆类型:',
    //       type: 'select',
    //       field: 'intentionCarType',
    //       size: 'small',
    //       options: this.$store.state.dictList.carType,
    //       placeholder: '全部'
    //     },
    //     {
    //       label: '购车目的:',
    //       type: 'select',
    //       field: 'purpose',
    //       size: 'small',
    //       options: this.$store.state.dictList.buyCarPurpose,
    //       placeholder: '全部'
    //     },
    //     {
    //       label: '跟进结果:',
    //       type: 'select',
    //       field: 'followUpResult',
    //       size: 'small',
    //       options: this.$store.state.dictList.followUpResult,
    //       placeholder: '全部'
    //     },
    //     {
    //       label: '最近进件日期:',
    //       type: 'daterange',
    //       field: ['updateStartTime', 'updateEndTime'],
    //       size: 'small'
    //     }
    //   ]
    // }
  },
  created() {
    // 创建存储的数据  用的是good-storage插件 懒得自己写
    storage.set('key', { a: 1, b: 2 }) // 存
    console.log(storage.get('key').a) // 取
    storage.remove('key') // 删

    console.log(this.$rules.getreg)
  },
  mounted() {},
  methods: {
    aa() {
      history.go(-1)
    },
    handleRefresh(filters) {
      this.getLists(filters)
    },
    // 查询
    getLists(param) {
      api
        .personalApplyOrderCustInfoList(param)
        .then((res) => {
          // console.log(res, "---------res查询列表");
          if (res.code === 200) {
            this.listData = res.data.rows
            this.total = Number(res.data.total)
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(() => {})
    },
    getpick() {
      console.log(this.filesType, 'filesType')
      this.$show()
      setTimeout(() => {
        this.$hide()
      }, 1000)
    },
    hide() {}
  }
}
</script>

<style lang='scss' scoped>
em {
  color: red;
}
</style>
