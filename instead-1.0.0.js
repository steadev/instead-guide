(function(window) {
    const API = "http://itsmpohang.hssa.me:3000/api";
    // const API = "http://192.168.0.47:3000/api";
    if (!window.XMLHttpRequest) {
        window.XMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (!window.XMLHttpRequest) {
        console.error('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }

    window.INSTEAD = function() {
        this.access_token = null;
        this.session_id = null;
    };

    window.INSTEAD.prototype.init = function(client_id, cb=null) {
        var req = new XMLHttpRequest();
        req.open("POST", API + "/token", true);
        req.setRequestHeader("Content-Type", "application/json");
        var self = this;
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                self.access_token = JSON.parse(req.responseText).access_token;
                if (cb) {
                    cb();
                }
            }
        };
        req.send(JSON.stringify({
            "client_id": client_id
        }));
    }

    window.INSTEAD.prototype.requestPay = function(input) {
        if (!this.access_token) {
            alert("먼저 INSTEAD.init() 을 호출하세요.");
            return;
        }
        var req = new XMLHttpRequest();
        req.open("POST", API + "/session", true);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.setRequestHeader("Authorization", "Bearer " + this.access_token);
        var self = this;
        window.onmessage = function(_){input.request_cb(_.data)};
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                self.session_id = JSON.parse(req.responseText).session_id;
                window.open(API + '/pay?session_id='+self.session_id,'결제를 부탁해','width=360, height=500');
            }
        };
        req.send(JSON.stringify(input));
    }

    function querystring(obj) {
        var pairs = [];
        
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            var k = encodeURIComponent(prop),
                v = encodeURIComponent(obj[prop]);
            pairs.push( k + "=" + v);
          }
        }
        
        return pairs.join("&");
    }
})(window);
