# 인스테드 연동가이드

> 인스테드 [관리자 페이지](http://shop.hssa.me)에서 가맹점등록

> instead javascript import
```html
<script src="instead-guide/instead-1.0.0.js"></script>
```

> client_id로 initialize
```javascript
instead.init('client_id');
```

>  아이템 정보 및 요청자 정보 등을 포함하여 요청하면 끝납니다.
```javascript
instead.requestPay({ 
    name: "홍길동", 
    tel: "010-0000-0000", 
    merchantUid: "instead_guid_"+new Date().getTime(), 
    post : "10000", 
    addr: "서울특별시 인스테드", 
    email: "instead@instead-corp.com", 
    itemList:[ 
        { 
            itemName: "운동화", 
            imgUrl: "http://instead-corp.com/shoes.jpg", 
            itemAmt: 1000, 
            orderUrl: "http://shop.hssa.me" 
        } 
    ], 
    payEndDttm: 150135478, 
    sandboxYn: '1', 
    request_cb: function(res) { console.log(res); } 
});
```
