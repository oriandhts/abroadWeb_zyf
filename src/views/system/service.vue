<template>
  <el-container style="height: 100vh">
    <!-- 侧边栏 -->
    <el-aside
      width="300px"
      style="background: #2c2e3e; padding: 20px; color: white"
    >
      <!-- 评分卡片 -->
      <el-card class="score-card">
        <div class="score-header">
          <span class="score-value">86</span>
          <span class="score-text">分</span>
        </div>
        <el-button
          type="warning"
          round
          >智能检查</el-button
        >
      </el-card>

      <!-- 模块列表 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        background-color="#2c2e3e"
        text-color="white"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <el-icon><document /></el-icon>
          <span> 简历纠错 </span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><user /></el-icon>
          <span> 基本信息 </span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><school /></el-icon>
          <span> 教育经历 </span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><briefcase /></el-icon>
          <span> 工作经历 </span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主要内容区域 -->
    <el-main style="background: #f4f5f7; padding: 20px">
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

        <!-- 简历内容 -->
        <el-tabs v-model="activeTab">
          <el-tab-pane
            label="基本信息"
            name="basic"
          >
            <el-form label-width="120px">
              <el-form-item label="姓名">
                <el-input v-model="resume.name"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="resume.contact"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane
            label="教育经历"
            name="education"
          >
            <el-form label-width="120px">
              <el-form-item label="学校">
                <el-input v-model="resume.education.school"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="resume.education.major"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane
            label="工作经历"
            name="work"
          >
            <el-form label-width="120px">
              <el-form-item label="公司">
                <el-input v-model="resume.work.company"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                <el-input v-model="resume.work.position"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Document, User, School, Briefcase } from '@element-plus/icons-vue'

  const activeTab = ref('basic')
  const selectedTemplate = ref('simple')
  const resume = ref({
    name: '实打实打算',
    contact: '131312312 | email@example.com',
    education: { school: '四川大学', major: '软件工程' },
    work: { company: '某某公司', position: '前端工程师' },
  })
</script>

<style scoped>
  .score-card {
    text-align: center;
    margin-bottom: 20px;
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    color: white;
    padding: 20px;
  }
  .score-header {
    font-size: 24px;
    font-weight: bold;
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
</style>
