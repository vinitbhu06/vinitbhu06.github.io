//formattinng the finalDataForPdf variable and pushing the header row
var finalDataForPdf = [[{ text: 'S.No.', bold: true, alignment: 'center', fillColor: '#d3d7db' },{ text: 'Title', bold: true, alignment: 'center', fillColor: '#d3d7db' },{ text: 'Author', bold: true, alignment: 'center', fillColor: '#d3d7db' }, { text: 'Publisher', bold: true, alignment: 'center', fillColor: '#d3d7db' }, { text: 'Edition', bold: true, alignment: 'center', fillColor: '#d3d7db' },{ text: 'Year', bold: true, alignment: 'center', fillColor: '#d3d7db' },{ text: 'ISBN', bold: true, alignment: 'center', fillColor: '#d3d7db' }]]; //Sending the header array for PDF
var university = "Central Library, University";
var today = new Date();
	// code for formatting date as per Indian locale
   	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){
    	dd='0'+dd
	} 
	if(mm<10){
    	mm='0'+mm
	} 
	var todaysDateFormatted = dd+'-'+mm+'-'+yyyy;
	// date formatting ends here
var reportDate = "Report generated on: "+today;

//functions start here

$(document).on('click', 'a .glyphicon-remove-sign', function () { // <-- for removing the items from the data array as well as html table
    rowID = +$(this).closest('tr').attr('name');
	$(this).closest('tr').remove();
	finalDataForPdf.splice(rowID,1)
	properSerials();
    return false;
});
 //function to accept the data and saving it for pdf generation
function accept(){
		$('#fromxisbn').show();
		$("#results").append("<tr  id='row' name='"+i+"'><td><a ><span class='glyphicon glyphicon-remove-sign' /* type='button' */></span></a></td><td><img src='"+cover+"' alt='cover'/></td><td><strong>"+title+"</strong></td><td>"+author+"</td><td>"+publisher+"</td><td>"+ed+"</td><td>"+year+"</td><td>"+isbn+"</td><td><a href='"+url+"' target='_blank'> Worldcat Link</a></td></tr>");
		i = i+1;
		finalDataForPdf.push(dataForPdf)
		//console.log(finalDataForPdf);
		//$(".modal-title").html("<h4></h4>");
		//$(".modal-body").html("<h3>Please search again</h3>");
		
		return finalDataForPdf
};
// function to serialise the items again in case of removal of items
function properSerials(){
		j= 0; 
		for (j=1; j <= finalDataForPdf.length ; j++){
		text= ""+j+".";
		finalDataForPdf[j][0] = {text}
		};
};
function generatePDF(){
	var requester = ""+$('#Name').val();
	var filename = "LibRequest_Requests-"+requester+"-"+todaysDateFormatted;
	var requesterName = "Name of the Faculty member: "+requester;
	var requesterEmail = "Email-id: "+$('#Email').val();
	var docDefinition = {
			// a string or { width: number, height: number }
			pageSize: 'A4',
			//background: 'simple text',

			// by default we use portrait, you can change it to landscape if you wish
			pageOrientation: 'landscape',

			// [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
			pageMargins: [ 40, 60, 40, 60 ],
			info: {
		    title: 'Library Request List',
		    author: 'Vinit Kumar',
		    subject: 'LibRequest',
		    keywords: 'LibRequest',
			},
			header: {columns: [{text: 'Generated through LibRequest Service developed by Dr. Vinit Kumar ', fontSize: 8}, {text: reportDate, fontSize: 8, alignment: 'right'}]},
			footer: {columns: [{text: '(Head of Department)', margin: [5, 0, 0, 0]},{ text: '(Faculty)', alignment: 'right',margin: [0, 10, 0, 0] }]},
			content: [{columns: [[{text: university, style: 'title'},{text: 'Address', style: 'subtitle'}, {text: 'Pin', style: 'subtitle'}]]}, 
			{text: requesterName, style: 'field'}, {text: requesterEmail, style: 'field'},
			{table: {
						headerRows: 1, widths: [ 'auto','*', 'auto', 'auto', 'auto','auto','auto' ],
				    	body: finalDataForPdf
			  		}
			}], 
			styles: {
					field: {
						fontSize: 12,
						alignment: 'Left',
						margin: [0, 0, 0, 10]
					},
					title: {
						fontSize: 18,
						bold: true,
						alignment: 'center'
					}, 
					subtitle: {
						fontSize: 14,
						bold: true,
						alignment: 'center'
					}
			}
		}
	pdfMake.createPdf(docDefinition).download(filename+'.pdf');
}; // end function generatePDF
