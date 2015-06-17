/**
 * [中介者模式]
 * 只暴露 publish 和 subscribe方法使用
 */
var mediator = (function(){
	//存储可被广播或监听的 topic
	var topics = {};

	/**
	 * [subscribe 订阅]
	 * @param  {[type]}   topic [description]
	 * @param  {Function} fn    [description]
	 * @return {[type]}         [description]
	 */
	var subscribe = function ( topic , fn ) {
		if ( !topics[topic] ) {
			topics[topic] = [];
		}
		topics[topic].push({context : this , callback : fn});

		return this;
	};

	/**
	 * [publish 发布]
	 * @param  {[type]} topic [description]
	 * @return {[type]}       [description]
	 */
	var publish = function ( topic ) {
		var args;
		if ( !topics[topic] ) {
			return false;
		}
		args = Array.prototype.slice.call(arguments , 1);
		for ( var i = 0 , len = topics[topic].length ; i < len ; i++ ) {
			var subscription = topics[topic][i];
			subscription.callback.apply(subscription.context , args);
		};

		return this;
	};

	/**
	 * 提供公共接口
	 */
	return {
		Publish : publish,
		Subscribe : subscribe,
		installTo : function(obj) {
			obj.subscribe = subscribe,
			obj.publish = publish;
		}
	}
})();
