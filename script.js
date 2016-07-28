$(document).ready(function() {
	const search_text = $(".search-text");
	const search_content = $(".search-content");
	const search_submit = $(".search-submit");
	const search_box = $(".search-box");
	const search_cell = $(".search-cell");
	const cancel_icon = $(".cancel-icon");
	$(".firstquestion").addClass("active");
	var temp = function(str, data) {
		var html = str.replace ( "$url$", data.url);
		html = html.replace ( "$text$", data.text);
		return html;
	};

	var loaddata = function(data) {
		var htmlList = '';
		var htmlTemp = $("#list-tpl").html();

		data.forEach(function(object) {
		    htmlList += temp(htmlTemp, object);
		});
		$(".right-main-content").html(htmlList);
	};
	loaddata(list.data1);

	var searchcontent = function(value) {
		var search = [];
    	list.data.forEach(function(object) {
		    var num = object.text.search(value);
		    if (num != -1) {
		    	search.push(object);
		    }
		});
        htmlList = '';
		htmlTemp = $("#search-tpl").html();

		search.forEach(function(object) {
		    htmlList += temp(htmlTemp, object);
		});
	};

	search_text.on("keyup", function(event){
		var value = search_text.val();
		if (value != "" && event.keyCode == "38") {
			if ($(".search-cell").hasClass("active") && $(".search-content").find(".active").index() != 0) {
				var prev = $(".search-content").find(".active");
				prev.removeClass("active");
				prev.prev().addClass("active");
				value = prev.prev().find("a").text();
				search_text.val(value);
			}
			else {
				value = $(".search-cell:last").find(".content-link").text();
				$(".search-cell").removeClass("active");
				$(".search-cell:last").addClass("active");
				search_text.val(value);
			}
		}
		else if (value != "" && event.keyCode == "40") {
			if ($(".search-cell").hasClass("active") && $(".search-content").find(".active").index() != $(".search-cell:last").index()) {
				var next = $(".search-content").find(".active");
				next.removeClass("active");
				next.next().addClass("active");
				value = next.next().find("a").text();
				search_text.val(value);
			}
			else {
				value = $(".search-cell:first").find(".content-link").text();
				$(".search-cell").removeClass("active");
				$(".search-cell:first").addClass("active");
				search_text.val(value);
			}
		}
	});
	search_text.on("input", function(event){
		var value = search_text.val();
		if (value == "") {
			search_content.html("")
			search_submit.removeClass("active");
			search_box.removeClass("active");
			cancel_icon.removeClass("active");
		}
		else {
			cancel_icon.addClass("active");
			search_submit.addClass("active");
			search_box.addClass("active");
			searchcontent(value);
			search_content.html(htmlList);
		}
	});
	search_content.on('mouseenter', 'li', function(e){
	    if(e.target && e.target.nodeName.toUpperCase() === 'A'){
	    	$(".search-cell").removeClass("active");
	        $(e.target.parentNode).addClass("active");
	    }
	});
	search_content.on('mouseleave', 'li', function(e){
	    if(e.target && e.target.nodeName.toUpperCase() === 'A'){
	        $(e.target.parentNode).removeClass("active");
	    }
	});
	search_submit.on("click",function(){
		var value = searchtext.val();
		if (value == "") {
			search_content.html("")
			search_box.removeClass("active");
			cancel_icon.removeClass("active");
		}
		else {
			searchcontent(value);
			search_content.html(htmlList);
			search_box.addClass("active");
			cancel_icon.addClass("active");
		}
	});
	cancel_icon.on("click", function() {
		search_text.val("");
		search_content.html("");
		search_box.removeClass("active");
		cancel_icon.removeClass("active");
		search_submit.removeClass("active");
	});
	search_text.on("focus",function() {
		var value = search_text.val();
		if (value != "") {
			search_box.addClass("active");
		}
	});
	search_text.on("blur",function() {
		search_box.removeClass("active");
	});
	$(".left-main-text").on("click", function() {
		$(".left-main-text").removeClass("active");
		$(".left-main-icon").removeClass("active");
		$(this).addClass("active");
		var title = $(".left-main-content").find(".active").attr("title");
		if(title == "data1") {
			loaddata(list.data1);
		} else if(title == "data2") {
			loaddata(list.data2);
		} else if(title == "data3") {
			loaddata(list.data3);
		} else if(title == "data4") {
			loaddata(list.data4);
		} else if(title == "data5") {
			loaddata(list.data5);
		} else if(title == "data6") {
			loaddata(list.data6);
		} else if(title == "data7") {
			loaddata(list.data7);
		}
	})
});