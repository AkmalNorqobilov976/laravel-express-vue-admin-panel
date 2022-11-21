
export const deleteDistrictMixin = {
    methods: {
        deleteDistrict(districtId) {
            this.$confirm("Ushbu viloyatni rostan ham o'chirmoqchisizmi?").then(
                () => {
                    this.$store.dispatch('region/deleteDistrict', districtId)
                        .then(response => {
                            this.$message({
                                showClose: true,
                                message: "Tuman muvaffaqiyatli o'chirildi!!!",
                                type: "success"
                            });
                            this.getDistrictsByRegionId();
                        }).catch(error => {
                            this.$message({
                                showClose: true,
                                message: JSON.parse(JSON.stringify(error, null, 4)).response
                                    .data.message,
                                type: "error",
                            });
                        });
                });
        }
    }
}