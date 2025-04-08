/* eslint-disable no-undef */
const WS_STATE = {
	CONNECTING: 0,
	OPEN: 1,
	CLOSING: 2,
	CLOSED: 3
};
export default class WxSocketManager {
	// SocketTask 实例
	#socketTask = null;
	// WebSocket 地址（wss://）
	#url;
	// 请求头
	#header;
	// 当前重连次数
	#reconnectCount = 0;
	// 最大重连次数-传0则关闭重连
	#maxReconnect;
	// 重连间隔（毫秒）
	#reconnectInterval;
	// 心跳间隔（默认 30 秒）
	#heartbeatInterval;
	// 心跳定时器
	#heartbeatTimer = null;
	// 最后一次收到 pong 的时间
	#lastPongTime = null;
	// 心跳超时时间（默认 10 秒）
	#heartbeatTimeout;
	// 心跳 ping 内容
	#heartbeatPing;
	// 心跳 pong 内容
	#heartbeatPong;
	// 重连锁
	#isReconnecting = false;
	#onOpen;
	#onMessage;
	#onClose;
	#onError;
	constructor(url, {
		header = {}, maxReconnect = 5, reconnectInterval = 2e3,
		heartbeatInterval = 30e3, heartbeatTimeout = 10e3, heartbeatPing = 'ping', heartbeatPong = 'pong',
		onOpen = (() => {}), onMessage = (() => {}), onClose = (() => {}), onError = (() => {})
	} = {}) {
		this.#url = url;
		this.#header = header;
		this.#maxReconnect = maxReconnect;
		this.#reconnectInterval = reconnectInterval;
		this.#heartbeatInterval = heartbeatInterval;
		this.#heartbeatTimeout = heartbeatTimeout;
		this.#heartbeatPing = heartbeatPing;
		this.#heartbeatPong = heartbeatPong;
		this.#onOpen = onOpen;
		this.#onMessage = onMessage;
		this.#onClose = onClose;
		this.#onError = onError;
	}
	// 初始化连接
	connect() {
		this.#isReconnecting = false;
		this.#socketTask = wx.connectSocket({
			url: this.#url,
			header: this.#header,
			success: res => console.log('WebSocket connectSocket success', res),
			fail: err => {
				console.error('WebSocket connectSocket fail', err);
				// 尝试重连
				this.#reconnect();
			}
		});
		this.#bindEvents();
	}
	// 监听事件
	#bindEvents() {
		this.#socketTask.onOpen(res => {
			console.log('WebSocket onOpen', res);
			this.#onOpen(res);
			// 重置重连计数器
			this.#reconnectCount = 0;
			// 启动心跳
			this.#startHeartbeat();
		});
		this.#socketTask.onMessage(res => {
			if (!res) return;
			// 更新 pong 时间
			if (res.data === this.#heartbeatPong) {
				this.#lastPongTime = Date.now();
				console.log('WebSocket 收到心跳回复');
				// 忽略心跳回复
				return;
			}
            console.log('WebSocket onMessage', res);
			let {data} = res;
			try {
				data = JSON.parse(data);
			} catch {
				// ignore
			}
			this.#onMessage(data);
		});
		this.#socketTask.onClose(res => {
			console.log('WebSocket onClose', res);
			// 停止心跳
			this.#stopHeartbeat();
			this.#onClose(res);
			// 非正常关闭时重连
			if (res.code !== 1000) this.#reconnect();
		});
		this.#socketTask.onError(err => {
			console.error('WebSocket onError', err);
			this.#onError(err);
			this.#reconnect();
		});
	}
	// 断线重连逻辑
	#reconnect() {
		// 避免重复重连
		if (this.#isReconnecting) return;
		if (this.#reconnectCount >= this.#maxReconnect) {
			console.error('已达最大重连次数，放弃连接');
			return;
		}
		this.#isReconnecting = true;
		// 指数退避重连-最大 30 秒
		const delay = Math.min(this.#reconnectInterval * (2 ** this.#reconnectCount), 30e3);
		console.log(`WebSocket将在${delay}ms后尝试第 ${++this.#reconnectCount} 次重连...`);
		setTimeout(() => {
			this.connect();
			// 重连锁
			this.#isReconnecting = false;
		}, delay);
	}
	// 启动心跳
	#startHeartbeat() {
		// 清除旧定时器
		this.#stopHeartbeat();
		// 定时发送 ping
		this.#heartbeatTimer = setInterval(() => {
			if (this.#socketTask?.readyState !== WS_STATE.OPEN) return;
			this.send(this.#heartbeatPing);
			this.#lastPongTime = Date.now();
			// 检查心跳超时
			setTimeout(() => {
				if (this.#lastPongTime && (Date.now() - this.#lastPongTime > this.#heartbeatTimeout)) {
					console.error('Websocket心跳超时，主动断开重连');
					// 触发 onClose 后重连
					this.#socketTask.close();
				}
			}, this.#heartbeatTimeout);
		}, this.#heartbeatInterval);
	}
	// 停止心跳
	#stopHeartbeat() {
		if (this.#heartbeatTimer) {
			clearInterval(this.#heartbeatTimer);
			this.#heartbeatTimer = null;
		}
	}
	// 手动关闭连接-结束心跳
	close() {
		this.#stopHeartbeat();
		if (this.#socketTask) this.#socketTask.close({code: 1000, reason: '手动关闭'});
	}
	// 发送消息
	send(data) {
		if (this.#socketTask?.readyState !== WS_STATE.OPEN) {
			console.error('WebSocket 未连接，消息发送失败');
			return;
		}
		this.#socketTask.send({data: JSON.stringify(data)});
	}
}
