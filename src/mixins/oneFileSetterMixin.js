export const oneFileSetterMixin = {
    methods: {
        getImage(e, keyName) {
            this.newsForm[keyName] = e;
        },
    }
}