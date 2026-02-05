<script setup lang="ts">
  import {
    Search,
    // ... 其他需要的图标
  } from '@element-plus/icons-vue'

  import { routerTo } from '@/utils/route/route'
  import axios from 'axios'

  // 导入需要使用的图片
  // import homepage_portrait from '@/assets/images/homepage/homepage_portrait.png'
  import timeline from '@/assets/images/homepage/timeline.png'
  import service from '@/assets/images/homepage/services.png'
  import offer from '@/assets/images/homepage/offer.png'
  import consultations from '@/assets/images/homepage/consultations.png'
  import shape from '@/assets/images/homepage/shape.png'

  localStorage.setItem('formData', JSON.stringify({ name: 'Alice' }))

  const getKoa = async () => {
    console.log('执行了吗？')
    const response = await axios.get('http://localhost:3000/')
    console.log('用户列表：', response.data)
  }
</script>

<template>
  <main class="main">
    <div class="content">
      <div class="realContent p_lr2">
        <div class="left_content">
          <el-image
            class="left_image"
            src="/homepage_portrait.webp"
          ></el-image>
          <div class="left_box">
            <div class="left_box_line1">最全面&nbsp;&nbsp;最实用的</div>
            <div class="left_box_line1">计算机类留学</div>
            <p class="left_box_line2">
              100% Authentic reliable and
              <span class="left_box_line2_span">real</span>
            </p>
          </div>
        </div>
        <div class="right_content">
          <div class="forgap"></div>
          <div class="right_box">
            <el-button
              type="primary"
              round
              size="large"
              color="rgb(15, 112, 230)"
              @click="() => routerTo('choose')"
              class="el-button-text"
            >
              学校选择 & 项目选择<el-icon class="el-icon--right"><Search /></el-icon>
            </el-button>
            <div>
              <p class="right_box_text">点击探索项目,</p>
              <span class="right_box_text2">explore all programmes ​</span>
            </div>
          </div>
          <div>
            <div class="right_selectBox">
              <div>
                <div class="right_box_text font_1rem"><span>More infomation?</span></div>
                <div class="right_box_text font_1rem"><span>Try one of these:</span></div>
              </div>
              <div class="right_carousel">
                <div class="right_carousel_img">
                  <button>
                    <el-image
                      :src="timeline"
                      class="inheritWH"
                    ></el-image>
                  </button>
                  <p @click="getKoa">留学时间线</p>
                </div>
                <div class="right_carousel_img">
                  <button>
                    <el-image
                      :src="service"
                      class="inheritWH"
                    ></el-image>
                  </button>
                  <p>留学服务</p>
                </div>
                <div class="right_carousel_img">
                  <button>
                    <el-image
                      :src="offer"
                      class="inheritWH"
                    ></el-image>
                  </button>
                  <p>留学offer</p>
                </div>
                <div class="right_carousel_img">
                  <button>
                    <el-image
                      :src="consultations"
                      class="inheritWH"
                    ></el-image>
                  </button>
                  <p>留学资讯</p>
                </div>
              </div>
            </div>
            <p class="right_notifications">
              以上都是自己包括身边在港新英澳留学同学的真实信息和经历,具有很强的参考价值,但每年的申请条件和环境都在改变,也需要结合自身条件和状况进行调整。
            </p>
          </div>

          <div class="right_decoration1">
            <el-image
              :src="shape"
              style="width: 254px; height: 302px"
            ></el-image>
          </div>
          <svg
            width="34"
            height="27"
            viewBox="0 0 34 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="right_decoration2"
          >
            <path
              d="M33.8167 1.68928C33.68 1.41639 33.4726 1.1859 33.2164 1.0223C32.9602 0.858703 32.6649 0.768091 32.3618 0.760085L1.71198 0H1.67137C1.37184 0.00107942 1.07808 0.0829958 0.820576 0.237246C0.563072 0.391496 0.351224 0.612448 0.207062 0.877146C0.0629004 1.14184 -0.00833251 1.44064 0.000775816 1.74247C0.00988414 2.04431 0.098999 2.33817 0.258855 2.59355L15.055 26.2114C15.2027 26.4471 15.4059 26.6423 15.6464 26.7799C15.887 26.9175 16.1575 26.9931 16.4339 27H16.4745C16.7443 26.9999 17.01 26.9342 17.2492 26.8083C17.4884 26.6825 17.6938 26.5003 17.8482 26.2773L33.7019 3.42128C33.8743 3.16991 33.9761 2.87618 33.9963 2.57124C34.0165 2.2663 33.9544 1.96153 33.8167 1.68928Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <svg
        width="98"
        height="132"
        viewBox="0 0 98 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="left_decoration1"
      >
        <path
          d="M46.9684 132C46.3582 132 45.7557 132 45.1494 131.951C44.6766 131.926 44.2134 131.808 43.7861 131.603C43.3589 131.398 42.976 131.111 42.6593 130.758C42.3426 130.405 42.0982 129.993 41.9403 129.545C41.7824 129.098 41.7139 128.623 41.7388 128.149C41.7637 127.675 41.8815 127.21 42.0854 126.781C42.2893 126.353 42.5753 125.969 42.9272 125.651C43.2791 125.333 43.6899 125.088 44.1362 124.93C44.5825 124.771 45.0556 124.702 45.5283 124.727C59.2502 125.488 80.2707 113.551 88.494 95.2532C90.3887 91.0295 92.8253 83.1715 87.7777 78.0241C85.4623 75.6671 82.4724 74.3669 79.3953 73.7016C78.8117 74.5912 78.1978 75.458 77.546 76.3057C70.2663 85.7757 55.3659 99.5491 44.1982 98.6861C40.3329 98.3896 37.2785 96.4051 35.3686 92.9076C33.7959 90.0412 33.8528 86.6729 35.5278 83.4262C36.8428 80.8829 39.1126 78.3929 42.2807 76.0282C50.4888 69.8924 63.7825 65.2924 75.5111 65.95C79.9145 56.9515 80.4943 46.5046 76.269 41.2051C74.1355 38.5211 70.2057 34.8601 60.7584 34.0465C57.9495 33.8716 55.1304 33.9607 52.3381 34.3127C48.954 44.6038 40.4238 53.7999 32.5492 57.6548C25.6295 61.0421 19.7141 60.046 16.7317 54.9936C13.4121 49.3672 14.837 44.8052 16.6104 41.9654C21.4042 34.3089 34.9517 29.8381 46.4605 27.8993C46.8775 25.1558 46.5865 22.3509 45.6155 19.7523C43.6866 14.8102 39.3741 10.826 33.7846 8.82636C26.1677 6.10057 16.1709 6.92552 4.8781 11.2328C4.43594 11.401 3.96514 11.4803 3.49246 11.466C3.01978 11.4517 2.55454 11.3441 2.12329 11.1494C1.25236 10.7562 0.572784 10.032 0.234084 9.13617C-0.104616 8.24033 -0.0747715 7.24622 0.317165 6.3725C0.709101 5.49878 1.43098 4.81707 2.32397 4.47729C15.4206 -0.510484 26.8195 -1.33547 36.2062 2.02519C43.7549 4.72817 49.6286 10.2292 52.3192 17.1178C53.5254 20.2528 54.0299 23.6155 53.7971 26.9678C56.3162 26.7255 58.8507 26.6861 61.3761 26.85C70.5506 27.6408 77.2656 30.8607 81.9039 36.7039C87.5693 43.8358 87.6603 56.1151 82.8893 67.1666C86.6655 68.1971 90.111 70.1919 92.8898 72.9565C98.8621 79.0391 99.6276 88.0187 95.0385 98.2223C87.5883 114.893 66.7497 132 46.9684 132ZM70.8423 73.1922C69.8684 73.2568 68.9665 73.3519 68.1707 73.4583C60.4022 74.4848 52.1373 77.6934 46.6008 81.822C43.6298 84.0383 40.5641 87.3648 41.6744 89.4253C42.4096 90.7597 43.3266 91.3755 44.7514 91.4858C50.6972 91.961 62.3766 83.6885 70.8423 73.196V73.1922ZM44.0504 35.6889C34.8987 37.6619 25.622 41.2165 22.742 45.8165C21.9841 47.0482 21.3928 48.6639 22.9617 51.3213C24.163 53.359 27.5091 52.1044 29.4266 51.173C34.8722 48.5157 40.7611 42.4938 44.058 35.6927L44.0504 35.6889Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  </main>
</template>

<style scope lang="scss">
  .main {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    min-height: calc(-72px + 100vh);
  }
  .content {
    padding-top: 2rem !important;
    position: relative;
  }

  .realContent {
    max-width: 64rem;
    display: flex;
    gap: 4rem;
  }

  .left_content {
    display: flex;
  }

  .left_box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .left_box_line1 {
    tab-size: 4;
    font-size: 3.75rem;
    line-height: 4.25rem;
    box-sizing: border-box;
    margin: 0 !important;
    font-family: Poppins, sans-serif;
    font-weight: 600;
    color: rgb(69 69 69 / 1);
    text-align: left !important;
  }
  .left_box_line2 {
    tab-size: 4;
    font-family:
      Canva Sans,
      Open Sans,
      sans-serif !important;
    margin: 0 !important;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 550;
    color: rgb(69 69 69 / 1) !important;
    text-align: left !important;
  }

  .left_box_line2_span {
    tab-size: 4;
    font-feature-settings: normal;
    font-family:
      Canva Sans,
      Open Sans,
      sans-serif !important;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: #fff;

    --tw-text-opacity: 1;
    text-align: left !important;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
    box-sizing: border-box;
    padding-left: 1.2rem !important;
    padding-right: 2rem !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;

    // 背景图
    background-image: url('@/assets/svg/homepage_pattern.svg');
    background-size: cover;
    background-position: center;
    background-repeat: repeat;
  }

  .right_content {
    // width: 500px;
    // 随时需要改正
    font-feature-settings: normal;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #454545;
    text-align: left;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
    box-sizing: border-box;
    position: relative;
    display: flex;
    max-width: 28rem;
    flex-direction: column;
    margin-top: 7rem;
    gap: 2rem;
  }

  .right_box {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #454545;
    text-align: left;
    font-family:
      Canva Sans,
      Open Sans,
      sans-serif !important;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
    box-sizing: border-box;
    background-color: #fff !important;
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: column;
    border-radius: 2rem;
    --tw-bg-opacity: 1;
    --tw-shadow: 0px 0px 56px rgba(69, 69, 69, 0.2);
    --tw-shadow-colored: 0px 0px 56px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
      var(--tw-shadow);
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-bottom: 4rem;
    padding-top: 9rem;
  }

  .right_box_text {
    text-align: left;
    font-family:
      Canva Sans,
      Open Sans,
      sans-serif !important;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;
    box-sizing: border-box;
    margin: 0 !important;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    --tw-text-opacity: 1;
    color: rgb(84 97 108 / var(--tw-text-opacity));
  }

  .right_box_text2 {
    font-weight: 400;
    font-family:
      Canva Sans,
      Open Sans,
      sans-serif !important;
    border-width: 0;
    border-style: solid;
    border-color: currentColor;

    box-sizing: border-box;
    text-align: center !important;
    font-size: 0.75rem;
    line-height: 1rem;
    --tw-text-opacity: 1;
    color: rgb(84 97 108 / 1);
  }

  .el-button--large {
    font-size: 24px !important;
  }

  .el-button--large.is-round {
    padding: 28px 23px !important;
  }

  .right_selectBox {
    display: flex;
    gap: 1rem;
  }

  .right_carousel {
    display: flex;
    gap: 0.5rem;
  }
  .right_carousel_img {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .right_carousel > div > button {
    max-height: 4rem;
    max-width: 4rem;
    cursor: pointer;
    border-style: dotted;
    border-color: #fff;
  }

  .right_carousel > div > p {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
  }

  button {
    padding: 0;
    margin: 0;
  }

  .right_decoration1 {
    position: absolute;
    right: -65%;
    top: -16%;
  }

  .right_decoration2 {
    position: absolute;
    right: -25%;
    top: 30%;
    color: rgb(254, 195, 17);
    transform: rotate(20deg); /* 顺时针旋转 20° */
  }

  .right_decoration2:hover {
    transform-origin: top left; /* 设置旋转中心为左上角 */
    transform: rotate(60deg); /* 顺时针旋转 20° */
    transition: transform 0.3s ease; /* 添加动画效果 */
  }

  .right_notifications {
    box-sizing: border-box;
    margin: 0;
    margin-bottom: 1rem;
    margin-top: 1rem !important;
    font-size: 0.625rem;
    line-height: 1rem;
    --tw-text-opacity: 0.8;
    color: rgb(84 97 108 / var(--tw-text-opacity));
    text-align: left !important;
  }

  .left_decoration1 {
    color: rgb(254, 195, 17);
    position: absolute;
    left: -13%;
  }

  @media (min-width: 1024px) {
    .left_content {
      max-width: 32rem;
      flex-direction: column;
    }

    .left_image {
      width: 420px;
    }
  }

  @media (min-width: 777px) and (max-width: 1023px) {
    .realContent {
      flex-direction: column;
      align-items: center;
    }
    .left_content {
      gap: 2rem;
      flex-direction: row;
    }
    .left_image {
      max-width: 320px;
    }

    .right_content {
      margin-top: 1rem;
    }

    .left_box_line1 {
      font-size: 3rem;
    }

    .left_box_line2 {
      font-size: 2rem;
    }

    .left_box {
      justify-content: space-around;
    }
  }

  @media (min-width: 575px) and (max-width: 776px) {
    .left_image {
      max-width: 320px;
    }
    .realContent {
      flex-direction: column;
      gap: 0;
    }
    .left_content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 30px;
    }

    .right_content {
      margin-top: 3rem;
    }

    .left_box_line1 {
      font-size: 3rem;
      line-height: 3.2rem;
      text-align: center;
    }

    .left_box_line2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 574px) {
    .left_image {
      max-width: 300px;
    }
    .realContent {
      flex-direction: column;
      gap: 0;
    }
    .left_content {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 30px;
    }

    .right_content {
      margin-top: 1.5rem;
    }

    .left_box_line1 {
      font-size: 2.3rem;
      line-height: 2.8rem;
      text-align: center !important;
    }

    .left_box_line2 {
      font-size: 1rem;
    }

    .el-button-text {
      font-size: 1.2rem !important;
    }
  }
</style>
