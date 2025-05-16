/* eslint-disable no-undef */
import {arrayBufferDecoder} from '../utils/string';
export default class WxStreamManager {
	// StreamTask 实例
	#streamTask = null;
	// URL 地址
	#url;
	// 请求头
	#header;
	// 超时（毫秒）
	#timeout;
	// 错误提示
	#errorToast;
	#onData;
	#onError;
	#onComplete;
	constructor(url, {
		header = {}, timeout = 200e3, errorToast = '网络异常，请稍后重试',
		onData = (() => {}), onError = (() => {}), onComplete = (() => {})
	} = {}) {
		this.#url = url;
		this.#header = header;
		this.#timeout = timeout;
		this.#errorToast = errorToast;
		this.#onData = onData;
		this.#onError = onError;
		this.#onComplete = onComplete;
	}
	// 初始化连接
	connect(data) {
        const onChunkReceived = response => this.#onData(arrayBufferDecoder(response.data));
		this.#streamTask = wx.request({
            url: this.#url,
            method: 'POST',
            header: {
                "Content-Type": 'application/json',
                Accept: 'text/event-stream',
				...this.#header
            },
            data,
            // 启用分块传输
            enableChunked: true,
            responseType: 'arraybuffer',
            // 超时会直接断开连接，所以为防止到时间时还未结束分块传输，这里最好给长点
            timeout: this.#timeout,
            success: res => console.log('Stream success', res),
            // 失败-onError回调/打印日志
            fail: err => {
                this.#onError(err);
                // 非主动退出
                if (err?.errMsg !== 'request:fail abort' && this.#errorToast) uni.showToast({title: this.#errorToast});
                console.error('Stream fail', err);
            },
            // 结束-onComplete回调/关闭监听
            complete: () => {
                console.log('Stream complete');
                this.#onComplete();
                this.#streamTask?.offChunkReceived(onChunkReceived);
            }
        });
        this.#streamTask?.onChunkReceived(onChunkReceived);
	}
	abort() {
		this.#streamTask?.abort();
		this.#streamTask = null;
	}
}
