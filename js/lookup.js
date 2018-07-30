$(document).ready( function (){
	$("#welcome").modal("show");
		$("a.transition").click(function(event){event.preventDefault();linkLocation=this.href;$("body").fadeOut(500, redirectPage);});function redirectPage(){window.location=linkLocation;}});$(function(){$('#search').on('keyup', function(){var pattern=$(this).val(); $('.searchable-container .search-items').hide(); $('.searchable-container .search-items').filter(function(){return $(this).text().match(new RegExp(pattern, 'i'));}).show();});}); $("document").ready(function($){var nav=$('#nextprviewsoptions'); $(window).scroll(function (){if ($(this).scrollTop() > 2){nav.addClass("f-nav");}else{nav.removeClass("f-nav"); document.getElementById('nextprviewsoptions').style.Display='none';}});}); 
		$(document).ready(function(){var overlay=$('.sidebar-overlay'); $('.sidebar-toggle').on('click', function(){var sidebar=$('#sidebar'); sidebar.toggleClass('open'); if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')){overlay.addClass('active');}else{overlay.removeClass('active');}}); overlay.on('click', function(){$(this).removeClass('active'); $('#sidebar').removeClass('open');});});
		$(document).ready(function(){var sidebar=$('#sidebar'); var sidebarHeader=$('#sidebar .sidebar-header'); var toggleButtons=$('.sidebar-toggle'); $('#sidebar-position').change(function(){var value=$( this ).val(); sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open'); if (value=='sidebar-fixed-left' || value=='sidebar-fixed-right'){$('.sidebar-overlay').addClass('active');}});
		$(document).ready(function(){var overlay=$('.sidebar-overlay'); $('#about2').on('click', function(){var sidebar=$('#about'); sidebar.toggleClass('open'); if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')){overlay.addClass('active');}else{overlay.removeClass('active');}}); overlay.on('click', function(){$(this).removeClass('active'); $('#about').removeClass('open');});});
		//$(document).ready(function(){var sidebar=$('#about'); var sidebarHeader=$('#about .sidebar-header'); var toggleButtons=$('.about-toggle'); $('#about-position').change(function(){var value=$( this ).val(); sidebar.removeClass('sidebar-fixed-left sidebar-fixed-right sidebar-stacked').addClass(value).addClass('open'); if (value=='sidebar-fixed-left' || value=='sidebar-fixed-right'){$('.sidebar-overlay').addClass('active');}});});
		$(document).ready(function(){var overlay=$('.sidebar-overlay'); $('#contact2').on('click', function(){var sidebar=$('#contact'); sidebar.toggleClass('open'); if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')){overlay.addClass('active');}else{overlay.removeClass('active');}}); overlay.on('click', function(){$(this).removeClass('active'); $('#contact').removeClass('open');});});
		$(document).ready(function(){var overlay=$('.sidebar-overlay'); $('#isbn2').on('click', function(){var sidebar=$('#whatisisbn'); sidebar.toggleClass('open'); if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')){overlay.addClass('active');}else{overlay.removeClass('active');}}); overlay.on('click', function(){$(this).removeClass('active'); $('.page').removeClass('open');});});
		$(document).ready(function(){var overlay=$('.sidebar-overlay'); $('#settings2').on('click', function(){var sidebar=$('#settingpage'); sidebar.toggleClass('open'); if ((sidebar.hasClass('sidebar-fixed-left') || sidebar.hasClass('sidebar-fixed-right')) && sidebar.hasClass('open')){overlay.addClass('active');}else{overlay.removeClass('active');}}); overlay.on('click', function(){$(this).removeClass('active'); $('.page').removeClass('open');});});
	remove = function() {
		// body...
		$('.page').removeClass('open');
	};
	$('.material-button-toggle').click(function () {
        $(this).toggleClass('open');
        $('.option').toggleClass('scale-on');
    });

	//$('#continue').prop('disabled', true);
	$('#dnld-btn').prop('disabled', false);
	$("#oldForm").hide();
	$('#error').hide();
	$('#fromxisbn').hide();
	$('#myModal').modal({ show: false})
	$('#retry').click(function() {	$('#error').hide(); $('#myForm').show()});
	$('#fill').click(function() {	$('#error').hide(); $('#oldForm').show()});
	$('#reset').click(function() {	$('#bc').show(); });
	adduser = function(){
		$(".sidebar-header a").html($('#Email').val()); 
		$(".sidebar-header p").html($('#Name').val()); 
		requester = ""+$('#Name').val(); 
		requesteremail = ""+$('#Email').val(); 
		libraryname = ""+$('#libraryname').val();
		institutename = ""+$('#institutename').val();
		$('#setname').html(requester);
		$('#setemail').html(requesteremail);
		$('#setlibrary').html(libraryname);
		$('#setinsti').html(institutename);
	};
	$( '#myForm' ).submit( function (e){

		e.preventDefault();
		//console.log(e);
		isbn = $('#isbn').val();

		//console.log(isbn);
		getdata(isbn);
		//$('#myButton').click( function(){isbn = $('#isbn').val(); getdata(isbn)});
		});
		
	i= 1;
	getdata = function(isbn){
		var queryUrl = "http://xisbn.worldcat.org/webservices/xid/isbn/"+isbn+"?method=getMetadata&format=json&fl=*";
		$.ajax({
			beforeSend: function() {  $('#wait').show(); },
			url: queryUrl,
			dataType: "jsonp",
			jsonp : 'callback',
			complete: function() {  $('#wait').hide(); },
			success: function(data) {
	    		if( data.stat == "ok"){
					// hide some of the elements of the landing page
					//	$('#myForm').hide(); //commented to allow multiple entries
					$('#myModal').modal('show');
					$('#isbn').val('');
					$('#bc').show();
					//$('#intro').hide();
					$('#why').hide();
					$('#recentRequests').hide();
					title = "" + data.list[0].title;
					author = "" + data.list[0].author;
					publisher = "" + data.list[0].publisher;
					ed = "" + data.list[0].ed;
					//changeEditor();
					year = "" + data.list[0].year;
					url = "" + data.list[0].url;
					lang = "" + data.list[0].lang;
					cover = "" + 'http://covers.openlibrary.org/b/isbn/'+isbn+'-M.jpg';
					//$("#approved").html("<tr><td><img src='"+cover+"' alt='cover'/></td><td><strong>"+title+"</strong><br>"+author+"<br>"+publisher+"<br>"+ed+"<br>"+year+"<br>"+isbn+"</td></tr>");
					$("#forApproval").html("<p><br/><b>Title: </b>"+title+"<br/><b>Author: </b>"+author+"<br/><b>Publisher: </b>"+publisher+"<br/><b>Editor: </b>"+ed+"<br/><b>Year: </b>"+year+"<br/><b>ISBN: </b>"+isbn+"<br/></p>");
    				//$("#forApproval").html("<tr><td><b>Title: </b></td><td>"+title+"</td></tr><tr><td><b>Author: </b></td><td>"+author+"</td></tr><tr><td><b>Publisher: </b></td><td>"+publisher+"</td></tr><tr><td><b>Editor: </b></td><td>"+ed+"</td></tr><tr><td><b>Year: </b></td><td>"+year+"</td></tr><tr><td><b>ISBN: </b></td><td>"+isbn+"</td></tr>");
      				$("#cover").html("<img src='"+cover+"' class='margin img-responsive img-rounded' style='' alt='cover'>");
					
					//to build the pdf file.
					dataForPdf = [];
					dataForPdf = [ ""+i+".", title, author, publisher, ed, year, isbn ];
					return dataForPdf;
				}
	    		else {
					$('#myForm').hide();
					//	$('#myForm').show();   //commented to allow multiple entries
					$('#error').show();
	    		}

			}, 
		
		
			});
	};
	/* function changeEditor(){
		if (ed == "undefined"){ return ed = "--"} else {return ed};
	}*/
	
	}); // end document.ready
	
