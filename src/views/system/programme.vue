<script setup lang="ts">
  import { reactive, ref } from 'vue'
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
  import { listByCountry, login } from '@/api/system/programme'
  // 多选框

  const selectSingle = reactive({
    area: COUNTRTY_LIST,
    field: FIELD_LIST,
    tuition: TUITION_RANGE,
    duration: PROGRAMME_DURATION,
    special: SPECIAL_SEMISTER,
  })

  const selectResult = ref({})

  // 搜索框
  const searchResult = ''

  // 项目列表
  const programmeList = [
    {
      titleEG: 'Master of Technology in Software Engineering',
      titleCN: '软件工程技术硕士',
      feature: ['学费贵', '课程质量一般', 'offer时间晚', '性价比低'],
      school: '新加坡国立大学',
      image:
        'https://nusgs.nus.edu.sg/wp-content/uploads/nusgs-assets/images/faculty-banners/Business.png',
      field: '泛计算机项目',
    },
    {
      titleEG: 'Master of Technology in Software Engineering',
      titleCN: '软件工程技术硕士',
      feature: ['学费便宜', '课程质量好', '适合做开发'],
      school: '南洋理工大学',
      image:
        'https://nusgs.nus.edu.sg/wp-content/uploads/nusgs-assets/images/faculty-banners/Design%20and%20Engineering.png',
      field: '计算机科学cs项目',
    },
    {
      titleEG: 'Master of Science (Smart Industries and Digital Transformation',
      titleCN: '可持续数据科学理学硕士',
      feature: ['学费便宜', '课程质量好', '适合做开发'],
      school: '南洋理工大学',
      image:
        'https://nusgs.nus.edu.sg/wp-content/uploads/nusgs-assets/images/faculty-banners/Design%20and%20Engineering.png',
      field: '计算机科学cs项目',
    },
    {
      titleEG: 'Master of Technology in Software Engineering',
      titleCN: '软件工程技术硕士',
      feature: ['学费便宜', '课程质量好', '适合做开发'],
      school: '南洋理工大学',
      image:
        'https://nusgs.nus.edu.sg/wp-content/uploads/nusgs-assets/images/faculty-banners/Design%20and%20Engineering.png',
      field: '计算机科学cs项目',
    },
    {
      titleEG: 'MSc in Advanced Studies in Statistics and Data Science',
      titleCN: '统计学和数据科学高级研究硕士',
      feature: ['学费便宜', '课程质量好', '适合做开发'],
      school: '南洋理工大学',
      image:
        'https://nusgs.nus.edu.sg/wp-content/uploads/nusgs-assets/images/faculty-banners/Design%20and%20Engineering.png',
      field: '计算机科学cs项目',
    },
  ]

  const programme = ref('english')

  //更多信息的弹窗框
  const openProMore = ref(false)
</script>

<template>
  <main>
    <div class="upperPart">
      <div class="selectContainer">
        <h1 class="alignCenter">
          <histogram class="iconStyle" />寻找适合你的项目 Find Suitable Programmes For You
        </h1>
        <el-row
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
              v-model="selectResult"
              clearable
              placeholder="项目地区"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
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
                @click="() => login()"
                >提交搜索</el-button
              >
              <el-button
                size="default"
                style="height: 38px"
                :icon="Delete"
                @click="() => listByCountry()"
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
      <div class="mb20">
        <el-button class="mr12">筛选结果:</el-button>
        <span
          v-for="item in 10"
          :key="item"
          ><el-tag
            type="info"
            class="mr12"
            >英国</el-tag
          ></span
        >
      </div>
      <div>
        <el-row :gutter="20">
          <el-col
            v-for="program in programmeList"
            :key="program"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="6"
          >
            <el-card shadow="hover">
              <div>
                <el-image
                  :src="program.image"
                  fit="cover"
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
                    >{{ program.school }}</el-button
                  >
                </div>
                <div style="height: 80px">
                  <h3>{{ program.titleEG }}</h3>
                  <h3>{{ program.titleCN }}</h3>
                </div>
                <div style="margin: 15px 0; color: grey">
                  项目类别: <span>{{ program.field }}</span>
                </div>
                <div style="margin: 15px 0; color: grey">项目特点：</div>
                <div>
                  <el-row>
                    <el-col :span="6"><el-tag type="primary">aaaaa</el-tag></el-col>
                    <el-col :span="6"><el-tag type="primary">Tag 1</el-tag></el-col>
                    <el-col :span="6"><el-tag type="primary">Tag 1</el-tag></el-col>
                    <el-col :span="6"><el-tag type="primary">Tag 1</el-tag></el-col>
                  </el-row>
                </div>
                <el-button
                  style="width: 100%; height: 40px; background-color: orange; color: azure"
                  @click="openProMore = true"
                  >了解更多</el-button
                >
              </div>
              <div></div>
            </el-card>
          </el-col>
          <el-dialog
            v-model="openProMore"
            title="Shipping address"
            width="800"
          >
            <moreInfo
              :programme="programme"
              @update-programme="programme = $event"
            />
          </el-dialog>
        </el-row>
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

  :deep(.el-select__wrapper) {
    min-height: 45px !important;
  }

  .middlePart {
    margin: 0 auto;
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
</style>
