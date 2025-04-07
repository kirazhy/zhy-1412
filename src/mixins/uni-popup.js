export default {
    methods: {
        async open(...args) {
            await this.beforeOpen?.(...args);
            this.$refs.popup?.open();
            this.afterOpen?.(...args);
        },
        async close(...args) {
            await this.beforeClose?.(...args);
            this.$refs.popup?.close();
            this.afterClose?.(...args);
        }
    }
};
