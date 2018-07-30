//	Validate the entered characters	
$(document).ready(function(){
	$.validator.addMethod("pattern", function(value, element, param) {
	if (this.optional(element)) {
		return true;
	}
	if (typeof param === "string") {
		param = new RegExp(param);
	}
	return param.test(value);
		}, "Invalid format.");

	$("#myForm").validate({
	    rules: {
		    isbn: {
		       // minlength: 10,
				//maxlength: 13,
		        required: true,
		       	pattern: /^(97(8|9))?\d{9}(\d|X)$/
		       }
		},
	    messages: {
	    	isbn: {
	    		minlength: jQuery.format('ISBN contains minimum 10 characters, please check if you are missing some number'),
				maxlength: "oops!, ISBN isn't longer than {0} characters, please check if a digit is repeated",
	        	required: "This field is required. ISBN is used as seed to fetch bibliographic data",
	       		pattern: "ISBN begins with a numeral and usually of 10 or 13 characters size"
	    	},
	    	// Name: {
	    	// 	required: "Please enter your name",
	    	// 	pattern: "Your name should begin with an alphabet"

	    	// },
	    	// Email: {
	    	// 	pattern: "Please enter a valid email address."
	    	// },
	    },
	    errorPlacement: function(error, element) {
		     error.appendTo('#message');
		   },
	    highlight: function(label) {
	    	//$(label).addClass('glyphicon');
	    	$(label).closest('.control-group').addClass('error');
	    },
	    success: function(label) {
	    	$(label).addClass('glyphicon glyphicon-ok');
	    	$(label).closest('.control-group').addClass('success');
	    	$('#continue').prop('disabled', false);
	    }
	});

	$("#requesterDetails").validate({
	    rules: {	
	    	name: {
		    	required: true,
		    pattern: /^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/
		    },
		    email: {
		    	required: true,
		    	email: true,
		   		//pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		    }
	    }, 
	    success: function(label) {
	    	$(label).addClass('glyphicon glyphicon-ok');
	    	$(label).closest('.control-group').addClass('success');
	    	$('#dnld-btn').prop('disabled', false);
	    }
	  });

	$('#requesterDetails input').on('keyup blur', function () { // fires on every keyup & blur
        if ($('#requesterDetails input').valid()) {                   // checks form for validity
            $('#dnld-btn').prop('disabled', false);       // enables button
        } else {
            $('#dnld-btn').prop('disabled', true);   // disables button
        }
    });
	$('#myForm input').on('keyup blur', function () { // fires on every keyup & blur
		$('#bc').hide();
        if ($('#myForm input').valid()) {                   // checks form for validity
           $('#continue').prop('disabled', false);
        } else {
            $('#continue').prop('disabled', true);   // disables button
        }
    });
	  
}); // end document.ready
