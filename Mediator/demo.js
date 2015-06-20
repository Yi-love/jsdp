(function(){
	function $(s){
		if ( document.querySelector != 'undefined' || document.querySelector != '' ){
			return document.querySelector(s);
		}
		return document.getElementById(s.replace(/[#]/g , ''));
	};

	$('#chat').onsubmit = function(evt){
		evt.preventDefault();
		
		var from = $('#from').value,
			to = $('#to').value,
			msg = $('#msg').value;

		mediator.publish('newMessage' , {msg: msg ,from : from  , to: to});
	};

	function displayChat(data){
		var date = new Date(),
			msg = data.from + ' said " '+ data.msg + ' " to ' + data.to+' <br>';
		$('#chatMsg').innerHTML = msg + $('#chatMsg').innerHTML;
	};

	function logChat(data){
		if ( window.console ){
			console.log(data);
		}
	};

	mediator.subscribe('newMessage' , displayChat);
	mediator.subscribe('newMessage' , logChat);

	function amITalkingToMyself(data){
		return data.from === data.to;
	};

	function iAmClearlyCrazy(data) {
		$('#chatMsg').innerHTML = data.from + ' is talking to him self <br> ' + $('#chatMsg').innerHTML;
	};

	mediator.subscribe(amITalkingToMyself , iAmClearlyCrazy);
})();