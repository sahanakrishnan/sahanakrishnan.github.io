			var month = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			// Function to generate Icon Links
			function setIcons(i){
				detail = "<img class=imgdetail  src='IMAGES/details.png' onclick=\"handleClick('details', " + i +")\">";
				edit =   "<img class=imgdetail  src='IMAGES/edit.png' onclick=\"handleClick('edit', " + i +")\">";
				del =    "<img class=imgdetail  src='IMAGES/del.jpg' onclick=\"handleClick('delete', " + i +")\">";
				return {
					"detail": detail,
					"edit": edit,
					"del": del,

				}
			}
			// Function to check if String is EMPTY
			function checkNull(str){
				return (str === "" || str === null || str === undefined || str === "undefined");
			}
			// Function to add WEEK
			Date.prototype.getWeek = function() {
				var onejan = new Date(this.getFullYear(), 0, 1);
				return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
			}		
			// Function to add MONTH
			Date.prototype.getMonthStr = function() {
				return month[this.getMonth()];
			}		

			// Function to EXTRACT QUERY
			function getQueryString() {
				var key = false, res = {}, itm = null;
				// get the query string without the ?
				var qs = location.search.substring(1);
				// check for the key as an argument
				if (arguments.length > 0 && arguments[0].length > 1)
				key = arguments[0];
				// make a regex pattern to grab key/value
				var pattern = /([^&=]+)=([^&]*)/g;
				// loop the items in the query string, either
				// find a match to the argument, or build an object
				// with key/value pairs
				while (itm = pattern.exec(qs)) {
				if (key !== false && decodeURIComponent(itm[1]) === key)
					return decodeURIComponent(itm[2]);
				else if (key === false)
					res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
				}
	
				return key === false ? res : null;
			}		
			// Function to Set data to local storage... if it fails set it to Cookie.
			function setData(key, data){
				try{ localStorage.setItem(key, JSON.stringify(data)); 
				}catch(e){ 
					setCookie(key, JSON.stringify(data)); 
				}			
			}

			// Function to get data from local storage... if it fails set it to Cookie.
			function getData(key, nullVal){
				var origDataSet;
				try{ origDataSet = JSON.parse(localStorage.getItem(key)); 
				}catch(e){ 
					origDataSet = getCookieAndParse(key, nullVal); 
				}			
				return origDataSet;
			}	

			function getDate(yyyy, mm, dd){
				var validVal = true;
				var dt = new Date(mm+"/"+dd+"/"+yyyy);
				if( checkNull(dt) || dt.toString() === "Invalid Date"){
					validVal = false;
				}	
				if(mm>12 || dd > 31){
					validVal = false;
				}
				return {valid: validVal, dateStr: yyyy + "-" + mm + "-" + dd };
			}	
			function validateAndgetdate(str){
				
				var patt1 = /(\d{4})\/(\d{2})\/(\d{2})/;
				var array = str.match(patt1); 
				if(array !== null && array.length===4) return getDate(array[1], array[2], array[3]  )

				var patt2 = /(\d{2})\/(\d{2})\/(\d{4})/;
				array = str.match(patt2); 
				if(array !== null && array.length===4) return getDate(array[3], array[1], array[2]  )

				var patt3 = /(\d{2})-(\d{2})-(\d{4})/;
				array = str.match(patt3); 
				if(array !== null && array.length===4) return getDate(array[3], array[1], array[2]  )

				var patt4 = /(\d{4})-(\d{2})-(\d{2})/;;
				array = str.match(patt4); 
				if(array !== null && array.length===4) return getDate(array[1], array[2], array[3]  )

				return {valid: false, dateStr: ""};
			}



			function setCookie(key, value) {
				var expires = new Date();
				expires.setTime(expires.getTime() + (10*365 * 24 * 60 * 60 * 1000));
				document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
			}

			function getCookie(key) {
				var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
				return keyValue ? keyValue[2] : null;
			}

			function getCookieAndParse(key, nullVal) {
				var str = getCookie(key);
				if(checkNull(str)) return nullVal;
				return JSON.parse(str); ;
			}

			function findAndReplace(string, target, replacement) {
				var i = 0, length = string.length;
				for (i; i < length; i++) {
				string = string.replace(target, replacement);
				}
				return string;
				
			}        
			
			
			function openWorkList( id) {
				window.open("/FraudGUI/detail.jsp?TABLE=worklist&ID="+ id, "", "width=1200,height=600");
			}   
			
			
			function updateStatus(select, order_id, id) {
				var url="/FraudGUI/DBDataServlet?type=Update&Order_Id="+
							order_id+"&Status="+select.value;
				console.log(url);
				$.ajax(url, {
					success: function(data) {
						if(data.indexOf("Success")>=0){
								console.log("Update Successful");
								location.reload();
						}else{
							alert("Updated failed");
						}
					},
					error: function() {
						alert("Failed update");
					}
				});
			}

			