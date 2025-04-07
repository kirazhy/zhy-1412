/* eslint-disable no-undef */
// 获取当前页面实例
export const getCurrentPage = () => {
    if (!getCurrentPages) return null;
    const pages = getCurrentPages();
    return pages[pages.length - 1];
};
// 获取元素的size，默认为custom-navbar-https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-fields
export const getElementSize = (selector, vm) => new Promise(resolve => {
    if (!selector) return resolve();
    const query = vm ? uni.createSelectorQuery().in(vm) : uni.createSelectorQuery();
    query.select(selector)
        .fields({size: true})
        .exec(res => resolve(res[0]));
});
// 获取元素的rect-https://uniapp.dcloud.net.cn/api/ui/nodes-info.html#nodesref-boundingclientrect
export const getElementRect = (selector, vm) => new Promise(resolve => {
    if (!selector) return resolve();
    const query = vm ? uni.createSelectorQuery().in(vm) : uni.createSelectorQuery();
    query.select(selector)
        .boundingClientRect(data => resolve(data))
        .exec();
});
// 合并getProvider和login
export const uniLoginSync = () => new Promise(resolve => uni.getProvider({
    service: 'oauth',
    complete: ({provider: [provider] = []} = {}) => uni.login({
        provider: provider || 'weixin',
        success: resolve
    })
}));
// 小程序更新
export const checkUpdate = ({
    onReadyTitle = '更新提示',
    onReadyContent = '新版本已经准备好，是否重启应用？',
    onReadyConfirmText = '确定更新',
    onFailedTitle = '已经有新版本了哟~',
    onFailedContent = '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
    onFailedConfirmText = '确定'
} = {}) => {
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(({hasUpdate}) => {
        if (hasUpdate) {
            updateManager.onUpdateReady(() => uni.showModal({
                title: onReadyTitle,
                content: onReadyContent,
                showCancel: false,
                confirmText: onReadyConfirmText,
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                success: ({confirm}) => confirm && updateManager.applyUpdate()
            }));
            updateManager.onUpdateFailed(() => uni.showModal({
                title: onFailedTitle,
                content: onFailedContent,
                showCancel: false,
                confirmText: onFailedConfirmText,
            }));
        }
    })
};
