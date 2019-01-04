<template>
  <div
    :id="id"
    style="width: 284px;height:284px;margin:34px auto;"
    class="m-map"/>
</template>

<script>
  export default {
    props: {
      point: {
        type: Array,
        default() {
          return [116.46, 39.92]
        }
      }
    },
    data() {
      return {
        id: `map`,
        // 高德地图 key
        key: 'e76cf8e7ff5814f4aa636fb92e2bab37'
      }
    },
    watch: {
      point: function(val, old) {
        if(this.map){
          this.map.setCenter(val)
          this.marker.setPosition(val)
        }
      }
    },
    mounted() {
      const self = this
      self.id = `map${Math.random().toString().slice(4, 6)}`
      //地图定位的回调
      window.onmaploaded = () => {
        // init AMap
        const map = new window.AMap.Map(self.id, {
          resizeEnable: true,
          zoom: 11,
          center: self.point
        })
        self.map = map

        // 工具栏
        window.AMap.plugin('AMap.ToolBar', () => {
          const toolbar = new window.AMap.ToolBar()
          map.addControl(toolbar)

        })

        //点标记
        const marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      }
      //地图定位的url
      const url = `https://webapi.amap.com/maps?v=1.4.10&key=${self.key}&callback=onmaploaded`
      const jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)
    }
  }
</script>
