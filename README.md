
# 인스테드 연동가이드  
### 결제대행 서비스 인스테드를 연동하는 방법입니다.  
  
## 1. 인스테드 \[관리자 페이지\](https://admin.instead.co.kr)에서 가맹점등록  
* 결제결과를 통보받을 Hook Uri, 사이트 주소, PG정보 등을 먼저 등록합니다.
## 2. 인스테드 라이브러리를 HTML에 추가합니다.  
```html  
<script src="https://rawgit.com/itsmp/instead/master/instead-1.0.1.js"></script>
```  
## 3. INSTEAD 변수를 초기화합니다. 
```INSTEAD.init(client_id)```
* client_id는 위의 관리자 페이지에서 가입 후 확인할수있습니다.  

* 매개변수 client_id는 거래할 고객의 고유 번호를 string 형식으로 전달하며, 해당 고유 번호를 가진 고객의 거래를 위한 초기화 작업을 진행합니다.  
* 초기화는 초기에 한 번 이루어지는 것이 좋습니다.  

## 4. 결제를 요청합니다. 
 ```INSTEAD.requestPay({Json_Data})```
* input은 JSON 형식으로 전달하며, 아래 정보들을 포함해야 합니다.  
* 변수 이름 앞의 *는 필수값  

| 변수 이름 | 타입 | 설명 |  
|-------------|---------------|----------------------------------------------------|  
| *name | string | 결제 요청자의 이름 |  
| *merchantUid | string | 각 주문 건의 고유 번호 |  
| *itemList | JSON[] | 주문할 각 상품을 JSON 형태로 나타낸 객체의 배열 |  
| *payEndDttm | unix_timestamp | 결제 요청 만료 시간(ms) |  
| *sandboxYn | string | 가상 결제 여부(가상 결제: "1", 실제 결제: "0") |  
| *totalAmt | number | 총 결제액(할인, 쿠폰 적용 후 금액) |  
| request_cb | function(res) | 요청에 대한 콜백 함수 |  
* itemList가 가질 JSON 요소들의 형태는 다음과 같습니다.  

| 변수 이름 | 타입 | 설명 |  
|----------|--------|---------------------|  
| *itemName | string | 상품명 |  
| *itemAmt | string | 상품의 수량 |  
| imgUrl | string | 상품 이미지의 URL |  
| orderUrl | string | 각 상품의 웹 페이지 |  
* 콜백 함수에 대한 리턴값(res)은 다음과 같습니다.  
```  
{result:'success', method:'kakao'}  
```  
> result:'success' || 'fail'  
> method:'kakao' || 'facebook' || 'link' || 'cancelled'(fail시에만)  
###### &nbsp; example  
```javascript  
INSTEAD.requestPay({  
	name: "김스테드",  
	merchantUid: "itsm_" + new Date().getTime(),  
	itemList:[  
		{  
			itemName: "슬레진저 2017 신상 남여공용 운동화/스니커즈, 겨울 신상 특가 상품",  
			imgUrl: "",  
			itemAmt: 2000,  
			orderUrl: "https://www.instead-corp.co.kr"  
		},  
		{  
			itemName: "Shoes & Handbags",  
			imgUrl: "https://images-eu.ssl-images-amazon.com/images/G/31/img15/Shoes/CatNav/p.\_V293117552\_.jpg",  
			itemAmt: 1000,  
			orderUrl: "https://www.instead-corp.co.kr"  
		} 
	],  
	payEndDttm: "1520302281201",  
	sandboxYn: "1",  
	totalAmt:3000,  
	request_cb: function(res){  
		console.log(res.result+','+res.method);  
	}  
});  
```  
## 5. 결제가 완료되면 쇼핑몰 측 서버에 결과를 전송합니다.  
* 결제 결과를 통보받을 Hook Uri를 먼저 관리자 페이지에 등록합니다.
* 결제 결과는 Get 방식으로 instead_uid, merchant_uid, status를 쇼핑몰 측 서버에 전송합니다.  
* 제공되는 API로 결제가 제대로 이루어졌는지 검증할 수 있습니다. (관리자페이지 참조)
> status : 'paid' || 'cancelled' || 'failed'
>
> status가 'paid'가 맞는지, 그리고 결제되어야 하는 금액과 실제 결제된 금액이 일치하는지 검증이 필요합니다.
## 6. 결제 조회 및 취소
* 관리자페이지에서 직접 거래를 확인 및 취소할 수 있습니다.
* 위와 관련된 API도 제공하고 있습니다. (관리자페이지 참조)
# 결제방식  
#### 카드결제, 휴대폰결제, 실시간 계좌이체 <br>  
>PG와의 계약사항에 따라 결제방식이 제한적일 수 있습니다.
