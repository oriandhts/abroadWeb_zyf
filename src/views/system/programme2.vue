<script setup lang="js">
  import { reactive, ref, watch, computed, onMounted } from 'vue'
  //todo:
  // import { useRoute } from 'vue-router'

  // 导入的组件
  import moreInfo from './moreInfo.vue'

  // provice and inject
  import { provide } from 'vue'
  const provideValue = ref('hello')
  provide(/* key */ 'message', /* value */ provideValue)

  import {
    Search,
    School,
    Histogram,
    Delete,
    Select,
    // ... 其他需要的图标
  } from '@element-plus/icons-vue'
  import {
    COUNTRTY_LIST,
    FIELD_LIST,
    TUITION_RANGE,
    PROGRAMME_DURATION,
    SPECIAL_SEMISTER,
  } from '@/constants/area'

  //api
  // todo:导入api
  // import { getProgramByCon } from '@/api/system/programme'
  // 多选框
  const selectSingle = reactive({
    region: COUNTRTY_LIST,
    program_type: FIELD_LIST,
    tuition_fee: TUITION_RANGE,
    duration: PROGRAMME_DURATION,
    special: SPECIAL_SEMISTER,
  })

  // placeholder 映射对象
  const placeholderMap = {
    region: '项目区域',
    program_type: '项目类型',
    tuition_fee: '学费范围',
    duration: '学制年限',
    special: '入学时间',
  }

  // const route = useRoute()

  // 跳转参数（如 english、hongkong）与 region 下拉选项文案对应，用于进入页时回显
  // const regionParamToLabel = {
  //   english: '英国',
  //   hongkong: '香港',
  //   hongkong_sz: '香港',
  //   singapore: '新加坡',
  //   australia: '澳大利亚',
  //   国内: '国内',
  //   美国: '美国',
  //   英国: '英国',
  //   香港: '香港',
  //   新加坡: '新加坡',
  //   澳大利亚: '澳大利亚',
  // }

  // 初始化 selectResult，确保每个值都是数组
  const selectResult = ref({
    region: [],
    program_type: [],
    tuition_fee: [],
    duration: [],
    special: [],
  })

  // 收集所有 select 的值并打印
  const collectSelectValues = () => {
    const collectedData = {}

    // 遍历所有 selectKey，收集有值的项
    Object.keys(selectSingle).forEach((key) => {
      const value = selectResult.value[key]
      if (value && Array.isArray(value) && value.length > 0) {
        collectedData[key] = value
      }
    })

    return collectedData
  }

  // 监听 selectResult 的变化，自动打印
  watch(
    selectResult,
    () => {
      collectSelectValues()
    },
    { deep: true },
  )

  // 把 collectSelectValues 返回的所有 value 扁平为一维数组，用于筛选结果展示
  // todo:
  const filterResultTags = computed(() => {
    const data = collectSelectValues()
    return Object.values(data).flat()
  })

  // 筛选结果标签轮流使用不同类型，更美观
  // todo:
  const filterTagTypes = ['primary', 'success', 'warning', '']
  const filterTagTypeByIndex = (index) => filterTagTypes[index % filterTagTypes.length]

  // 搜索框
  const searchResult = ref('')

  // 加载状态（搜索 / 翻页时）
  const loading = ref(false)

  // 分页
  const currentPage = ref(1)
  const pageSize = ref(8)
  const total = ref(0)
  // const totalPages = ref(0)
  const pageSizeOptions = [8, 16, 24]

  // 项目列表（当前页数据用 data.list）
  const programmeList = ref([])

  /** 按当前筛选条件 + 分页请求列表，并更新 programmeList / total / totalPages / currentPage。可传入 opts 覆盖部分参数（如 region、page）。 */
  const fetchList = async (opts = {}) => {
    // const hasOverride = opts.region !== undefined || opts.program_type !== undefined
    // const params = hasOverride ? { ...opts } : { ...collectSelectValues() }
    loading.value = true
    try {
      // todo:发起了请求
      // 这里要发起请求
      if (data?.page_size != null) pageSize.value = data.page_size
    } finally {
      loading.value = false
    }
  }

  // 提交搜索：第 1 页，当前每页条数
  const handleSearch = async () => {
    try {
      currentPage.value = 1
      await fetchList({ page: 1 })
    } catch (error) {
      console.error('搜索失败:', error)
    }
  }

  // 清空筛选：空条件 + 第 1 页
  const handleClearFilter = async () => {
    try {
      selectResult.value = {
        region: [],
        program_type: [],
        tuition_fee: [],
        duration: [],
        special: [],
      }
      searchResult.value = ''
      currentPage.value = 1
      await fetchList({ page: 1 })
    } catch (error) {
      console.error('清空筛选失败:', error)
    }
  }

  // 翻页
  const handlePageChange = (page) => {
    currentPage.value = page
    fetchList({ page })
  }

  // 每页条数变化
  const handleSizeChange = (size) => {
    pageSize.value = size
    currentPage.value = 1
    fetchList({ page: 1, page_size: size })
  }

  // 详情弹窗：当前选中的项目
  const selectedProgram = ref(null)
  const openProMore = ref(false)

  const handleOpenMore = (program) => {
    selectedProgram.value = program
    openProMore.value = true
  }

  // 进入页时：若带有 region 参数，则把 region 的 select 置为对应项，并按该 region 查第 1 页
  onMounted(async () => {
    // todo:
    // const regionParam = route.query.region
    if (!regionParam) return

    // todo: 看看这里是在干嘛
    // const regionLabel = regionParamToLabel[regionParam] ?? regionParam
    // const regionSelectValue = COUNTRTY_LIST.includes(regionLabel) ? [regionLabel] : []

    // selectResult.value = {
    //   ...selectResult.value,
    //   region: regionSelectValue,
    // }

    try {
      // todo:发起请求
      await fetchList({ region: [regionParam] })
    } catch (e) {
      console.error('按 region 查询失败:', e)
    }
  })
</script>

<template>
  <main>
    <div class="upperPart">
      <div class="selectContainer">
        <h1 class="alignCenter">
          <histogram class="iconStyle" />寻找适合你的项目 Find Suitable Programmes For You
        </h1>
        <el-row
          class="filterSelectRow"
          :gutter="20"
          style="margin: 0 10px"
        >
          <el-col
            v-for="(selectValue, selectKey) in selectSingle"
            :key="selectKey"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
            :xl="8"
            slze="small"
          >
            <el-select
              class="filterSelect"
              v-model="selectResult[selectKey]"
              clearable
              :placeholder="placeholderMap[selectKey]"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
              @change="
                (val) => {
                  // 确保值始终是数组
                  selectResult[selectKey] = Array.isArray(val) ? val : val ? [val] : []
                }
              "
            >
              <el-option
                v-for="item in selectValue"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row
          class="searchRow"
          :gutter="20"
          style="margin: 0 10px"
        >
          <el-col
            :xs="24"
            :sm="24"
            :md="24"
            :lg="16"
            :xl="16"
          >
            <el-input
              v-model="searchResult"
              placeholder="搜索项目"
              :prefix-icon="Search"
            />
          </el-col>
          <el-col :span="8">
            <div class="flex">
              <el-button
                size="default"
                style="height: 38px"
                :icon="Search"
                :loading="loading"
                :disabled="loading"
                @click="handleSearch"
                >提交搜索</el-button
              >
              <el-button
                size="default"
                style="height: 38px"
                :icon="Delete"
                :disabled="loading"
                @click="handleClearFilter"
                >清空筛选</el-button
              >
              <el-button
                size="default"
                style="height: 38px"
                :icon="Select"
                disabled
                >高级筛选</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="middlePart">
      <div class="filterResultBar mb20">
        <span class="filterResultLabel">筛选结果:</span>
        <span
          v-for="(item, index) in filterResultTags"
          :key="item"
          class="filterTagWrap"
        >
          <el-tag
            :type="filterTagTypeByIndex(index)"
            effect="dark"
            round
            >{{ item }}</el-tag
          >
        </span>
      </div>
      <div class="program-list-wrap">
        <template v-if="programmeList.length">
          <el-row :gutter="20">
            <el-col
              v-for="program in programmeList"
              :key="program.program_id"
              :xs="24"
              :sm="12"
              :md="8"
              :lg="6"
              :xl="6"
            >
              <el-card shadow="hover">
                <div>
                  <el-image
                    :src="program.program_image"
                    fit="fill"
                    class="program_image"
                  ></el-image>
                </div>
                <div class="program_description">
                  <div class="program_description_school">
                    <el-button
                      text
                      type="warning"
                      disabled
                      :icon="School"
                      >{{ program.Region }}</el-button
                    >
                  </div>
                  <div class="program_titles">
                    <h3 class="program_title_eg">{{ program.Program_Name_EG }}</h3>
                    <h3 class="program_title_cn">{{ program.Program_Name_CN }}</h3>
                  </div>
                  <div class="program_meta">
                    所属地区: <span>{{ program.Region }}</span>
                  </div>
                  <div class="program_meta">
                    所属学校: <span>{{ program.University }}</span>
                  </div>

                  <div class="program_meta">项目特点：</div>
                  <div class="feature-tags">
                    <el-tag
                      class="feature-tag"
                      type="primary"
                      >偏贵</el-tag
                    >
                    <el-tag
                      class="feature-tag"
                      type="warning"
                      >cs平替</el-tag
                    >
                    <el-tag
                      class="feature-tag"
                      type="success"
                      >可多年制</el-tag
                    >
                    <el-tag
                      class="feature-tag"
                      type="primary"
                      >秋招</el-tag
                    >
                  </div>
                  <el-button
                    style="width: 100%; height: 40px; background-color: orange; color: azure"
                    @click="handleOpenMore(program)"
                    >了解更多</el-button
                  >
                </div>
                <div></div>
              </el-card>
            </el-col>
          </el-row>
        </template>
        <div
          v-else
          class="no-result-wrap"
        >
          <el-empty description="没有找到相关项目" />
        </div>

        <el-dialog
          v-model="openProMore"
          width="70%"
        >
          <template #header>
            <div class="detail-dialog-title">
              {{ selectedProgram?.Program_Name_EG || '项目详细信息' }}
            </div>
          </template>
          <moreInfo :programme="selectedProgram" />
        </el-dialog>

        <div class="paginationWrap">
          <span class="totalText">共 {{ total }} 条</span>
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="pageSizeOptions"
            :total="total"
            size="large"
            layout="sizes, prev, pager, next, jumper"
            class="customPagination"
            @current-change="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .upperPart {
    background-color: rgb(68, 163, 241);
    margin-bottom: 1rem;
  }
  .selectContainer {
    margin: 0 auto;

    padding-top: 1px;
  }

  .el-col {
    margin-bottom: 1.5rem;
  }

  /* 筛选区 select：浅色背景 + 边框 + 阴影，不再纯白 */
  .filterSelectRow :deep(.el-select__wrapper) {
    min-height: 45px !important;
    background-color: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    transition:
      box-shadow 0.2s,
      border-color 0.2s;
  }

  .filterSelectRow :deep(.el-select:hover .el-select__wrapper) {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    border-color: rgba(255, 255, 255, 1);
  }

  .filterSelectRow :deep(.el-select__wrapper.is-focused) {
    box-shadow: 0 4px 12px rgba(68, 163, 241, 0.35);
    border-color: rgba(255, 255, 255, 1);
  }

  /* 筛选框内占位符：加深颜色，更清晰 */
  .filterSelectRow :deep(.el-select__placeholder) {
    color: #505a64 !important;
    font-weight: 500;
  }

  /* 筛选框内已选中的标签：浅蓝底 + 深色字，与白底区分开 */
  .filterSelectRow :deep(.el-select .el-tag) {
    background-color: #ecf5ff !important;
    color: #2d5aa0 !important;
    border: 1px solid #b3d8ff;
    font-weight: 500;
  }

  .filterSelectRow :deep(.el-select .el-tag .el-tag__close) {
    color: #2d5aa0;
    background: transparent;
  }

  .filterSelectRow :deep(.el-select .el-tag .el-tag__close:hover) {
    color: #fff;
    background-color: #2d5aa0;
  }

  /* 搜索框占位符也加深，与筛选一致 */
  .searchRow :deep(.el-input__wrapper) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-radius: 10px;
  }

  .searchRow :deep(.el-input__inner::placeholder),
  .searchRow :deep(input::placeholder) {
    color: #505a64 !important;
    font-weight: 500;
  }

  /* 筛选结果区域 */
  .filterResultBar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .filterResultLabel {
    font-weight: 600;
    color: #333;
    margin-right: 4px;
  }

  .filterTagWrap {
    display: inline-block;
  }

  .filterTagWrap :deep(.el-tag) {
    font-weight: 500;
    border: none;
  }

  .filterTagWrap :deep(.el-tag.el-tag--primary) {
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  }

  .filterTagWrap :deep(.el-tag.el-tag--success) {
    background: linear-gradient(135deg, #67c23a 0%, #85ce61 100%);
  }

  .filterTagWrap :deep(.el-tag.el-tag--warning) {
    background: linear-gradient(135deg, #e6a23c 0%, #ebb563 100%);
  }

  .filterTagWrap :deep(.el-tag.el-tag--info),
  .filterTagWrap
    :deep(
      .el-tag:not([class*='el-tag--primary']):not([class*='el-tag--success']):not(
          [class*='el-tag--warning']
        )
    ) {
    background: linear-gradient(135deg, #909399 0%, #b1b3b8 100%);
    color: #fff;
  }

  .middlePart {
    margin: 0 auto;
  }

  .program-list-wrap {
    min-height: 420px; /* 约等于两行卡片高度，保证分页条位置稳定 */
  }

  .no-result-wrap {
    min-height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .paginationWrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
    padding-bottom: 16px;
  }

  .totalText {
    color: #475569;
    font-size: 16px;
    font-weight: 600;
  }

  /* 分页组件美化：更大、更清晰 */
  .paginationWrap :deep(.el-pagination__total),
  .paginationWrap :deep(.el-pagination__jump) {
    font-size: 15px;
    font-weight: 500;
    color: #475569;
  }

  .paginationWrap :deep(.el-pager li),
  .paginationWrap :deep(.btn-prev),
  .paginationWrap :deep(.btn-next) {
    min-width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #e2e8f0;
  }

  .paginationWrap :deep(.el-pager li:hover),
  .paginationWrap :deep(.btn-prev:hover),
  .paginationWrap :deep(.btn-next:hover) {
    color: #409eff;
    border-color: #409eff;
    background: #ecf5ff;
  }

  .paginationWrap :deep(.el-pager li.is-active) {
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    border-color: transparent;
    color: #fff;
  }

  .paginationWrap :deep(.el-select .el-select__wrapper) {
    min-height: 36px;
    padding: 0 12px;
    font-size: 15px;
    border-radius: 8px;
  }

  .paginationWrap :deep(.el-pagination__jump .el-input__inner) {
    height: 36px;
    font-size: 15px;
    border-radius: 8px;
  }

  .program_image {
    height: 180px;
  }

  .program_description {
    position: relative;
    padding: 1.5rem;
  }

  .program_description_school {
    position: absolute;
    right: 0;
    top: 0;
  }

  .detail-dialog-title {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    color: #409eff;
    letter-spacing: 0.03em;
  }

  /* 标题区：避免与下方“项目类别”重叠 */
  .program_titles {
    min-height: 80px;
    margin-bottom: 6px;
    line-height: 1.4;
  }

  .program_title_eg {
    margin: 0 0 6px 0;
    font-size: 1rem;
    line-height: 1.4;
    word-break: break-word;
  }

  .program_title_cn {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
    line-height: 1.4;
    word-break: break-word;
    letter-spacing: 0.02em;
    color: #1a1a1a;
  }

  .program_meta {
    margin: 8px 0 12px 0;
    color: grey;
    line-height: 1.5;
  }

  .program_meta:first-of-type {
    margin-top: 6px;
  }

  .alignCenter {
    display: flex;
    align-items: center;
  }

  @media (min-width: 1400px) {
    .selectContainer {
      max-width: 1320px;
    }
    .middlePart {
      max-width: 1320px;
    }
  }

  @media (min-width: 1200px) and (max-width: 1400px) {
    .selectContainer {
      max-width: 1140px;
    }
    .middlePart {
      max-width: 1140px;
    }
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    .selectContainer {
      max-width: 960px;
    }
    .middlePart {
      max-width: 960px;
    }
  }

  @media (min-width: 768px) and (max-width: 992px) {
    .selectContainer {
      max-width: 720px;
    }
    .middlePart {
      max-width: 720px;
    }
  }

  @media (min-width: 576px) and (max-width: 768px) {
    .selectContainer {
      max-width: 540px;
    }
    .middlePart {
      max-width: 540px;
    }
  }

  h1 {
    margin: 1.5rem 0;
    color: aliceblue;
    font-size: 2rem;
  }

  h3 {
    margin: 0;
  }

  .el-card {
    --el-card-padding: 0px !important;
    --el-card-border-radius: 8px;
  }

  :deep(.el-input__inner) {
    --el-input-height: 38px;
  }

  .feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px; /* 调小与上面的距离 */
    margin-bottom: 12px; /* 留一点与下面的间距 */
  }

  .feature-tag {
    margin: 0;
  }
</style>
