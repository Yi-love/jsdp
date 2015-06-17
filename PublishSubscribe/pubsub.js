/**
 * 发布和订阅者模式
 */

var pubsub = {};

(function(q){

	var topics = {},
		subUid = -1;

	/**
	 * [publish 发布或广播事件]
	 * @param  {[type]} topic [description]
	 * @param  {[type]} args  [description]
	 * @return {[type]}       [description]
	 */
	q.publish = function(topic , args) {
		if ( !topics[topic] ){
			return false;
		}

		var subscribers = topics[topic],
			len = subscribers ? subscribers.length : 0;

		while( len-- ){
			subscribers[len].func(topic , args);
		};

		return this;
	};

	/**
	 * [subscribe 通过特定的名称和回调函数订阅事件]
	 * @param  {[type]} topic [description]
	 * @param  {[type]} func  [description]
	 * @return {[type]}       [description]
	 */
	q.subscribe = function(topic , func) {
		if ( !topics[topic] ){
			topics[topic] = [];
		}
		var token = (++subUid).toString();
		topics[topic].push({
			token : token,
			func : func
		});

		return token;
	};
	/**
	 * [unsubscribe 基于订阅上的标记引用，通过特定的topic删除订阅]
	 * @param  {[type]} token [description]
	 * @return {[type]}       [description]
	 */
	q.unsubscribe = function(token) {
		for ( var m in topics ) {
			if ( topics[m] ) {
				for ( var i = 0 , j = topics[m].length ; i < j ; i++ ) {
					if ( topics[m][i].token === token ) {
						topics[m].splice(i , 1);
						return token;
					}
				}
			}
		};
		return this;
	};

})(pubsub);












