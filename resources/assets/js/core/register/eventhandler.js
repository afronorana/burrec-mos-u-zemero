window.EventBus = new class {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        this.vue.$emit(event, data);
    }

    listen(event, callback) {
        if (typeof callback === 'function') this.vue.$on(event, callback);
    }
}();
