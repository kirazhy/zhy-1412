export default (second = 60) => ({
    data() {
        return {
            countdown: {
                timer: null,
                second,
                counting: false
            }
        };
    },
    // 组件销毁-结束倒计时
    beforeDestroy() {
        this.resetCountdown();
    },
    // 页面销毁-结束倒计时
    onUnload() {
        this.resetCountdown();
    },
    methods: {
        // 异步开始倒计时，并resolve结束回调
        startCountdown() {
            // 开始前先重置
            this.resetCountdown();
            this.countdown.counting = true;
            return new Promise(resolve => this.countdown.timer = setInterval(() => {
                if (--this.countdown.second <= 0) {
                    this.resetCountdown();
                    resolve();
                }
            }, 1e3));
        },
        resetCountdown() {
            if (this.countdown.timer) clearInterval(this.countdown.timer);
            // 开始后清空初始文本
            this.countdown = {
                timer: null,
                second,
                counting: false
            };
        }
    }
});
