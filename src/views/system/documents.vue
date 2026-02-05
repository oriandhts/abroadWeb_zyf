<template>
  <el-container style="height: calc(100vh - 72px)">
    <!-- 侧边栏 -->
    <el-aside
      width="300px"
      class="display_none"
      style="background: #2c2e3e; padding: 20px; color: white"
    >
      <!-- 评分卡片 -->
      <el-card class="score-card">
        <div class="score-header">
          <div class="score-value">文书篇-{{ togglePSCV === 'CV' ? 'CV' : 'PS' }}</div>
        </div>
        <el-button
          :type="togglePSCV === 'CV' ? 'warning' : 'primary'"
          round
          @click="togglePSCVF()"
          >点击切换到部分{{ togglePSCV === 'CV' ? 'PS' : 'CV' }}</el-button
        >
      </el-card>

      <!-- 模块列表 -->
      <el-menu
        v-if="togglePSCV === 'CV'"
        default-active="1"
        class="el-menu-vertical"
        style="border-right: none"
        background-color="#2c2e3e"
        text-color="white"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <el-icon><document /></el-icon>
          <span> 个人信息 & 教育背景</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><user /></el-icon>
          <span> 研究 & 工作(实习)经历 </span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><school /></el-icon>
          <span> 竞赛 & 项目经历 </span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><briefcase /></el-icon>
          <span> 个人技能 & 个人特质 </span>
        </el-menu-item>
      </el-menu>

      <el-menu
        v-else
        default-active="1"
        class="el-menu-vertical"
        style="border-right: none"
        background-color="#2c2e3e"
        text-color="white"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <el-icon><document /></el-icon>
          <span> 引入背景 & 申请动机</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><user /></el-icon>
          <span> 主要经历 & 研究/实践 </span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><school /></el-icon>
          <span> 未来目标 & 择校原因 </span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><briefcase /></el-icon>
          <span> 总结 & 个人特质 </span>
        </el-menu-item>
      </el-menu>
      <el-divider style="margin: 16px 0" />
      <!-- 常用工具列表 -->
      <div>
        <div class="tittle">文书必备工具</div>
        <div>
          <el-button
            type="warning"
            plain
            class="toolList"
            v-for="tool in toolList"
            :key="tool.toolName"
            @click="locationToOther(tool.toolLink)"
            ><span class="topPart">{{ tool.toolType }}</span>
            <div>
              <img
                width="129px"
                height="30px"
                :src="tool.toolIcon"
                style="padding-left: 30px"
              />
            </div>
            <el-icon class="rightPart"><DArrowRight /></el-icon
          ></el-button>
        </div>
      </div>
    </el-aside>

    <!-- 主要内容区域 -->
    <el-main
      v-if="togglePSCV === 'CV'"
      style="background: #f4f5f7; padding: 20px"
    >
      <el-row>
        <el-col :span="23">
          <el-card class="resume-container">
            <!-- 顶部工具栏 -->
            <div class="toolbar">
              <el-button
                type="primary"
                plain
                >智能一页</el-button
              >
              <el-select
                v-model="selectedTemplate"
                placeholder="模板样式"
              >
                <el-option
                  label="简约风"
                  value="simple"
                ></el-option>
                <el-option
                  label="商务风"
                  value="business"
                ></el-option>
              </el-select>
              <el-button
                type="success"
                plain
                >添加模块</el-button
              >
            </div>
          </el-card>
        </el-col>
        <el-col :span="1">
          <div></div>
        </el-col>
      </el-row>
    </el-main>

    <el-main
      v-else
      style="background: #f4f5f7; padding: 20px"
    >
      <el-row>
        <el-col :span="23">
          <el-card class="resume-container">
            <!-- 顶部工具栏 -->
            <div class="toolbar">
              <div class="pdf-controls">
                <el-button
                  type="primary"
                  :disabled="!pdfSource"
                  @click="downloadPDF"
                >
                  下载PDF
                </el-button>
                <el-upload
                  class="upload-demo"
                  action="#"
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  accept=".pdf"
                >
                  <el-button type="primary">上传PDF</el-button>
                </el-upload>
              </div>
            </div>
            <div class="pdfEditor">
              <div
                class="pdf-viewer"
                v-if="pdfSource"
              >
                <VuePdfEmbed
                  :source="pdfSource"
                  :page="currentPage"
                  @rendered="handlePdfRendered"
                />
                <div class="pdf-navigation">
                  <el-button
                    :disabled="currentPage <= 1"
                    @click="currentPage--"
                  >
                    上一页
                  </el-button>
                  <span>第 {{ currentPage }} 页</span>
                  <el-button
                    :disabled="currentPage >= totalPages"
                    @click="currentPage++"
                  >
                    下一页
                  </el-button>
                </div>
              </div>
              <div
                v-else
                class="pdf-placeholder"
              >
                <el-empty description="请上传PDF文件" />
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="1">
          <div>111</div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
  <!-- 最右边的快乐小猫！ -->
  <div class="magic-cat1">
    <div class="cat-container">
      <!-- 粒子特效容器 -->
      <div
        class="particles"
        id="particles"
      ></div>

      <div class="cat-body1">
        <!-- 耳朵 -->
        <div class="ear left"></div>
        <div class="ear right"></div>

        <!-- 猫头 -->
        <div class="cat-head1">
          <div class="eyes">
            <div class="eye"></div>
            <div class="eye"></div>
          </div>
        </div>

        <!-- 信息面板 -->
        <div class="info-panel">
          <h3>喵星人助手</h3>
          <p>🤔 文书还是没有思路？</p>
          <p>项目不知道怎么包装？</p>
          <div class="social-icons">那就点击下面的猫猫👇</div>
        </div>
      </div>
    </div>
  </div>

  <div class="magic-cat2">
    <div class="cat-container">
      <!-- 粒子特效容器 -->
      <div
        class="particles"
        id="particles"
      ></div>

      <div class="cat-body2">
        <!-- 耳朵 -->
        <div class="ear left ear_blue"></div>
        <div class="ear right ear_blue"></div>

        <!-- 猫头 -->
        <div class="cat-head2">
          <div class="eyes">
            <div class="eye"></div>
            <div class="eye"></div>
          </div>
        </div>

        <!-- 信息面板 -->
        <div class="info-panel">
          <h3>让专业的我们来帮助你！</h3>
          <p>
            📧
            <el-button
              type="primary"
              @click="store.toggleOpenContact()"
              >点我点我！</el-button
            >
          </p>
          <p>🤓即可体验最用心最专业的留学服务</p>
          <div class="social-icons">喵~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Document, User, School, Briefcase, DArrowRight } from '@element-plus/icons-vue'
  import VuePdfEmbed from 'vue-pdf-embed'
  import type { UploadFile } from 'element-plus'

  // pinia全局部分
  import { useGlobalStore } from '@/stores/global'

  //svg部分
  import overleaf from '@/assets/svg/documents/overleaf.png'
  import chatgpt from '@/assets/svg/documents/chatgpt.png'
  import deepseek from '@/assets/svg/documents/deepseek.png'
  import grammarly from '@/assets/svg/documents/grammarly.png'
  import deepL from '@/assets/svg/documents/deepL.png'
  const store = useGlobalStore() // 获取 Pinia 状态管理

  const selectedTemplate = ref('simple')

  const toolList = [
    {
      toolName: 'ChatGpt',
      toolIcon: chatgpt,
      toolLink: 'https://chatgpt.com/',
      toolType: 'AI创作',
    },
    {
      toolName: 'OverLeaf',
      toolIcon: overleaf,
      toolLink: 'https://www.overleaf.com/',
      toolType: '文书排版',
    },
    {
      toolName: 'DeepSeek',
      toolIcon: deepseek,
      toolLink: 'https://chat.deepseek.com/',
      toolType: 'AI创造cn',
    },
    {
      toolName: 'Grammarly',
      toolIcon: grammarly,
      toolLink: 'https://www.grammarly.com/',
      toolType: '语法修改',
    },
    {
      toolName: 'DeepL Write',
      toolIcon: deepL,
      toolLink: 'https://www.deepl.com/',
      toolType: '学术写作',
    },
  ]
  // 切换ps和cv
  const togglePSCV = ref('CV')

  function togglePSCVF() {
    if (togglePSCV.value === 'CV') {
      togglePSCV.value = 'PS'
    } else {
      togglePSCV.value = 'CV'
    }
  }
  // 跳转到其他网页
  const locationToOther = (tool: string) => {
    window.open(tool, '_blank')
  }

  // 猫猫特效
  // 创建粒子动画
  function createParticles() {
    const particles = document.getElementById('particles')
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: rgba(255,182,193,0.6);
                    border-radius: 50%;
                    animation: float 3s infinite ${i * 0.1}s;
                `
      particles?.appendChild(particle)
    }
  }

  // 添加CSS关键帧动画
  const style = document.createElement('style')
  style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0,0) scale(1); }
                50% { transform: translate(${Math.random() * 40 - 20}px, ${
                  Math.random() * 40 - 20
                }px) scale(0.8); }
            }
        `
  document.head.appendChild(style)

  // 初始化
  window.addEventListener('DOMContentLoaded', () => {
    createParticles()
  })

  // 眼睛跟随鼠标
  //       document.addEventListener('mousemove', (e) => {
  //     const eyes = document.querySelectorAll('.eye');
  //     eyes.forEach(eye => {
  //         const rect = eye.getBoundingClientRect();
  //         const angle = Math.atan2(
  //             e.clientY - (rect.top + 12),
  //             e.clientX - (rect.left + 10)
  //         ) * 180 / Math.PI;
  //         eye.style.transform = `rotate(${angle}deg)`;
  //     });
  // });

  // // 添加呼吸动画
  // const catBody = document.querySelector('.cat-body');
  // setInterval(() => {
  //     catBody.style.transform = `scaleY(${0.98 + Math.random()*0.04})`;
  //     setTimeout(() => catBody.style.transform = '', 500);
  // }, 2000);

  // PDF Editor related code
  const pdfSource = ref<ArrayBuffer | null>(null)
  const currentPage = ref(1)
  const totalPages = ref(1)

  const handleFileChange = (file: UploadFile) => {
    if (file.raw) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          pdfSource.value = e.target.result as ArrayBuffer
          currentPage.value = 1
        }
      }
      reader.readAsArrayBuffer(file.raw)
    }
  }

  const handlePdfRendered = () => {
    // The page count will be available in the component's props
    totalPages.value = 1 // This will be updated by the component
  }

  const downloadPDF = () => {
    if (pdfSource.value) {
      const blob = new Blob([pdfSource.value], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'document.pdf'
      link.click()
      window.URL.revokeObjectURL(url)
    }
  }
</script>

<style scoped>
  .score-card {
    text-align: center;
    margin-bottom: 20px;
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    color: white;
    padding: 10px;
  }
  .score-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .resume-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
  }
  .toolbar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  .tittle {
    position: relative;
    font-size: 16px;
    padding-left: 15px;
    height: 20px;
  }

  .tittle::before {
    content: ''; /* 必须加上，否则不显示 */
    display: inline-block; /* 让伪元素变成一个可见块 */
    width: 10px; /* 设置方块宽度 */
    height: 20px; /* 设置方块高度 */
    background-color: yellow; /* 设置方块颜色 */
    position: absolute; /* 让小方块相对父元素定位 */
    left: 0; /* 让它紧贴左边 */
  }

  .toolList {
    margin-top: 18px;
    width: 100%;
    height: 50px;
    position: relative;

    .rightPart {
      margin-left: 30px;
    }
  }

  .toolList .topPart {
    width: 20px;
    height: 10px;
    position: absolute;
    left: 2px;
    top: 2px;
    font-weight: 700;
    font-size: 12px;
  }

  .el-button + .el-button {
    margin-left: 0px;
  }

  /* 响应式部分! */

  @media (min-width: 0px) and (max-width: 575px) {
    .display_none {
      display: none; /* 当视口小于 576px 时隐藏 */
    }
  }

  @media (min-width: 576px) and (max-width: 767px) {
  }

  /* 中等屏设备（≥768px） */
  @media (min-width: 768px) and (max-width: 991px) {
  }

  /* 大屏设备（≥992px） */
  @media (min-width: 992px) and (max-width: 1199px) {
  }

  /* 超大屏设备（≥1200px） */
  @media (min-width: 1200px) {
  }

  /* 猫猫部分 */
  .magic-cat1 {
    position: fixed;
    right: -120px;
    top: 30%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1000;
  }

  .magic-cat2 {
    position: fixed;
    right: -120px;
    top: 80%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 1000;
  }

  /* 悬停时的位移动画 */
  .magic-cat1:hover {
    right: -30px;
    transform: translateY(-50%) rotate(-5deg);
  }

  .magic-cat2:hover {
    right: -30px;
    transform: translateY(-50%) rotate(-5deg);
  }

  /* 猫容器 - 3D透视 */
  .cat-container {
    perspective: 1000px;
    position: relative;
  }

  /* 猫本体 */
  .cat-body1 {
    width: 150px;
    height: 200px;
    background: #ffb6c1;
    border-radius: 75px 75px 0 0;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }

  .cat-body2 {
    width: 150px;
    height: 200px;
    background: #50a4f2;
    border-radius: 75px 75px 0 0;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }

  /* 悬停时抬头动画 */
  .magic-cat1:hover .cat-body {
    transform: rotateX(-15deg) translateY(-20px);
  }

  .magic-cat2:hover .cat-body {
    transform: rotateX(-15deg) translateY(-20px);
  }

  /* 猫头 */
  .cat-head1 {
    width: 100px;
    height: 100px;
    background: #ffb6c1;
    border-radius: 50%;
    position: absolute;
    top: -30px;
    left: 25px;
    transition: transform 0.3s;
  }

  .cat-head2 {
    width: 100px;
    height: 100px;
    background: #50a4f2;
    border-radius: 50%;
    position: absolute;
    top: -30px;
    left: 25px;
    transition: transform 0.3s;
  }

  /* 信息面板 */
  .info-panel {
    position: absolute;
    top: 50%;
    left: -200px;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
    transition: all 0.5s;
    width: 180px;
  }

  /* 悬停时显示信息面板 */
  .magic-cat1:hover .info-panel {
    opacity: 1;
    transform: translateY(-50%) scale(1);
    left: -220px;
  }

  .magic-cat2:hover .info-panel {
    opacity: 1;
    transform: translateY(-50%) scale(1);
    left: -220px;
  }

  /* 粒子特效 */
  .particles {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  /* 其他装饰元素 */
  .ear {
    width: 20px;
    height: 40px;
    background: #ffb6c1;
    position: absolute;
    top: -40px;
    border-radius: 10px;
  }
  .ear.left {
    left: 20px;
    transform: rotate(-30deg);
  }
  .ear.right {
    right: 20px;
    transform: rotate(30deg);
  }

  .ear_blue {
    background: #50a4f2;
  }

  /* 眼睛 */
  .eyes {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 30px;
  }
  .eye {
    width: 20px;
    height: 25px;
    background: #2d1a0f;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
  }
  .eye::after {
    /* 高光 */
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    border-radius: 50%;
    top: 4px;
    left: 4px;
  }

  .pdfEditor {
    margin-top: 20px;
    /* min-height: 800px; */
    height: calc(100vh - 0px);
    display: flex;
    flex-direction: column;
    overflow: scroll;
  }

  .pdf-controls {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-shrink: 0;
  }

  .pdf-viewer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    flex: 1;
    overflow-y: auto; /* Enable vertical scrolling */
    overflow-x: hidden; /* Hide horizontal scroll */
    padding: 20px 0; /* Add some padding */
  }

  .pdf-navigation {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
    flex-shrink: 0;
    position: sticky; /* Keep navigation visible */
    bottom: 0;
    background: white;
    padding: 10px 0;
    z-index: 1;
  }

  .pdf-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    min-height: 400px;
  }

  /* Make the PDF viewer responsive */
  :deep(.vue-pdf-embed) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px; /* Add space at bottom */
  }

  :deep(.vue-pdf-embed canvas) {
    max-width: 100%;
    height: auto;
    display: block; /* Remove extra space */
  }
</style>
