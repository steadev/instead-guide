# 인스테드 연동가이드

# code 
<script src="instead-guide/instead-1.0.0.js"></script>
instead.init('client_id');

instead.requestPay({ name: "홍길동", tel: "010-0000-0000", merchantUid: "instead_guid_"+new Date().getTime(), post : "10000", addr: "서울특별시 인스테드", email: "instead@instead-corp.com", itemList:[ { itemName: "운동화", imgUrl: "http://instead-corp.com/shoes.jpg", itemAmt: 1000, orderUrl: "http://shop.hssa.me" } ], payEndDttm: 150135478, sandboxYn: '1', request_cb: function(res) { console.log(res); } });
