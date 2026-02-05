<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import 'element-plus/theme-chalk/display.css'
  import { routerTo } from '@/utils/route/route'
  import {
    Fold,
    CloseBold,
    Star,
    DocumentCopy,
    School,
    Document,
    Timer,
    Service,
    User,
    // ... 其他需要的图标
  } from '@element-plus/icons-vue'
  import { debounce } from 'lodash'

  // 需要的
  import indexLogo from '@/assets/logo/indexLogo.png'
  // import wxCode from '@/assets/photo/wxCode.jpg'
  import replace from '@/assets/photo/image.png'
  // import xhsCode from '@/assets/photo/xhsCode.jpg'

  // // pinia全局部分
  import rootStore from '@/stores/index'

  //   tab section
  const activeItem = ref('tl')

  //响应式部分
  // 小屏幕所需变量
  const ifExpand = ref(false)
  const ifScreensmall = ref(true)

  // 计算 `size`，根据窗口宽度返回不同值
  const drawerSize = ref('30%')

  // 小屏幕时候的函数
  const routerAndclose = (routePath: string) => {
    routerTo(routePath)
    ifExpand.value = false
  }

  // 检查视窗大小的函数
  const checkScreenSize = debounce(() => {
    ifScreensmall.value = window.innerWidth < 1200
  }, 100) // 100ms 防抖

  const updateSize = debounce(() => {
    drawerSize.value = window.innerWidth < 600 ? '100%' : window.innerWidth < 1024 ? '50%' : '30%'
  }, 100)

  // 组件挂载时
  onMounted(async () => {
    const data = await rootStore.homepage.getHomepageInfo()
    console.log('获取到我们最后得到的数据', data)

    window.addEventListener('resize', checkScreenSize)
    checkScreenSize() // 初始化时检查一次
    window.addEventListener('resize', updateSize)
    updateSize() // 初始化时检查一次
  })

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
    window.removeEventListener('resize', updateSize)
  })
</script>
<template>
  <el-container>
    <el-header height="72px">
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="activeItem"
      >
        <!-- 最左边的logo section -->

        <el-image
          :src="indexLogo"
          alt="计算机类留学信息综合站"
          class="mr2 logo_size_sp pointer"
          @click="() => routerTo('homepage')"
        />

        <!-- 中间的tab section -->
        <el-menu-item
          class="hidden_small_res"
          index="tl"
          >网页介绍</el-menu-item
        >
        <el-menu-item
          class="hidden_small_res"
          index="list"
          >申请项目列表</el-menu-item
        >
        <el-sub-menu
          class="hidden_small_res"
          index="service"
        >
          <template #title>申请服务</template>
          <el-menu-item
            index="ps"
            @click="() => routerTo('documents')"
            >文书</el-menu-item
          >
          <el-menu-item
            index="select"
            @click="() => routerTo('positioning')"
            >选校定位</el-menu-item
          >
          <el-menu-item index="application">网申跟进</el-menu-item>
        </el-sub-menu>
        <el-menu-item
          class="hidden_small_res"
          index="info"
          >申请时间线</el-menu-item
        >
        <!-- 右边的联系我+登录 section -->
        <div class="others">
          <el-button
            round
            class="logIn"
            @click="rootStore.global.toggleOpenContact()"
            >联系我？</el-button
          >
          <!-- 联系右拉框 -->
          <el-button
            round
            class="contact hidden_small_res"
            @click="() => routerTo('login')"
            >登录&注册</el-button
          >
          <!-- 响应式布局,小屏才会出现 -->
          <el-icon
            :size="30"
            class="hidden-lg-and-up responsive_menu"
            v-show="!ifExpand"
            @click="() => (ifExpand = !ifExpand)"
          >
            <Fold />
          </el-icon>
          <el-icon
            :size="30"
            class="hidden-lg-and-up responsive_menu"
            v-show="ifExpand"
            @click="() => (ifExpand = !ifExpand)"
          >
            <CloseBold />
          </el-icon>
          <el-drawer
            v-model="rootStore.global.openContact"
            title="欢迎关注咨询,联系方式如下"
            direction="rtl"
            :size="drawerSize"
          >
            <div class="contact-drawer">
              <el-image :src="replace"></el-image>
              <el-image :src="replace"></el-image>
            </div>
          </el-drawer>
        </div>
      </el-menu>
    </el-header>
    <el-main>
      <div v-if="ifExpand && ifScreensmall">
        <el-menu
          active-text-color="#ffd04b"
          background-color="rgb(255, 255, 255)"
          class="el-menu-vertical-demo"
          default-active=""
          style="padding-left: 2rem; padding-right: 2rem"
        >
          <el-menu-item
            index="tl"
            class="el-menu-item_1"
            ><el-icon><Star /></el-icon>网站介绍</el-menu-item
          >
          <el-menu-item
            index="list"
            class="el-menu-item_1"
            @click="() => routerAndclose('choose')"
            ><el-icon><DocumentCopy /></el-icon>申请项目列表</el-menu-item
          >
          <el-sub-menu
            index="service"
            class="el-menu-item_3"
          >
            <template #title
              ><el-icon><Service /></el-icon>申请服务</template
            >
            <el-menu-item
              index="ps"
              class="el-menu-item_2"
              @click="() => routerAndclose('documents')"
              ><el-icon><Document /></el-icon>文书</el-menu-item
            >
            <el-menu-item
              index="select"
              class="el-menu-item_2"
              @click="() => routerAndclose('positioning')"
              ><el-icon><School /></el-icon>选校定位</el-menu-item
            >
          </el-sub-menu>
          <el-menu-item
            index="info"
            class="el-menu-item_1"
            ><el-icon><Timer /></el-icon>申请时间线</el-menu-item
          >
          <el-menu-item
            index="logIn"
            class="el-menu-item_1"
            ><el-icon><User /></el-icon>登录 Log In</el-menu-item
          >

          <el-button class="custom-button">Sign up</el-button>
        </el-menu>
      </div>
      <router-view v-else />
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
  .logo_size_sp {
    width: 210px !important;
  }

  .el-menu--horizontal {
    align-items: center;
    --el-menu-horizontal-height: 72px;
    padding-left: 2rem;
    padding-right: 2rem;
    font-family: 'Canva Sans', 'Open Sans', sans-serif;
  }

  .el-menu--horizontal > .others {
    height: 100%;
    margin-left: auto;
    display: flex; /* 开启 Flex 布局 */
    align-items: center; /* 垂直居中 */
    justify-content: center;
  }

  .others > .logIn,
  .others > .contact {
    font-family: 'Canva Sans', 'Open Sans', sans-serif;
    font-weight: 550;
  }
  .el-main {
    --el-main-padding: 0;
  }

  .el-button {
    margin-left: 0px;
    margin-right: 16px;
  }

  .responsive_menu:hover {
    color: rgb(57, 145, 254);
    cursor: pointer;
  }

  // 当切到小屏幕之后
  .el-menu-item_1 {
    padding: 40px 0;
    border-bottom: 4px;
    color: rgb(69, 69, 69, 0.8);
    font-weight: 600;
    font-family: 'Open Sans', sans-serif, 'Canva Sans';
    border-bottom-color: rgb(69, 69, 69, 0.2);

    border-bottom-style: solid;
    border-bottom-width: 3px;
  }

  .el-menu-item_2 {
    padding: 40px 0;
    border-bottom: 4px;
    color: rgb(69, 69, 69, 0.8);
    font-weight: 600;
    font-family: 'Open Sans', sans-serif, 'Canva Sans';
  }

  .el-menu-item_3 {
    padding: 8px 0;
    border-bottom: 4px;
    color: rgb(69, 69, 69, 0.8) !important;
    font-weight: 600;
    font-family: 'Open Sans', sans-serif, 'Canva Sans';
    border-bottom-color: rgb(69, 69, 69, 0.2);
    border-bottom-style: solid;
    border-bottom-width: 3px;
  }

  .custom-button {
    margin-top: 20px;
    width: 100%; /* 全宽 */
    max-width: 800px; /* 适当限制最大宽度 */
    height: 50px; /* 按钮高度 */
    background-color: #f2f4f6; /* 浅灰色背景 */
    color: #333; /* 文字颜色 */
    border: none; /* 移除默认边框 */
    border-radius: 25px; /* 圆角 */
    font-size: 16px; /* 文字大小 */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
  }

  @media (max-width: 575px) {
    //导航的menu
    .hidden_small_res {
      /* 这里写你需要的样式 */
      display: none !important;
    }
    //navbar的图片

    .el-menu--horizontal {
      align-items: center;
      --el-menu-horizontal-height: 72px;
      padding-left: 0;
      padding-right: 0;
      font-family: 'Canva Sans', 'Open Sans', sans-serif;
    }
  }

  //响应式写在这里
  @media (min-width: 576px) and (max-width: 767px) {
    .hidden_small_res {
      /* 这里写你需要的样式 */
      display: none !important;
    }

    .el-menu--horizontal {
      align-items: center;
      --el-menu-horizontal-height: 72px;
      padding-left: 0;
      padding-right: 0;
      font-family: 'Canva Sans', 'Open Sans', sans-serif;
    }
  }

  /* 中等屏设备（≥768px） */
  @media (min-width: 768px) and (max-width: 991px) {
    .hidden_small_res {
      /* 这里写你需要的样式 */
      display: none !important;
    }
  }

  /* 大屏设备（≥992px） */
  @media (min-width: 992px) and (max-width: 1199px) {
    .hidden_small_res {
      /* 这里写你需要的样式 */
      display: none !important;
    }
  }

  /* 超大屏设备（≥1200px） */
  @media (min-width: 1200px) {
  }
</style>
