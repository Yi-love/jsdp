/**
 * 观察者
 * Jin 2015/6/10
 */

/**
 * [ObserverList 观察者列表]
 */
;
function ObserverList (){
	this.observerList = [];
};

/**
 * [add 添加观察者]
 * @param {[object]} obj [观察者]
 */
ObserverList.prototype.add = function(obj) {
	return this.observerList.push(obj);
};
/**
 * [empty 清空观察者列表]
 * @return 
 */
ObserverList.prototype.empty = function() {
	this.observerList = [];
};
/**
 * [count 返回观察者数量]
 * @return number
 */
ObserverList.prototype.count = function() {
	return this.observerList.length;
};
/**
 * [get 获取观察者]
 * @param  {[number]} index [description]
 * @return {[object]}       [description]
 */
ObserverList.prototype.get = function(index) {
	if ( index > -1 && index < this.count() ){
		return this.observerList[index];
	}
	return null;
};
/**
 * [insert 插入观察者]
 * @param  {[object]} obj   [观察者]
 * @param  {[number]} index [位置]
 * @return {[number]}       [位置]
 */
ObserverList.prototype.insert = function(obj , index) {
	var p = -1;

	if ( index === 0 ){
		this.observerList.unshift(obj);//开头插入
		p = index;
	}else if ( index === this.count() ){//最后插入
		this.add(obj);
		p = index;
	};
	return p;
};

/**
 * [indexOf 查看是否存在]
 * @param  {[object]} obj   观察者
 * @param  {[number]} index 位置
 * @return {number}       位置
 */
ObserverList.prototype.IndexOf = function(obj , index) {
	var i = index ,
		p = -1 ,
		len = this.count();
	while( i < len ) {
		if ( this.get(i) === obj ){
			p = i;
			break;
		}
		i++;
	}
	return p;
};

/**
 * [removeIndexAt 删除观察者]
 * @param  {number} index 位置
 * @return
 */
ObserverList.prototype.removeIndexAt = function(index) {
	if ( index === 0 ) {
		this.observerList.shift();
	} else if( index === this.count()-1 ){
		this.observerList.pop();
	};
};

/**
 * [extend 扩展对象]
 * @param  {[type]} obj       [description]
 * @param  {[type]} extension [description]
 * @return {[type]}           [description]
 */
function extend(obj ,extension) {
	for ( var key in obj ) {
		extension[key] = obj[key];
	};
};