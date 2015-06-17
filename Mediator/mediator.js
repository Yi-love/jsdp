/**
 * 中介者模式---进阶版
 */

function Mediator() {
	if ( !this instanceof Mediator ) {
		return new Mediator();
	}else {
		this._topics = new Topic('');
	}
};

Mediator.prototype = {

	/**
	 * [getTopic 获取实例]
	 * @param  {[type]} namespace [description]
	 * @return {[type]}           [description]
	 */
	getTopic : function ( namespace ) {
		var topic = this._topics,
			namespaceHierarchy = namespace.split(':');

		if ( namespace == '' ) {
			return topic;
		}

		if ( namespaceHierarchy.length > 0 ) {
			for ( var i = 0 , len = namespaceHierarchy.length ; i < len ; i++ ) {
				if ( !topic.hasTopic(namespaceHierarchy) ) {
					topic.addTopic(namespaceHierarchy);
				}

				topic = topic.returnTopic(namespaceHierarchy[i]);
			}
		}
		return topic;
	},

	/**
	 * [subscribe 发布实例]
	 * @param  {[type]}   topicName [description]
	 * @param  {Function} fn        [description]
	 * @param  {[type]}   options   [description]
	 * @param  {[type]}   context   [description]
	 * @return {[type]}             [description]
	 */
	subscribe : function ( topicName , fn , options , context ) {
		var options = options || {} ,
			context = context || {},
			topic = this.getTopic(topicName) ,
			sub = topic.addSubscriber( fn , options , context );

		return sub;
	},

	/**
	 * [getSubscriber 获取订阅者]
	 * @param  {[type]} identifier [description]
	 * @param  {[type]} topic      [description]
	 * @return {[type]}            [description]
	 */
	getSubscriber : function ( identifier , topic ) {
		return this.getTopic( topic || '' ).getSubscriber(identifier);
	},

	/**
	 * [remove 删除实例]
	 * @param  {[type]} topicName  [description]
	 * @param  {[type]} identifier [description]
	 * @return {[type]}            [description]
	 */
	remove : function ( topicName , identifier ) {
		this.getTopic(topicName).removeSubscriber(identifier);
	},

	/**
	 * [publish 发布]
	 * @param  {[type]} topicName [description]
	 * @return {[type]}           [description]
	 */
	publish : function ( topicName) {
		var args = Array.prototype.slice.call(arguments , 1),
			topic = this.getTopic( topicName);

		args.push(topic);
		this.getTopic(topicName).publish( args );
	}
};