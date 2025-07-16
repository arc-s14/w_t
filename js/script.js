function loadData()
{
	var args = loadData.arguments;
	switch (args[0])
    {
    case "load_page":
		if (document.getElementById) {
			var x = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		}
		if (x)
        {
			x.onreadystatechange = function()
			{
				if (x.readyState == 4 && x.status == 200)
				{
					el = document.getElementById(args[2]);
					el.innerHTML = x.responseText;
				}
			}
			x.open("GET", args[1], true);
			x.send(null);
        }
		break;
    default:
		loadData('load_page', 'pubs.xml', 'pubs');
		break;
    }
}

function popup(mylink, windowname) 
{ 
	if (! window.focus)
		return true; 
	var href; 
	if (typeof(mylink) == '\'string\'') 
		href=mylink; 
	else  
		href=mylink.href; 

	window.open(href, windowname, 'width=800,height=300,scrollbars=yes'); 
	return false; 
}
