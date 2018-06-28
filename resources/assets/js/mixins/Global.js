module.exports = {
    install(Vue, options){
        const mixins = {
            methods: {
                rollTheDice() {
                    return 1+Math.floor(Math.random()*6);
                }
            }
        };
        Vue.mixin(mixins);
    }
};