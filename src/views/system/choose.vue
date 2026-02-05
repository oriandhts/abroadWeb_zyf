<script setup lang="ts">
  import FligSvg_eg from '@/assets/svg/english_flag.svg'
  import FligSvg_sz from '@/assets/svg/shenzhen_flag.svg'
  import FlagSvg_hk from '@/assets/svg/hongkong_flag.svg'
  import FlagSvg_sg from '@/assets/svg/singapore_flag.svg'
  import FlagSvg_au from '@/assets/svg/australia_flag.svg'
  import FlagSvg_am from '@/assets/svg/america_flag.svg'
  import FlagSvg_eu from '@/assets/svg/europe_flag.svg'

  // import choose_background from '@/assets/images/choose/choose_background.png'
  import hongkong_sz from '@/assets/images/choose/hongkong_sz.png'
  import singapore from '@/assets/images/choose/singapore.png'
  import hongkong from '@/assets/images/choose/hongkong.png'
  import english from '@/assets/images/choose/English.png'
  import europe from '@/assets/images/choose/europe.png'
  import america from '@/assets/images/choose/America.png'
  import australia from '@/assets/images/choose/australia.png'

  // 需要的icon
  import {
    School,
    // ... 其他需要的图标
  } from '@element-plus/icons-vue'

  //   router部分
  import { routerToParam } from '@/utils/route/route'
  import { reactive } from 'vue'

  // 获取到涉及的国家地区
  const countryList = reactive([
    { country: '英国地区', countryName: 'english' },
    { country: '港中深/港科广地区', countryName: 'hongkong_sz' },
    { country: '香港地区', countryName: 'hongkong' },
    { country: '新加坡地区', countryName: 'singapore' },
    { country: '澳大利亚地区', countryName: 'australia' },
    { country: '美国地区', countryName: 'america' },
    { country: '欧陆地区', countryName: 'europe' },
  ])
</script>

<template>
  <main>
    <div class="mainDiv sm-down-none">
      <div class="mainPhoto">
        <el-image
          src="/choose_background.webp"
          class="backGround"
        />
        <div
          class="country-icon-wrapper forEnglish normalSize"
          @click="() => routerToParam('programme', 'english')"
        >
          <img
            :src="FligSvg_eg"
            alt="英国地区项目"
            class="country-flag-wrapper"
          />
          <el-image :src="english"> </el-image>
          <div>
            <span class="country-text-wrapper">英国地区项目</span>
          </div>
        </div>
        <div
          class="country-icon-wrapper forShenzhen normalSize"
          @click="() => routerToParam('programme', 'hongkong_sz')"
        >
          <img
            :src="FligSvg_sz"
            alt="港中深/港科广地区项目"
            class="country-flag-wrapper"
          />
          <el-image :src="hongkong_sz"> </el-image>
          <div>
            <span class="country-text-wrapper">港中深/港科广地区项目</span>
          </div>
        </div>
        <div
          class="country-icon-wrapper forHongkong normalSize"
          @click="() => routerToParam('programme', 'hongkong')"
        >
          <img
            :src="FlagSvg_hk"
            alt="香港地区项目"
            class="country-flag-wrapper"
          />
          <el-image :src="hongkong"> </el-image>
          <div>
            <span class="country-text-wrapper">香港地区项目</span>
          </div>
        </div>
        <div
          class="country-icon-wrapper forSingapore normalSize"
          @click="() => routerToParam('programme', 'singapore')"
        >
          <img
            :src="FlagSvg_sg"
            alt="新加坡地区项目"
            class="country-flag-wrapper"
          />
          <el-image :src="singapore"> </el-image>
          <div>
            <span class="country-text-wrapper">新加坡地区项目</span>
          </div>
        </div>
        <div
          class="country-icon-wrapper forAustralia normalSize"
          @click="() => routerToParam('programme', 'australia')"
        >
          <img
            :src="FlagSvg_au"
            alt="澳大利亚地区项目"
            class="country-flag-wrapper"
          />
          <el-image :src="australia"> </el-image>
          <div>
            <span class="country-text-wrapper">澳大利亚地区项目</span>
          </div>
        </div>

        <div
          class="country-icon-wrapper ForOthers otherSize flex"
          data-no-animation="true"
          style="
            background-image: url('@/assets/images/choose/other_background.jpg');
            background-size: cover;
          "
        >
          <div
            style="position: absolute; right: 0%; top: 2%"
            class="country-text-wrapper"
          >
            这些地区还在努力学习中......敬请期待
          </div>
          <div style="width: 80px; height: 70px; position: relative">
            <img
              :src="FlagSvg_am"
              alt="美国地区项目"
              class="country-flag-wrapper"
            />
            <el-image :src="america"> </el-image>
            <div>
              <span
                class="country-text-wrapper"
                style="font-size: 16px"
                >美国地区项目</span
              >
            </div>
          </div>
          <div style="width: 80px; height: 70px; position: relative">
            <img
              :src="FlagSvg_eu"
              alt="欧陆地区项目"
              class="country-flag-wrapper"
            />
            <el-image :src="europe"> </el-image>
            <div>
              <span
                class="country-text-wrapper"
                style="font-size: 16px"
                >欧陆地区项目</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 当响应式到768px以下的时候 -->
    <div class="container sm-up-none">
      <!-- 标题 -->
      <h1>
        <el-icon size="16px"><School color="rgb(173, 216, 230)" /></el-icon>选择项目地区
      </h1>
      <!-- 获取 -->
      <el-card
        v-for="country in countryList"
        :key="country.countryName"
        class="mg-b-20"
      >
        <el-button
          style="width: 100%; height: 100%; color: black"
          @click="() => routerToParam('programme', country.countryName)"
          :disabled="country.countryName === 'america' || country.countryName === 'europe'"
          >{{ country.country }}</el-button
        >
      </el-card>
    </div>
  </main>
</template>

<style scope lang="scss">
  .mainDiv {
    display: flex;
    justify-content: center; /* 水平方向分布 */
  }

  .mainPhoto {
    position: relative;
  }
  .backGround {
    height: calc(100vh - 72px);
    margin: 0 auto;
  }

  .country-icon-wrapper {
    position: absolute;
    text-align: center;
  }

  .country-flag-wrapper {
    position: absolute;
    top: 5%;
    left: 5%;
    z-index: 1;
  }

  .country-text-wrapper {
    display: inline-block; /* 使元素宽度自适应文字 */
    padding: 5px 15px; /* 内边距，控制上下左右的间距 */
    background-color: white; /* 背景颜色为白色 */
    color: black; /* 字体颜色为黑色 */
    font-size: 22px; /* 字体大小 */
    font-weight: 500; /* 字体粗细 */
    border-radius: 20px; /* 圆角 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    text-align: center; /* 文本居中 */
    font-family: 'Montserrat', sans-serif; /* 字体样式 */
  }
  .forEnglish {
    top: 8%;
    left: 8%;
  }

  .forShenzhen {
    top: 5%;
    left: 47%;
  }

  .forHongkong {
    top: 20%;
    right: 8%;
  }

  .forSingapore {
    left: 39%;
    top: 49%;
  }

  .forAustralia {
    bottom: 1%;
    right: 14%;
  }

  .forAmerica {
    top: 1%;
    left: 1%;
  }

  .ForOthers {
    left: 3%;
    bottom: 2%;
    border-width: 2px;
    border-style: dashed;
    border-color: azure;
    cursor: none;
  }
  /* 鼠标移入时触发动画 */
  .country-icon-wrapper:hover {
    cursor: pointer;
    animation: move-up-down 1s linear infinite;
  }

  /* 定义动画 */
  @keyframes move-up-down {
    0% {
      transform: translateY(0); /* 初始位置 */
    }
    50% {
      transform: translateY(-20px); /* 向上移动 */
    }
    100% {
      transform: translateY(0); /* 返回初始位置 */
    }
  }

  .country-icon-wrapper[data-no-animation='true']:hover {
    animation: none;
    cursor: help;
  }

  .normalSize {
    max-width: 300px;
    max-height: 340px;
  }

  .otherSize {
    width: 400px;
    height: 250px;
  }

  .smallSize {
    width: 80px;
    height: 70px;
  }

  //  flex布局+均匀布局
  .flex {
    display: flex;
    justify-content: space-around;
    align-items: center; /* 垂直居中 */
  }

  //响应式布局
  @media (min-width: 0px) and (max-width: 575px) {
    .sm-down-none {
      display: none;
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
    .sm-down-none {
      display: none;
    }
  }

  /* 中等屏设备（≥768px） */
  @media (min-width: 768px) and (max-width: 991px) {
    .sm-up-none {
      display: none;
    }
    .normalSize {
      max-width: 150px;
      max-height: 250px;
    }

    .otherSize {
      width: 240px;
      height: 150px;
    }
  }

  /* 大屏设备（≥992px） */
  @media (min-width: 992px) and (max-width: 1199px) {
    .sm-up-none {
      display: none;
    }
    .normalSize {
      max-width: 200px;
      max-height: 330px;
    }

    .otherSize {
      width: 300px;
      height: 200px;
    }
  }

  /* 超大屏设备（≥1200px） */
  @media (min-width: 1200px) {
    .sm-up-none {
      display: none;
    }
  }

  .mg-b-20 {
    margin-bottom: 20px;
  }
</style>
