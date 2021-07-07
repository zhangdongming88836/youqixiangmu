<template>
  <div>
        <template>
          <div class="test">
            <div id="container"></div>
            <img src="" />
          </div>
        </template>
  </div>
</template>
<script>
  import MapLoader from '../../../assets/js/AMap'
  export default {
    data() {
      return {
        show: false,
        map: null,
        titles: ''
      }
    },
    components: {
      MapLoader
    },
    methods: {
      open() {
        this.show = true;
        this.titles = "文本提示";
      },
      del() {
        document.getElementById("terrace").style.display="inline-block"
      },
      out(){
        document.getElementById("terrace").style.display="none"
      },
      deltow() {
        document.getElementById("terracetow").style.display="inline-block"
      },
      outtow(){
        document.getElementById("terracetow").style.display="none"
      },
      delroe() {
        document.getElementById("terraceroe").style.display="inline-block"
      },
      outroe(){
        document.getElementById("terraceroe").style.display="none"
      },
      topage(url){
        this.$router.push(url)
      }
    },
    created() {
      let _this = this;
      window.del = _this.del;
      window.out = _this.out;
      window.deltow = _this.deltow;
      window.outtow = _this.outtow;
      window.delroe = _this.delroe;
      window.outroe = _this.outroe;
      window.topage = _this.topage;
    },
    mounted() {
      let that = this
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        that.map = new AMap.Map('container', {
          center: [122.200923, 35.675807],
          // resizeEnable: false,
          zoom: 7,
          zoomEnable: false,//缩放
          // dragEnable: false,//移动
        })
        let marker = new AMap.Marker({
          position: that.map.getCenter(),
          icon: new AMap.Icon({
            image: require('../../../assets/images/pingtai.png'), //定位点显示的图标
            size: new AMap.Size(160, 160), // 图标大小
            imageSize: new AMap.Size(50, 50)
          }),
          offset: new AMap.Pixel(-30, -10), //图标点的位置
          content: `<div onmouseleave="out()">
                      <span class="icon" onclick="del()">
                        <img src="${require('@/assets/images/chuan.png')}" style="width:100px; height:auto""/>
                      </span>
                      <div id="terrace" style="width:auto; display:none">
                        <button onclick="topage('/layout/servicing')">维修统计报表</button>
                        <button onclick="topage('/layout/stock')">库存统计报表</button>
                        <button onclick="topage('/layout/order')">订单汇总报表</button>
                      </div>
                    </div>`,
        })
        let markers = new AMap.Marker({
          position: that.map.getCenter(),
          icon: new AMap.Icon({
            image: require('../../../assets/images/pingtai.png'), //定位点显示的图标
            size: new AMap.Size(160, 160), // 图标大小
            imageSize: new AMap.Size(26, 26),
          }),
          content: `<div onmouseleave="outtow()">
                      <span class="icon" onclick="deltow()">
                        <img src="${require('@/assets/images/chuan.png')}" style="width:100px; height:auto"/>
                      </span>
                      <div id="terracetow" style="width:auto; display:none">
                        <button onclick="topage('/layout/servicing')">维修统计报表</button>
                        <button onclick="topage('/layout/stock')">库存统计报表</button>
                        <button onclick="topage('/layout/order')">订单汇总报表</button>
                      </div>
                    </div>`,
          offset: new AMap.Pixel(-71, -82) //图标点的位置
        })
        let ship = new AMap.Marker({
          position: that.map.getCenter(),
          icon: new AMap.Icon({
            image: require('../../../assets/images/pingtai.png'), //定位点显示的图标
            size: new AMap.Size(160, 160), // 图标大小
            imageSize: new AMap.Size(26, 26),
          }),
          content: `<div onmouseleave="outroe()">
                      <span class="icon" onclick="delroe()">
                        <img src="${require('@/assets/images/chuan.png')}" style="width:100px; height:auto"/>
                      </span>
                      <div id="terraceroe" style="width:auto; display:none">
                        <button onclick="topage('/layout/servicing')">维修统计报表</button>
                        <button onclick="topage('/layout/stock')">库存统计报表</button>
                        <button onclick="topage('/layout/order')">订单汇总报表</button>
                      </div>
                    </div>`,          offset: new AMap.Pixel(11, -102) //图标点的位置
        })
        marker.setMap(that.map),
          markers.setMap(that.map),
          ship.setMap(that.map)
      }, e => {
        console.log('地图加载失败', e)
      })
    }
  }
</script>
<style scoped>
.test {
  width: 100%
}
 #container{
        width: 100%;
        height: 500px;
    }
</style>