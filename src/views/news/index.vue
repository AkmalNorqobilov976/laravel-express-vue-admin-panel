<template>
  <el-main>
    <data-table ref="newsDataTable" :columns="newsColumns" :getData="getData">
      <template #button
        ><el-button type="success" @click="$router.push('/news/create')"
          >Qo'shish</el-button
        ></template
      >
      <div slot="image" slot-scope="{ row }" class="table-image">
        <div v-if="row.image">
          <img height="60" :src="row.image" />
        </div>
      </div>
      <div slot="title" class="table-more-text" slot-scope="{ row }">
        {{ row.title }}
      </div>
      <div slot="description" class="table-more-text" slot-scope="{ row }">
        {{ row.description }}
      </div>
      <div slot="created_at" slot-scope="{ row }">
        {{ formatDate(row.created_at) }}
      </div>
      <div slot="is_active" slot-scope="{ row }">
        <el-button v-if="row.is_active" type="text" size="mini">
          Aktivlashtirilgan
        </el-button>
        <span v-else>
          <el-button type="danger" size="mini" @click="activateNews(row.id); row.is_active=1">Aktivlashtirish</el-button>
        </span>
      </div>
      <div slot="actions" slot-scope="{ row }">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteNews(row.id)"
          round
          size="small"
        ></el-button>
        <el-button
          icon="el-icon-edit"
          round
          size="small"
          @click="$router.push(`/news/update/${row.id}`)"
        ></el-button>
      </div>
    </data-table>
  </el-main>
</template>

<script>
import { activateNews, getNewsByPagination } from "@/api/news";

import DataTable from "@/components/DataTable.vue";
import { getErrorMessage } from "@/utils/error-message";
import moment from "moment";
export default {
  components: { DataTable },
  data: () => ({
    search: "", //query
    sortParams: "", //saralash uchun
    newsColumns: [
      {
        prop: "id",
        label: "ID",
        sortable: true
      },
      {
        prop: "image",
        label: "Rasm",
        sortable: true,
      },
      {
        prop: "title",
        label: "Sarlavha",
        sortable: true,
      },
      {
        prop: "description",
        label: "Tavsif",
        sortable: true,
      },
      {
        prop: "created_at",
        label: "Yaratilgan sana",
        sortable: true,
      },
      {
        prop: "is_active",
        label: "Aktivlashtirish",
        sortable: true
      },
      {
        prop: "actions",
        label: "Actions",
      },
    ],
  }),
  methods: {
    getData({ page, query, sortParams }) {
      return getNewsByPagination(page, query, sortParams).then((response) => {
        let { data } = response;
        return {
          data: data.data,
          total: data.meta.total,
        };
      });
    },

    deleteNews(newsId) {
      this.$confirm("Haqiqatdan ham ushbu yangilikni o'chirmoqchisizmi?").then(
        () => {
          this.$store
            .dispatch("news/deleteNew", newsId)
            .then(() => {
              this.$message({
                showClose: true,
                message: "Yangilik muvaffaqiyatli o'chirildi!!!",
                type: "success",
              });
              this.$refs.newsDataTable.getTableData();
            })
            .catch((error) => {
              this.$message({
                showClose: true,
                message: getErrorMessage(error),
                type: "error",
              });
            });
        }
      );
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    activateNews(newsId){
      activateNews(newsId)
      .then(response=>{
        this.$message.success('Aktivlashtirildi')
      }).catch(error=>{
        this.$message.error(getErrorMessage(error))
      })
    }
  },
};
</script>