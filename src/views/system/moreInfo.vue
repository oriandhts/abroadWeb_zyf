<template>
  <div class="info-body">
    <div class="info-row">
      <div class="info-label">
        <span class="cn">项目学制</span>
        <span class="en">(Study Mode)</span>
      </div>
      <div class="info-value split-col">
        <div class="col-item">
          <span class="sub-label">Full-time:</span>
          <span class="val-text">{{ programme?.Duration || '-' }}</span>
        </div>
        <div class="col-item">
          <span class="sub-label">Part-time:</span>
          <span class="val-text">{{ programme?.Duration_part || '-' }}</span>
        </div>
      </div>
    </div>

    <div class="info-row bg-stripe">
      <div class="info-label">
        <span class="cn">项目简称</span>
        <span class="en">(Abbreviation)</span>
      </div>
      <div class="info-value">{{ programme?.Program_Abbr || '-' }}</div>
    </div>

    <div class="info-row">
      <div class="info-label">
        <span class="cn">项目所属学院</span>
        <span class="en">(Faculty/School)</span>
      </div>
      <div class="info-value faculty-value">
        <div class="faculty-cn">{{ programme?.Faculty_CN || '-' }}</div>
        <div class="faculty-en">{{ programme?.Faculty_EN || '' }}</div>
      </div>
    </div>

    <div class="info-row bg-stripe">
      <div class="info-label">
        <span class="cn">语言要求</span>
        <span class="en">(Language Req)</span>
      </div>
      <div class="info-value split-col">
        <div class="col-item">
          <span class="sub-label">雅思 (IELTS):</span>
          <span class="val-text">{{ programme?.Language_Req.split('/')[0] || '-' }}</span>
        </div>
        <div class="col-item">
          <span class="sub-label">GRE:</span>
          <span class="val-text">{{ programme?.Language_Req.split('/')[1] || '-' }}</span>
        </div>
      </div>
    </div>

    <div class="info-row">
      <div class="info-label">
        <span class="cn">项目学费</span>
        <span class="en">(Tuition Fee)</span>
      </div>
      <div class="info-value split-col">
        <div class="col-item">
          <span class="sub-label">当地货币:</span>
          <span class="val-text highlight">{{ programme?.Tuition_Fee || '-' }}</span>
        </div>
        <div class="col-item">
          <span class="sub-label">约合人民币:</span>
          <span class="val-text highlight">{{ '￥' + programme?.tuition_fee_rmb || '-' }}</span>
        </div>
      </div>
    </div>

    <div class="info-row bg-stripe">
      <div class="info-label">
        <span class="cn">毕业要求</span>
        <span class="en">(Graduation Req)</span>
      </div>
      <div class="info-value">{{ programme?.Credits || '-' }}</div>
    </div>

    <div class="info-row">
      <div class="info-label">
        <span class="cn">项目网站</span>
        <span class="en">(Official Website)</span>
      </div>
      <div class="info-value">
        <a
          v-if="programme?.Program_Overview"
          :href="programme.Program_Overview"
          target="_blank"
          class="link-btn"
        >
          访问官网参观
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="link-icon"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line
              x1="10"
              y1="14"
              x2="21"
              y2="3"
            ></line>
          </svg>
        </a>
        <span v-else>-</span>
      </div>
    </div>

    <div class="info-row desc-row bg-stripe">
      <div class="info-label">
        <span class="cn">项目描述</span>
        <span class="en">(Description)</span>
      </div>
      <div class="info-value description-text">
        {{ programme?.Course_Review || '暂无描述' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  const props = defineProps({
    programme: {
      type: Object,
      default: () => ({}),
    },
  })

  // 保持响应式，点击不同项目时内容会更新
  const { programme } = toRefs(props)
</script>

<style scoped>
  .info-body {
    --el-color-primary: #409eff;
    --theme-orange: #f5a623;
    padding: 8px 0 0;
  }

  /* 每一行信息 */
  .info-row {
    display: flex;
    padding: 18px 24px;
    border-bottom: 1px solid #ebeef5;
    transition: background-color 0.3s;
  }

  .info-row:last-child {
    border-bottom: none;
  }

  .info-row:hover {
    background-color: #fafdff;
  }

  /* 斑马纹背景 */
  .bg-stripe {
    background-color: #fafafa;
  }

  /* 左侧标签列 */
  .info-label {
    width: 160px; /* 稍微缩窄一点，给右边留出更多空间 */
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 3px solid var(--el-color-primary);
    padding-right: 16px;
    margin-right: 24px;
  }

  .info-label .cn {
    font-weight: 600;
    color: #303133; /* Element Plus 的一级文本色 */
    font-size: 15px;
  }

  .info-label .en {
    font-size: 12px;
    color: #909399; /* Element Plus 的常规/次要文本色 */
    margin-top: 4px;
  }

  /* 右侧内容列 */
  .info-value {
    flex: 1;
    color: #606266;
    font-size: 14px;
    line-height: 1.6;
    display: flex;
    align-items: center;
    font-weight: 600; /* 数据整体略加粗 */
  }

  /* 两列布局特制 (学制、语言、学费) */
  .split-col {
    display: flex;
    gap: 20px;
  }

  .col-item {
    flex: 1;
    background: #f4f8ff; /* 浅蓝色底，清爽 */
    padding: 10px 16px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e1ebfa;
  }

  .sub-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 4px;
  }

  .val-text {
    font-weight: 700; /* 具体数值更强调 */
    color: #303133;
  }

  .val-text.highlight {
    color: var(--theme-orange);
    font-size: 16px;
    font-weight: 600;
  }

  /* 链接按钮样式 */
  .link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--el-color-primary);
    text-decoration: none;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 4px;
    border: 1px solid var(--el-color-primary);
    transition: all 0.3s;
  }

  .link-btn:hover {
    background: var(--el-color-primary);
    color: white;
  }

  /* 长文本描述 */
  .desc-row .info-label {
    justify-content: flex-start; /* 顶部对齐，防止长文本拉伸标签 */
    padding-top: 4px;
  }

  .description-text {
    align-items: flex-start;
    white-space: pre-wrap; /* 自动换行并保留空格 */
    line-height: 1.8;
  }

  /* 学院行：中英文分两行显示 */
  .faculty-value {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .faculty-cn {
    font-size: 14px;
    font-weight: 700;
    color: #303133;
  }

  .faculty-en {
    font-size: 12px;
    font-weight: 500;
    color: #909399;
  }
</style>
