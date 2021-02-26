<template>
  <div class="uploadcmps">
    <el-upload
      ref="paiimg"
      class="upload-demo upload-contentr"
      :action="baseURL+'/direct-rent-service/direct-rent/filePath'"
      :on-success="(a,b,c)=>dragupfn(a,b,c,filesType)"
      :on-remove="(a,b)=>dragremovefn(a,b,filesType)"
      :on-error="(a,b)=>dragerrorfn(a,b,filesType)"
      :headers="Authorization"
      multiple
      :file-list="filesType.filelist"
      :before-upload="beforeupfnfile"
      :on-preview="handlePreview"
      :on-exceed="dragexceed"
      drag
      list-type="picture"
      :limit="config.limit"
    >
      <i class="el-icon-plus"></i>
      <div class="el-upload__text">上传资料</div>
    </el-upload>
    <span v-for="(item,index) in srcList" :key="index">
      <el-image
        ref="gg"
        style="width: 100px; height: 100px"
        :src="item"
        :preview-src-list="srcList"
      ></el-image>
    </span>
  </div>
</template>
<script>
import { baseURL } from '@/api/sys.js';

export default {
  name: 'uploadmany',
  props: {
    filesType: {
      type: Object,
      default: () => {
        return {
          filelist: [],
          imageList: []
        };
      }
    },
    config: {
      type: Object,
      default: () => {
        return {
          limit: 0, //限制上传个数,0代表不限制
          reg: [], //允许上传的格式,
          size: 10 //允许上传的文件大小 以mb为单位
        };
      }
    }
  },
  data() {
    return {
      baseURL,
      Authorization: { 'X-UserToken': sessionStorage.token },
      srcList: [], //上传图片预览的数组
      uuid: '', //获取点到的哪一张,
      url:''
    };
  },
  created() {},
  watch: {
    filesType: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val.filelist.length) {
          
        } else {
          this.url = '';
          this.srcList = [];
        }
      }
    }
  },
  methods: {
    dragupfn(response, file, fileList, item, index) {
      if (response.code == 200) {
        var data = response.data;
        item.filelist[item.filelist.length] = file;
        item.imageList.push({
          filePathId: data,
          uid: file.uid,
          fileName: file.name
        });
      } else {
        item.filelist = item.filelist;
        this.$forceUpdate();
        this.$message.error(file.name + '图片识别错误，请重新上传');
      }
    },

    dragremovefn(file, fileList, item, index) {
      if (item.imageList.findIndex((el) => el.uid == file.uid) != -1) {
        item.imageList.splice(
          item.imageList.findIndex((el) => el.uid == file.uid),
          1
        );
        item.filelist.splice(
          item.filelist.findIndex((el) => el.uid == file.uid),
          1
        );
      }
    },
    beforeupfnfile(file) {
      if (file.size / 1024 / 1024 > this.config.size) {
        this.$message.error(`请上传${this.config.size}M以内的文件`);
        return false;
      }

      if (this.config.reg.length) {
        let index = file.name.lastIndexOf('.');
        let suffix = file.name.substr(index + 1);
        let reg= new RegExp(this.config.reg.join('|'))
        if (!reg.test(suffix)) {
          this.$message.error(
            `请上传${this.config.reg.join(',')}格式的文件`
          );

          return false;
        }
      }
    },
    handlePreview(file) {

      this.srcList = [];
      this.url = file.url;
      this.filesType.filelist.map((el) => {
        this.srcList.push(el.url);
      });


      this.$nextTick(() => {
        var index = this.$refs['gg'].findIndex((el, index) => {
          return el.src == this.url;
        });
        console.log(index,'11')
        this.$refs['gg'][index].clickHandler();
      });
    },
    dragerrorfn(err) {
      this.$message.error('服务器错误');
    },
    dragexceed(files, list) {
      this.$message.error(`最多只允许上传${this.config.limit}个文件`);
    }
  }
};
</script>
<style lang="scss" scoped>
.uploadcmps {
  display: inline-block;
  width: 100%;
  vertical-align: top;
  ::v-deep .el-upload-dragger {
    width: 300px;
    height: 92px;
    padding-top: 14px;
  }
  ::v-deep .el-upload-list__item {
    width: 19%;
    float: left;
    margin-right: 1%;
  }
  .el-image {
    width: 0 !important;
    height: 1px !important;
  }
  ::v-deep .el-image-viewer__close .el-icon-circle-close {
    color: #fff;
  }
}
</style>
