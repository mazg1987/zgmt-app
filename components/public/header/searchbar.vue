<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <!--网站logo图标-->
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </el-col>

      <!--中间搜索框部分-->
      <el-col
        :span="15"
        class="center">
        <!--搜索框的div-->
        <div class="wrapper">
          <!--搜索的文本输入框-->
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <!--热门搜索，当文本框获得焦点时显示-->
          <dl
            v-if="isHotPlace"
            class="hotPlace">
            <dt>热门搜索</dt>
            <dd
              v-for="(item, index) in hotPlace"
              :key="index"
            >
              <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>

          <!--搜索列表，当文本框输入文字时显示-->
          <dl
            v-if="isSearchList"
            class="searchList">
            <dd
              v-for="(item, index) in searchList"
              :key="index">
              <a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>

        <!--热门搜索的导航-->
        <div class="suggset">
          <a
            v-for="(item, index) in hotPlace"
            :key="index"
            :href="'/products?keyword=' + encodeURIComponent(item.name)"
          >{{ item.name }}</a>
        </div>

        <!--导航菜单-->
        <ul class="nav">
          <li><nuxt-link
            to="/"
            class="takeout">美团外卖</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="movie">猫眼电影</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="hotel">美团酒店</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="apartment">民宿/公寓</nuxt-link></li>
          <li><nuxt-link
            to="/"
            class="business">商家入驻</nuxt-link></li>
        </ul>
      </el-col>

      <!--右侧图标-->
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li>
            <i class="refund"/><p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"/><p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"/><p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        //搜索的文字
        search: '',
        //文本框是否获得焦点
        isFocus: false,
        hotPlace: [{"name":'火锅'}, {"name":'烧鸡'}, {"name":'油焖大虾'}],
        searchList: [{"name":'迪士尼'},{"name":'保健'},{"name":'地锅鸡'}]
      }
    },
    //计算属性
    computed: {
      isHotPlace() {
        return this.isFocus && !this.search
      },
      isSearchList() {
        return this.isFocus && this.search
      }
    },
    methods: {
      //绑定事件
      focus() {
        this.isFocus = true
      },
      blur() {
        setTimeout(() => {
          this.isFocus = false
        }, 200)
      }
    }

  }
</script>

<style scoped lang="scss">
</style>
