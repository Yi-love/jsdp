var messageLogger = function( topic , data ) {
	console.log('logging: ' + topic + ' : ' + data);
};
/**
 * [subscription 订阅]
 * @type {[type]}
 */
var subscription = pubsub.subscribe('inbox/newMessage' , messageLogger);

/**
 * 发布
 */
pubsub.publish('inbox/newMessage' , 'hello world');

pubsub.publish('inbox/newMessage' , ['test' , '1' ,2 , 4]);

pubsub.publish('inbox/newMessage' , {
	sender : 'hello@sina.com',
	body : 'hey  agin!'
});

pubsub.publish('inbox/newMessage' , 'hello ! are you still here?');