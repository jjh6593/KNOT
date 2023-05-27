function initMap() {
	const cbnuLocation = new naver.maps.LatLng(36.62563026275683, 127.4544004838527);
	const map = new naver.maps.Map("map", {
		center: cbnuLocation,
		zoom: 16
	});
	
	const marker = new naver.maps.Marker({
		position: cbnuLocation,
		map: map
	});
	
	
	const contentString = "<div style='width:150px;'>" +
	"<div style='float:left;'>" +
	"<a href='https://map.kakao.com/?urlX=601621.0&urlY=868907.0&itemId=1236538181&q=%EC%B6%A9%EB%B6%81%EB%8C%80%ED%95%99%EA%B5%90%20%EC%A0%84%EC%9E%90%EC%A0%95%EB%B3%B4%EB%8C%80%ED%95%993%EA%B4%80&srcid=1236538181&map_type=TYPE_MAP&from=roughmap' target='_blank'>충북대학교 소프트웨어학과</a></div></div>";
	
	
	const infowindow = new naver.maps.InfoWindow({
		content: contentString,
		backgroundColor: "#fff",   // 말풍선 컬러를 흰색으로 변경합니다.
		borderColor: "#ccc",       // 말풍선 테두리 색상을 변경합니다.
		borderWidth: 1,            // 말풍선 테두리 두께를 1px으로 변경합니다.
		
		anchorSize: new naver.maps.Size(0, 0),
		anchorSkew: true,
		pixelOffset: new naver.maps.Point(0, -10),
		disableAnchor: true
		
	});
	
	naver.maps.Event.addListener(marker, "click", function () {
		infowindow.open(map, marker);
	});
}