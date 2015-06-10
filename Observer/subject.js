/**
 * 目标对象
 * Jin 2015/6/10
 */
;
/**
 * [Subject 目标对象]
 */
function Subject () {
	this.observers = new ObserverList();
};

/**
 * [addObserver 目标对象添加观察者]
 * @param {[object]} observer [观察者]
 */
Subject.prototype.addObserver = function(observer) {
	this.observers.add(observer);
};
/**
 * [removeObserver 目标对象删除观察者]
 * @param  {[object]} observer [观察者]
 * @return
 */
Subject.prototype.removeObserver = function(observer) {
	this.observers.removeIndexAt(this.observers.IndexOf(observer , 0));
};

/**
 * [notify 通知观察者]
 * @param  {[type]} context [description]
 * @return {[type]}         [description]
 */
Subject.prototype.notify = function(context) {
	var observerCount = this.observers.count();
	for ( var i = 0; i < observerCount ; i++ ) {
		this.observers.get(i).update(context);
	};
};