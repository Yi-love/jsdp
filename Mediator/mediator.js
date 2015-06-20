/**
 * [将context传递给订阅者 ，默认上下文 为window对象]
 * @param  {[type]} root [description]
 * @return {[type]}      [description]
 */
(function(root){

	/**
	 * [guidGanerator 生成唯一的id]
	 * @return {[type]} [description]
	 */
	function guidGanerator(){
		var count = 0;
		return (function(){
			return count++;
		})();
	};

	/**
	 * [Subscriber 订阅者构造函数]
	 * @param {Function} fn      [description]
	 * @param {[type]}   options [description]
	 * @param {[type]}   context [description]
	 */
	function Subscriber( fn , options , context ) {
		if ( !this instanceof Subscriber ) {
			return new Subscriber( fn , options , context);
		}else{
			this.id = guidGanerator();
			this.fn = fn;
			this.options = options;
			this.context = context;
			this.topic = null;
		}
	};

	/**
	 * [Topic 模拟订阅者]
	 * @param {[type]} namespace [description]
	 */
	function Topic ( namespace ) {
		if ( !this instanceof Topic ) {
			return new Topic( namespace);
		}else {
			this.namespace = namespace || '';
			this._callbacks = [];
			this._topics = [];
			this.stopped = false;
		}
	};

	/**
	 * [定义topic的 pototype原型 ，包括 添加订阅者和获取订阅者]
	 * @type {Object}
	 */
	Topic.prototype =  {
		addSubscriber : function ( fn , options , context ) {
			var callback = new Subscriber(fn , options , context);
			this._callbacks.push(callback);
			callback.topic = this;
			return callback;
		},

		/**
		 * [stopPropagation 调用进一步的回调传播]
		 * @return {[type]} [description]
		 */
		stopPropagation : function (){
			this.stopped = true;
		},

		/**
		 * [getSubscriber 获取订阅者]
		 * @param  {[type]} identifier [description]
		 * @return {[type]}            [description]
		 */
		getSubscriber : function( identifier ) {
			for ( var i = 0 , len = this._callbacks.length ; i < len ; i++ ) {
				if ( this._callbacks[i].id == identifier || this._callbacks[i].fn == identifier ) {
					return this._callbacks[i];
				}
			};

			for ( var j in this._topics ) {
				if ( this._topics.hasOwnProperty(j) ){
					var sub = this._topics[j].getSubscriber(identifier);
					if ( sub !== undefined ) {
						return sub;
					}
				}
			};
		},

		/**
		 * [addTopic 添加订阅]
		 * @param {[type]} topic [description]
		 */
		addTopic : function ( topic ) {
			this._topics[topic] = new Topic( ( this.namespace ? this.namespace+':' : '') +topic ) ;
		},

		/**
		 * [hasTopic 判断是否存在订阅]
		 * @param  {[type]}  topic [description]
		 * @return {Boolean}       [description]
		 */
		hasTopic : function ( topic ) {
			return this._topics.hasOwnProperty( topic );
		},

		/**
		 * [returnTopic 返回订阅]
		 * @param  {[type]} topic [description]
		 * @return {[type]}       [description]
		 */
		returnTopic : function( topic ) {
			return this._topics[topic];
		},

		/**
		 * [removeSubscriber 删除订阅者]
		 * @param  {[type]} identifier [description]
		 * @return {[type]}            [description]
		 */
		removeSubscriber : function( identifier ) {
			if ( !identifier ) {
				this._callbacks = [];
				for ( var j in this._topics ) {
					if ( this._topics.hasOwnProperty(j) ) {
						this._topics[j].removeSubscriber(identifier);
					}
				}
			}

			for ( var i = 0 , len = this._callbacks.length ; i < len ; i++ ){
				if ( this._callbacks[i].id == identifier || this._callbacks.fn == identifier ) {
					this._callbacks[i].topic = null;
					this._callbacks[i].splice(i , 1);
					i-- , len--;
				}
			}
		},

		/**
		 * [publish 发布系统]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		publish : function ( data ) {
			for ( var i = 0 ,len = this._callbacks.length ; i < len ; i++ ) {
				var callback = this._callbacks[i] , 
					l;
				callback.fn.apply(callback.context , data);

				l = this._callbacks.length;
				if ( l < len ) {
					i--;
					len = l;
				}
			};

			for ( var j in this._topics ) {
				if ( !this.stopped ) {
					if ( this._topics.hasOwnProperty(j) ) {
						this._topics[j].publish(data);
					}
				}
			}
			this.stopped = false;
		}
	};

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
				namespaceHierarchy = namespace.split(":");

			if ( namespace == '' ) {
				return topic;
			}

			if ( namespaceHierarchy.length > 0 ) {
				for ( var i = 0 , len = namespaceHierarchy.length ; i < len ; i++ ) {
					if ( !topic.hasTopic(namespaceHierarchy[i]) ) {
						topic.addTopic(namespaceHierarchy[i]);
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
	root.mediator = new Mediator();
	Mediator.Topic = new Topic();
	Mediator.Subscriber = new Subscriber();
	return root;
})(window);
