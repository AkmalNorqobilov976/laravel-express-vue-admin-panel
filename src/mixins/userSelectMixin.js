export const userSelectMixin = {
    data: () => ({
        user: {
            id: undefined,
            name: "",
            email: "",
        },
        userDialog: false,

    }),
    methods: {
        ClickUser($event, formName) {
            this[formName].creator_id = $event.id;
            this.user = $event;
            this.userDialog = false;
        },
    }
}