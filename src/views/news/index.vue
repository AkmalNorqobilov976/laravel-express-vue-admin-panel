<template>
  <el-main>
    <el-button type="success" @click="$router.push('/news/create')"
      >Qo'shish</el-button
    >
    <data-table ref="newsDataTable" :columns="newsColumns" :getData="getData">
      <div slot="image" slot-scope="{ row }" class="table-image">
        <div v-if="row.image">
          <img height="60" :src="row.image.original_url" />
        </div>
        {{ row.image }}
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
import { getNewsByPagination } from "@/api/news";

import DataTable from "@/components/DataTable.vue";
import { getErrorMessage } from "@/utils/error-message";
export default {
  components: { DataTable },
  data: () => ({
    newsColumns: [
      {
        prop: "id",
        label: "ID",
      },
      {
        prop: "image",
        label: "Rasm",
      },
      {
        prop: "title",
        label: "Sarlavha",
      },
      {
        prop: "description",
        label: "Tavsif",
      },
      {
        prop: "actions",
        label: "Actions",
      },
    ],
  }),
  methods: {
    getData({ page, query, sortParams }) {
      return getNewsByPagination(page).then((response) => {
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
  },
};
</script>