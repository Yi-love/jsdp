(function () {
	/**
	 * 获取Dom 节点
	*/
	var ctrlbox = document.getElementById('mainCheckbox'),
		addbt = document.getElementById('addob'),
		container = document.getElementById('observersContainer');

	/**
	 * 利用 subject 扩展ctrlbox
	 */
	extend(new Subject() , ctrlbox);

	/**
	 * 点击checkbox 的事件会触发到观察者上
	 */
	ctrlbox['onclick'] = new Function('ctrlbox.notify(ctrlbox.checked)');
	addbt['onclick'] = AddNewObserver;

	/**
	 * [Observer 观察者]
	 */
	function Observer(){
		this.update = function(){};
	}
	/**
	 * [AddNewObserver 具体的观察者]
	 */
	function AddNewObserver() {
		/**
		 * [check 创建添加新的checkbox
		 * @type {[type]}
		 */
		var check = document.createElement('input');
			check.type = 'checkbox';
		/**
		 * 利用Observer 扩展到checkbox上
		 */
		extend(new Observer() , check);

		/**
		 * [update 重新定义更新行为]
		 * @param  {[type]} value [description]
		 * @return 
		 */
		check.update = function(value){
			this.checked = value;
		};

		/**
		 * 为主 Subject 的观察者列表添加新的观察者
		 */
		ctrlbox.addObserver(check);
		/**
		 * 添加到容器中
		 */
		container.appendChild(check);
	};
}).call(this);