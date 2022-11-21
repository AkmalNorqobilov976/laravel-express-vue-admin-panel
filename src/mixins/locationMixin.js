export const locationMixin = {
    data: () => ({
        locations: [],
    }),

    methods: {
        getDistricts(regionId) {
            let districts = this.locations.find(
                (location) => location.id == regionId
            );
            return districts?.districts;
        },
        getLocations() {
            this.$store
                .dispatch("region/getLocations")
                .then((response) => {
                    this.locations = response.data;
                })
                .catch((error) => {
                    this.$message({
                        showClose: true,
                        message: getErrorMessage(error),
                        type: "error",
                    });
                });
        },

    },

    beforeMount() {
        this.getLocations();    
    }
} 