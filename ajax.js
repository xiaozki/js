function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if( typeof ActiveXObject != 'undefined') {
		if( typeof arguments.callee.activeXString != 'string') {
			var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", 
							 "MSXML2.XMLHttp"],
				i, len;

			for( i = 0, len = versions.length; i < len; i++ ) {
				try {
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch(ex) {

				}
			}
		}

		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available");
	}
}

function addParam(obj) {
	var arr = [];
	for(var i in obj) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
	}

	return arr.join("&");
}
function serialize(fm) {
	var parts = {};
	for(var i = 0; i < fm.elements.length; i++) {
		var filed = fm.elements[i];
		switch(filed.type) {
			case undefined :
			case 'submit' :
			case 'reset' :
			case 'file' :
			case 'button' :
				break;
			case 'radio' :
			case 'checkbox' :
				if(!filed.selected) break;
			case 'select-one' :
			case 'select-multiple' :
				for(var j = 0; j < filed.options.length; j++) {
					var option = filed.options[j];
					if(option.selected) {
						var optValue = '';
						if(typeof option.hasAttribute != 'undefined') {
							optValue = (option.hasAttribute("value") ? option.value : option.text);
						} else {
							optValue = (option.attribute('value').specified ? option.value : option.text);
						}
						parts[filed.name] = option.value;
					}
				}
				break;
			default : 
				parts[filed.name] = filed.value;
		}
	}
	return parts;
}
function ajax(obj) {
	var xhr = createXHR();
	obj.data = addParam(obj.data);
	if(obj.method == "get") {
		obj.url += (obj.url.indexOf("?") == -1) ? ('?' + obj.data) : ( '&' + obj.data); 
	}
	if(obj.async == true) {
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					alert(xhr.responseText);
				} else {
					alert("Request was unsuccessful: " + xhr.status);
				}
			}
		}		
	}
	xhr.open(obj.method, obj.url, obj.async);
	if(obj.method == 'get') {
		xhr.send(null);
	} else {
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(obj.data);
	}
	if(obj.async == false) {
		alert(xhr.responseText);
	}
}

