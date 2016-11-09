function TextBox(id_of_html){
	target=$('#'+id_of_html);
}
TextBox.prototype.write=function(msg){
	target.val(target.val()+msg);
}
TextBox.prototype.writeln=function(msg){
	target.val(target.val()+msg+'\n');
}


$(function() {
	my_con=new TextBox('OUTPUT');
	my_con.writeln("Test on "+addr+"\n1. Start ws_example1\n2: Reload this form\n3: Use [send][close]");
	var ws;
	$('#SW0').click(function(){
		addr=$('#ADDRESS').val();
		my_con.writeln("["+addr+"] open");
		ws=new WebSocket(addr);
		ws.onmessage=function(reply){
			my_con.writeln("["+reply.data+"]<< echo");
			if ( reply.data == $('#INPUT').val()) $('#INPUT').val('');
		};
		ws.onopen=function(reply){
			my_con.writeln("open [echo]");
		};
		ws.onclose=function(reply){
			my_con.writeln("close [echo]");
		};
		ws.onerror=function(reply){
			my_con.writeln("ws.error:" +reply.data);
		};
	});
	$('#SW1').click(function(){
		var stext=$('#INPUT').val();
		my_con.writeln("["+stext+"]>> echo");
		ws.send(stext);
	});
	$('#SW2').click(function(){
		ws.close();
	});
});
