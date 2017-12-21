//验证码倒计时初始值
var seconds = 120;
//验证气泡默认存在毫秒数
var hideTime = 2000;
//控制气泡消失时间的全局变量
var ss;
//旧密码全局变量
var oldPassword = 'fanta7';
//判定旧密码是否正确的url，返回boolean类型
var oldPasswordValidUrl;
//储存所有的timeout定时器的数组
var timeouts = new Object();

var fantaValid = new Object();



fantaValid.setOldPasswordValidUrl = function(url){
  fantaValid.oldPasswordValidUrl = url;
}
//设置页面是否只显示一个气泡（即点击其它位置时，当前显示气泡消失）
fantaValid.setOnly1tip = function(boolean){
  fantaValid.only1tip = boolean;
}
//设置气泡消失毫秒数
fantaValid.setHideTime = function(milliseconds){
  fantaValid.hideTime = milliseconds;
}

//设置页面加载时是否立刻校验表单
fantaValid.setOnloadValid = function(boolean){
  fantaValid.onloadValid = boolean;
}

function checkReturn(reg,obj,className){
  if(!reg.test(obj.val())){
    obj.attr('pass','no');
    obj.addClass('validError');
    if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
      return obj.attr('error-msg');
    }else{
      switch(className){
        case 'int':return '格式不正确，只能填写整数';
        case 'number':return '格式不正确，只能填写浮点数';
        case 'phone':return '手机号码格式不正确！';
        case 'fixedPhone':return '座机号码格式不正确，例：010-12345678';
        case 'email':return '邮箱格式不正确！';
        case 'money':return '货币格式不正确！';
        case 'webUrl':return '网址格式不正确！';
        case 'postcode':return '邮政编码格式不正确！';
        case 'letterCode':return '格式不正确！';
        case 'symbol':return '格式不正确！';
        case 'letter':return '格式不正确！';
        case 'digit':return '格式不正确，必须含有数字';
        case 'onlyDigit':return '格式不正确，只能填写纯数字';
        case 'onlyDigitLetter':return '格式不正确，只能填写数字和字母';
        case 'onlyUppercase':return '格式不正确，只能填写大写字母';
        case 'onlyLowercase':return '格式不正确，只能填写小写字母';
        case 'onlyChinese':return '格式不正确，只能填写汉字';
        case 'notChinese':return '格式不正确，不能填写汉字';
        case 'ipv4':return 'ipv4地址格式不正确';
        case 'ipv6':return 'ipv6地址格式不正确';
        case 'port':return '端口号格式不正确';
      }
    }
  }else{
    obj.attr('pass','yes');
    obj.removeClass('validError');
    obj.poshytip('disable');
    var tm = obj;
    var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
    return '';
  }
}

//fantaValid.setOnly1tip(true);
//校验
function check(obj){console.log('enter'+obj.attr('pass'));
  //各项统一非空验证
  if(obj.hasClass('checkboxGroup') || obj.hasClass('radioGroup') || (obj.hasClass('noEmpty') && (obj.attr('type')=="checkbox" || (obj.css('color')=="rgb(204, 204, 204)" || obj.css('color')=="#cccccc" || $.trim(obj.val()).length == 0 || (obj.attr('init') && $.trim(obj.val())== obj.attr('init') ))))){
    obj.attr('pass','no');
    obj.addClass('validError');
    var type = "";
    if(obj.hasClass('phone')){
      type = "手机号码";
    }
    if(obj.hasClass('code')){
      type = "验证码";
    }
    if(obj.hasClass('password')){
      type = "密码";
    }
    if(obj.hasClass('fixedPhone')){
      type = "座机号码";
    }
    if(obj.hasClass('idcard')){
      type = "身份证号";
    }
    if(obj.hasClass('email')){
      type = "邮箱";
    }
    if(obj.attr('type')=="checkbox"){
      if(!(obj.is(':checked'))){
        obj.attr('pass','no');
        return "请勾选此项！";
      }else{
        obj.attr('pass','yes');
        obj.removeClass('validError');
        obj.poshytip('disable');
        var tm = obj;
        var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
        return;
      }
    }
    if(obj.hasClass('checkboxGroup') || obj.hasClass('radioGroup')){
      //console.log(obj.find('input').length);
      if(obj.find('input:checked').length == 0){
        obj.attr('pass','no');
        obj.addClass('validError');
        obj.poshytip('enable');
        //obj.poshytip('show');
        if(obj.attr('empty-msg') && obj.attr('empty-msg').length>0){
          return obj.attr('empty-msg');
        }
        else if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "请选择！";
        }

      }else{
        obj.attr('pass','yes');
        obj.removeClass('validError');
        obj.poshytip('disable');

        var tm = obj;
        var timeout = setTimeout(function(){clearTimeout(timeout);tm.poshytip('enable');},100);
        return;
      }
    }
    //若有自定义空信息，则返回空信息，否则若有自定义错误信息，返回错误自定义错误信息，否则返回默认空信息。
    if(obj.attr('empty-msg') && obj.attr('empty-msg').length>0){
      return obj.attr('empty-msg');
    }
    else if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
      return obj.attr('error-msg');
    }else{
      return "请填写" + type;
    }

  }

  else if(!obj.hasClass('noEmpty') && !obj.hasClass('fileNoEmpty') && $.trim(obj.val()).length == 0 && !obj.hasClass('confirmPassword')){
    obj.attr('pass','yes');
    obj.removeClass('validError');
    obj.poshytip('disable');
    var tm = obj;
    var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
    return;
  }else if(obj.hasClass('fileNoEmpty')){//console.log(111);
      //console.log(obj.val());
      if(obj.val().length > 0){
        obj.attr('pass','yes');
      }else{
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "请上传图片！";
        }
      }
  }else{

    obj.attr('pass','yes');
  //  obj.poshytip('disable');
    var tm = obj;
  //  var timeout = setTimeout(function(){tm.poshytip('enable');},"100");

  //若含有not(
  if(obj.attr('class').indexOf('not(') >= 0){
    var scope = obj.attr('class').substring(obj.attr('class').indexOf('not(')+4, (obj.attr('class').substring(obj.attr('class').indexOf('not(')+4).indexOf(')') + obj.attr('class').indexOf('not(')+4));
    var scopes = scope.split(',');
    var returnString = '';
    var regString = '[';
    if(scopes.indexOf('digit') >= 0){
      regString+='0-9';
      returnString+='、数字';
    }
    if(scopes.indexOf('lowercase') >= 0){
      regString+='a-z';
      returnString+='、小写字母';
    }
    if(scopes.indexOf('uppercase') >= 0){
      regString+='A-Z';
      returnString+='、大写字母';
    }

    if(scopes.indexOf('symbol') >= 0){
      regString+='((\\ )(\\~)(\\!)(\\@)(\\#)(\\$)(\\%)(\\^)(\\&)(\\*)(\\()(\\))(\\-)(\\_)(\\+)(\\=)(\\[)(\\])(\\{)(\\})(\\|)(\\\)(\\;)(\\:)(\\\')(\\")(\\,)(\\.)(\\/)(\\<)(\\>)(\\?)(\\\\))+';
      returnString+='、符号';
    }

    if(scopes.indexOf('chinese') >= 0){
      returnString+='、汉字';
    }

    if(scopes.indexOf('number') >= 0){
      returnString+='、浮点数';
    }

    if(returnString.split('、').length>1){
      returnString = returnString.replace('、','');
    }

    regString += ']+';
    console.log(regString)
    var reg = new RegExp(regString);
    var regCN = /^([\u4E00-\u9FA5]+,?)+$/;
    var regNo = /^(\d+\.)?\d+$/;
    if(reg.test(obj.val()) || (scopes.indexOf('chinese') >= 0 && regCN.test(obj.val())) || (scopes.indexOf('number') >= 0 && regNo.test(obj.val())) ){
      obj.attr('pass','no');
      obj.addClass('validError');
      if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
        return obj.attr('error-msg');
      }else{
        if(returnString.indexOf('、')>=0){
          returnString = returnString.substring(0,returnString.lastIndexOf('、')) + '及' + returnString.substring(returnString.lastIndexOf('、')+1);
        }
        return "不能含有"+returnString;
      }
    }else{
      obj.attr('pass','yes');
    }

  }


  //若含有only(
  if(obj.attr('class').indexOf('only(') >= 0){
    var scope = obj.attr('class').substring(obj.attr('class').indexOf('only(')+5, (obj.attr('class').substring(obj.attr('class').indexOf('only(')+5).indexOf(')') + obj.attr('class').indexOf('only(')+5));
    var scopes = scope.split(',');
    var returnString = '';
    var regString = '^[';
    if(scopes.indexOf('digit') >= 0){
      regString+='0-9';
      returnString+='、数字';
    }
    if(scopes.indexOf('lowercase') >= 0){
      regString+='a-z';
      returnString+='、小写字母';
    }
    if(scopes.indexOf('uppercase') >= 0){
      regString+='A-Z';
      returnString+='、大写字母';
    }

    if(scopes.indexOf('symbol') >= 0){
      regString+='((\\ )(\\~)(\\!)(\\@)(\\#)(\\$)(\\%)(\\^)(\\&)(\\*)(\\()(\\))(\\-)(\\_)(\\+)(\\=)(\\[)(\\])(\\{)(\\})(\\|)(\\\)(\\;)(\\:)(\\\')(\\")(\\,)(\\.)(\\/)(\\<)(\\>)(\\?)(\\\\))+';
      returnString+='、符号';
    }

    if(scopes.indexOf('number') >= 0){
      regString+='(\\d+\\.)?\\d+';
      returnString+='、浮点数';
    }


    if(scopes.indexOf('chinese') >= 0){
      regString+='\\u4E00-\\u9FA5';
      returnString+='、汉字';
    }



    if(returnString.split('、').length>1){
      returnString = returnString.replace('、','');
    }


    regString += ']*$';
    console.log(regString)
    var reg = new RegExp(regString);
    if(!reg.test(obj.val())){
      obj.attr('pass','no');
      obj.addClass('validError');
      if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
        return obj.attr('error-msg');
      }else{
        if(returnString.indexOf('、')>=0){
          returnString = returnString.substring(0,returnString.lastIndexOf('、')) + '及' + returnString.substring(returnString.lastIndexOf('、')+1);
        }
        return "只能填写"+returnString;
      }
    }else{
      obj.attr('pass','yes');
    }

  }

  //若含有has(
  if(obj.attr('class').indexOf('has(') >= 0){
    var scope = obj.attr('class').substring(obj.attr('class').indexOf('has(')+4, (obj.attr('class').substring(obj.attr('class').indexOf('has(')+4).indexOf(')') + obj.attr('class').indexOf('has(')+4));
    var scopes = scope.split(',');
    var returnString = '';
    var regString1;
    var regString2;
    var regString3;
    var regString4;
    var regArray = [];
    var reg1;
    var reg2;
    var reg3;
    var reg4;
    var regCN;
    if(scopes.indexOf('digit') >= 0){
      regString1 ='[0-9]+';
      returnString+='、数字';
      reg1 = new RegExp(regString1);
      regArray.push(reg1);
    }
    if(scopes.indexOf('lowercase') >= 0){
      regString2 ='[a-z]+';
      returnString+='、小写字母';
      reg2 = new RegExp(regString2);
      regArray.push(reg2);
    }
    if(scopes.indexOf('uppercase') >= 0){
      regString3 ='[A-Z]+';
      returnString+='、大写字母';
      reg3 = new RegExp(regString3);
      regArray.push(reg3);
    }


    if(scopes.indexOf('symbol') >= 0){
      regString4 ='([(\\ )(\\~)(\\!)(\\@)(\\#)(\\$)(\\%)(\\^)(\\&)(\\*)(\\()(\\))(\\-)(\\_)(\\+)(\\=)(\\[)(\\])(\\{)(\\})(\\|)(\\\)(\\;)(\\:)(\\\')(\\")(\\,)(\\.)(\\/)(\\<)(\\>)(\\?)(\\\\)])+';
      returnString+='、符号';
      reg4 = new RegExp(regString4);
      regArray.push(reg4);
    }

    if(scopes.indexOf('chinese') >= 0){
      returnString+='、汉字';
      regCN = /([\u4E00-\u9FA5]+,?)+/;
      regArray.push(regCN);
    }

    if(scopes.indexOf('number') >= 0){
      returnString+='、浮点数';
      var regNo = /(\d+\.)?\d+/;
      regArray.push(regNo);
    }

    if(returnString.split('、').length>1){
      returnString = returnString.replace('、','');
    }

    var allMatch = true;
    for(var i=0;i<regArray.length;i++){
      console.log('【【【'+regArray[i].test(obj.val()));
      if(!regArray[i].test(obj.val())){
        allMatch = false;
      }
    }


    if(!allMatch){
      obj.attr('pass','no');
      obj.addClass('validError');
      if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
        return obj.attr('error-msg');
      }else{
        if(returnString.indexOf('、')>=0){
          returnString = returnString.substring(0,returnString.lastIndexOf('、')) + '及' + returnString.substring(returnString.lastIndexOf('、')+1);
        }
        return "必须含有"+returnString;
      }
    }else{
      obj.attr('pass','yes');
    }

  }


  //长度验证   length(x-y)
  if(obj.attr('class').indexOf('length(')>=0){
    var scope = obj.attr('class').substring(obj.attr('class').indexOf('length')+7, (obj.attr('class').substring(obj.attr('class').indexOf('length')+7).indexOf(')') + obj.attr('class').indexOf('length')+7));
    if(scope.indexOf('-')>=0){
      min = scope.substring(0, scope.indexOf('-'));
      max = scope.substring(scope.indexOf('-')+1);
      if(obj.val().length > max || obj.val().length < min){
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "长度需要在" + min + "-" + max + "之间！";
        }
      }else{
        obj.attr('pass','yes');
      }
    }

  }

  //长度验证2（逗号分隔）   length(x,y,z)
  if(obj.attr('class').indexOf('length(')>=0){
    var scope = obj.attr('class').substring(obj.attr('class').indexOf('length')+7, (obj.attr('class').substring(obj.attr('class').indexOf('length')+7).indexOf(')') + obj.attr('class').indexOf('length')+7));
    if(scope.indexOf('-')<0){
      var scopes = scope.split(',');
      if(scopes.indexOf(obj.val().length.toString())<0){
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return '长度应为' + scope + '位！';
        }
      }else{
        obj.attr('pass','yes');
      }
    }

    /*if(obj.val().length > max || obj.val().length < min){
      obj.attr('pass','no');
      obj.addClass('validError');
      if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
        return obj.attr('error-msg');
      }else{
        return "长度需要在" + min + "-" + max + "之间";
      }
    }else{
      obj.attr('pass','yes');
    }*/
  }




    //数字区间
    if(obj.attr('class').indexOf('between(') >= 0){
      var scope = obj.attr('class').substring(obj.attr('class').indexOf('between(')+8, (obj.attr('class').substring(obj.attr('class').indexOf('between(')+8).indexOf(')') + obj.attr('class').indexOf('between(')+8));
      var min = scope.substring(0, scope.indexOf('-'));
      var max = scope.substring(scope.indexOf('-')+1);
      if(parseFloat(obj.val()) > max || parseFloat(obj.val()) < min){
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          if(parseFloat(obj.val()) > max){
            return "超过最大值！";
          }else if(parseFloat(obj.val()) < min){
            return "小于最小值！";
          }
        }

      }else{
        obj.attr('pass','yes');
      }
    }

    //小于
    if(obj.attr('class').indexOf('max(') >= 0){
      var max = parseFloat(obj.attr('class').substring(obj.attr('class').indexOf('max(')+4));
      if(parseFloat(obj.val()) > max){
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "超过最大值！";
        }
      }
    }

    //大于
    if(obj.attr('class').indexOf('min(') >= 0){
      var min = parseFloat(obj.attr('class').substring(obj.attr('class').indexOf('min(')+4));
      if(parseFloat(obj.val()) < min){
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "小于最小值！";
        }
      }
    }

    //手机号码验证
    if(obj.hasClass('phone')){
      var reg = /^1[3456789]\d{9}$/;
      var re = checkReturn(reg,obj,'phone');
      if(re.length > 0){
        obj.closest('.validForm').find('.sendCode').addClass('gray');
        return re;

      }else{
        if(obj.closest('.validForm').find('.sendCode').length>0){
          setTimeout(function(){
            obj.closest('.validForm').find('.sendCode').removeClass('gray');
          },200);
        }
      }
    }

    //浮点数验证
    if(obj.hasClass('number')){
      var reg = /^(\d+\.)?\d+$/;
      var re = checkReturn(reg,obj,'number');
      if(re.length > 0){
        return re;
      }
    }



    //整数验证
    if(obj.hasClass('int')){
      var reg = /^\d+$/;
      var re = checkReturn(reg,obj,'int');
      if(re.length > 0){
        return re;
      }
    }

    //固定电话/座机验证
    if(obj.hasClass('fixedPhone')){
      var reg = /^\d{3,4}-\d{7,8}(-\d{1,})?$/;
      var re = checkReturn(reg,obj,'fixedPhone');
      if(re.length > 0){
        return re;
      }
    }

    //邮箱验证
    if(obj.hasClass('email')){
      var reg = /^([0-9a-zA-Z._-])+@([a-zA-Z0-9._-])+.([a-zA-Z])+$/;
      var re = checkReturn(reg,obj,'email');
      if(re.length > 0){
        return re;
      }
    }

    //货币验证（两位小数）
    if(obj.hasClass('money')){
      var reg = /^((^[-]?([1-9]\d*))|^0)(\.\d{2})?$|(^[-]0\.\d{2}$)$/;
      var re = checkReturn(reg,obj,'money');
      if(re.length > 0){
        return re;
      }
    }

    //网址验证
    if(obj.hasClass('webUrl')){
      var reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/;
      var re = checkReturn(reg,obj,'webUrl');
      if(re.length > 0){
        return re;
      }
    }

    //ipv4地址验证
    if(obj.hasClass('ipv4')){
      var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
      var re = checkReturn(reg,obj,'ip');
      if(re.length > 0){
        return re;
      }
    }

    //ipv6地址验证
    if(obj.hasClass('ipv6')){
      var reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
      var re = checkReturn(reg,obj,'ip');
      if(re.length > 0){
        return re;
      }
    }

    //端口号验证
    if(obj.hasClass('port')){
      var reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
      var re = checkReturn(reg,obj,'port');
      if(re.length > 0){
        return re;
      }
    }


    //邮政编码验证
    if(obj.hasClass('postcode')){
      var reg = /^\d{6}$/;
      var re = checkReturn(reg,obj,'webUrl');
      if(re.length > 0){
        return re;
      }
    }


    //身份证号验证
    if(obj.hasClass('idcard')){
      var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
      if(!reg.test(obj.val())){
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "身份证号格式不正确！";
        }
      }else{
        obj.removeClass('validError');
        if($.trim(obj.val()).length == 18){
          //身份证号前17位加权系数
          var weighting = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
          var total = 0;
          //第18位
          //对应规则0－1－2－3－4－5－6－7－8－9－10  1－0－X －9－8－7－6－5－4－3－2。
          var the18th;
          for(var i=0; i<$.trim(obj.val()).length-1; i++){
            total += $.trim(obj.val()).substr(i,1) * weighting[i];
          }
          var remainder = total % 11;
          switch(remainder){
            case 0:the18th = 1;break;
            case 1:the18th = 0;break;
            case 2:the18th = 'x';break;
            case 3:the18th = 9;break;
            case 4:the18th = 8;break;
            case 5:the18th = 7;break;
            case 6:the18th = 6;break;
            case 7:the18th = 5;break;
            case 8:the18th = 4;break;
            case 9:the18th = 3;break;
            case 10:the18th = 2;break;
          }
          //console.log('the18th='+the18th);

          if($.trim(obj.val()).substr(17,1).toLowerCase()!=the18th){
            obj.addClass('validError');
            return "身份证号格式不正确！";
          }else{
            obj.attr('pass','yes');

          }

        }else{
          obj.attr('pass','yes');

        }
      }
    }



    //code验证（大写字母+数字|下划线*）
    if(obj.hasClass('letterCode')){
      var reg = /(^[A-Z]+$)|(^[0-9_]*[A-Z]+[0-9_]*$)|(^[0-9_]*[A-Z]+[0-9_]*$)|(^[A-Z_]*$)/;
      var re = checkReturn(reg,obj,'letterCode');
      if(re.length > 0){
        return re;
      }
    }

    //特殊字符验证 symbol
    if(obj.hasClass('symbol')){
      var reg = /([(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)])+/;
      var re = checkReturn(reg,obj,'symbol');
      if(re.length > 0){
        return re;
      }
    }


    //字母验证
    if(obj.hasClass('letter')){
      var reg = /([a-zA-Z])+/;
      var re = checkReturn(reg,obj,'letter');
      if(re.length > 0){
        return re;
      }
    }

    //数字验证
    if(obj.hasClass('digit')){
      var reg = /([0-9])+/;
      var re = checkReturn(reg,obj,'digit');
      if(re.length > 0){
        return re;
      }
    }

    //纯数字验证
    if(obj.hasClass('onlyDigit')){
      var reg = /^([0-9])+$/;
      var re = checkReturn(reg,obj,'onlyDigit');
      if(re.length > 0){
        return re;
      }
    }

    //只允许是数字和字母
    if(obj.hasClass('onlyDigitLetter')){
      var reg = /^([\w])+$/;
      var re = checkReturn(reg,obj,'onlyDigitLetter');
      if(re.length > 0){
        return re;
      }
    }

    //只允许字母大写
    if(obj.hasClass('onlyUppercase')){
      var reg = /^([A-Z])+$/;
      var re = checkReturn(reg,obj,'onlyUppercase');
      if(re.length > 0){
        return re;
      }
    }

    //只允许字母小写
    if(obj.hasClass('onlyLowercase')){
      var reg = /^([a-z])+$/;
      var re = checkReturn(reg,obj,'onlyLowercase');
      if(re.length > 0){
        return re;
      }
    }

    //只允许汉字
    if(obj.hasClass('onlyChinese')){
      var reg = /^([\u4E00-\u9FA5])+$/;
      var re = checkReturn(reg,obj,'onlyChinese');
      if(re.length > 0){
        return re;
      }
    }

    //不允许汉字
    if(obj.hasClass('notChinese')){
      var reg = /([\u4E00-\u9FA5]){0}/;
      var re = checkReturn(reg,obj,'notChinese');
      if(re.length > 0){
        return re;
      }
    }

    //含有验证url（validUrl）的对象验证
    if(obj.attr('validUrl') && obj.attr('validUrl').length>0){
      var isTrue = false;
      $.ajax({
        async:false,
        type:'post',

        dataType:'text',
        url:obj.attr('validUrl')+(obj.attr('validUrl').indexOf('?')>=0?'&':'?')+obj.attr('name')+'='+encodeURI(obj.val()),
        success:function(data){
          var data = data.toString();
          if(data == 'true' || data == true){
            isTrue = true;

          }else{
            isTrue = false;
          }
        }
      });
    //  isTrue = true;
      obj.poshytip('enable');
      if(isTrue == true){
        obj.removeClass('validError');
        obj.attr('pass','yes');
        if(obj.hasClass('phone')){
          if(obj.closest('.validForm').find('.sendCode').length>0){
            setTimeout(function(){
              obj.closest('.validForm').find('.sendCode').removeClass('gray');
            },200)
        //    obj.closest('.validForm').find('.sendCode').removeClass('gray');
          }
        }
      }else{
        isTrue = false;
        obj.addClass('validError');
        obj.attr('pass','no');
        if(obj.hasClass('phone')){
          if(obj.closest('.validForm').find('.sendCode').length>0){
            obj.closest('.validForm').find('.sendCode').addClass('gray');
          }
        }
        if(obj.attr('custom-msg') && obj.attr('custom-msg').length>0){
          return obj.attr('custom-msg');
        }else{
          obj.poshytip('enable');
          return "输入不正确！";
        }
      }
    }
    //旧密码
    if(obj.hasClass('oldPassword')){
      /*$.ajax({
        type:'post',
        dataType:'text',
        url:fantaValid.oldPasswordValidUrl+'&'+obj.attr('name')+'='+encodeURI(obj.val()),
        success:function(data){
          var data = data.toString();
          if(data == 'true' || data == true){
            fantaValid.oldPassword = obj.val();
          }else{
            fantaValid.oldPassword = '';
          }
        }
      });*/
      $.ajax({
        async:false,
        type:'post',

        dataType:'text',
        url:obj.attr('validUrl')+(obj.attr('validUrl').indexOf('?')>=0?'&':'?')+obj.attr('name')+'='+encodeURI(obj.val()),
        success:function(data){
          var data = data.toString();
          if(data == 'true' || data == true){
            fantaValid.oldPassword = obj.val();
          }else{
            fantaValid.oldPassword = '';
          }
        }
      });


      if(fantaValid.oldPassword.length>0 && obj.val() == fantaValid.oldPassword){
        obj.removeClass('validError');
        obj.attr('pass','yes');
      }else{
        obj.addClass('validError');
        obj.attr('pass','no');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "原密码输入不正确！";
        }
      }
    }

    //新密码
    if(obj.hasClass('newPassword')){
      //如果有原密码
      if($('.oldPassword').length > 0){
        if($('.oldPassword').attr('pass')!='yes'){
          obj.addClass('validError');
          obj.attr('pass','no');
          $('.oldPassword').poshytip('show');
          obj.poshytip('disable');
          var tm = obj;
          var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
          //return '原密码不正确';
        }else{
          $('.confirmPassword').attr('pass','no');
          if(obj.val()==$('.oldPassword').val()){
            obj.addClass('validError');
            obj.attr('pass','no');
            return '新密码与原密码相同，请重新设置新密码！';
          }else{
            if(obj.attr('pass')=='yes'){
              obj.removeClass('validError');
            }else{

            }

          }
        }
      //若无原密码
      }else{
          obj.removeClass('validError');
          obj.attr('pass','yes');
          if(obj.val()!=$('.confirmPassword').val()){
            $('.confirmPassword').addClass('validError');
            $('.confirmPassword').attr('pass','no');
          }else{
            $('.confirmPassword').removeClass('validError');
            $('.confirmPassword').attr('pass','yes');
          }
      }

    }
    //确认密码
    if(obj.hasClass('confirmPassword')){
      if($('.oldPassword').length > 0 && $('.oldPassword').attr('pass')!='yes'){
        obj.addClass('validError');
        obj.attr('pass','no');
        $('.oldPassword').poshytip('show');
        obj.poshytip('disable');
        var tm = obj;
        var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
        //return '原密码不正确';
      }else{//console.log($('.newPassword').val()+'   s  '+$('.confirmPassword').val());
        if($('.newPassword').attr('pass')=='no'){
          obj.addClass('validError');
          obj.attr('pass','no');
          $('.newPassword').poshytip('show');
          obj.poshytip('disable');
          var tm = obj;
          var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
        }
        else if(obj.val()!=$('.newPassword').val()){
          obj.addClass('validError');
          obj.attr('pass','no');
          if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
            return obj.attr('error-msg');
          }else{
            return "两次输入密码不一致，请重新输入！";
          }

        }else{
          if(obj.attr('pass')=='yes'){
            obj.removeClass('validError');
          }else{

          }
        }
      }
    }

    //下拉选框
    if(obj[0].tagName.toLowerCase() == 'select'){//console.log(11111111111+'  '+obj.find('option:selected').val());
      if(!$.trim(obj.val().match((/[\u4e00-\u9fa5]/g)))){
        obj.removeClass('validError');
        obj.attr('pass','yes');

      }else{
        obj.attr('pass','no');
        obj.addClass('validError');
        if(obj.attr('error-msg') && obj.attr('error-msg').length>0){
          return obj.attr('error-msg');
        }else{
          return "请选择！";
        }
      }
    }

    //验证码验证
    if(obj.attr('class').indexOf('code')>=0){
      if(obj.attr('pass')=='yes'){
      }
    }

    //若以上验证皆通过
    if(obj.attr('pass')=='yes'){
      obj.removeClass('validError');
      obj.poshytip('disable');
      var tm = obj;
      var timeout = setTimeout(function(){tm.poshytip('enable');},"100");
    }

  }     //非空else结束

//console.log(obj.attr('pass'));
}

$(window).load(function(){
  $('.validForm').find('textarea').addClass('validRequired').attr('pass','no');
  $('.validForm').find('input').each(function(){
    if($(this).attr('type')!='radio' && $(this).attr('type')!='checkbox' && $(this).attr('type')!='reset' && $(this).attr('type')!='hidden'){
      $(this).addClass('validRequired').attr('pass','no');
    }
  });
  $('.validRequired').attr('pass','no');
  //不强制要求非空的元素默认pass属性为yes
  $('body').find('.validRequired').each(function(){
    if(!$(this).hasClass('noEmpty') && !$(this).hasClass('radioGroup') && !$(this).hasClass('checkboxGroup') && $(this)[0].tagName.toLowerCase()!='select' && !$(this).attr('type')=='file'){
      $(this).attr('pass','yes');
    }
  });
  //所有输入框文字提示，鼠标放上去后消失，离开复原
  //input框设置init属性，填入默认灰色文字
  $('input').each(function(){
    if($(this).attr('init')){
      $(this).val($(this).attr('init')).css('color','#cccccc');
      if($(this).attr('type')=="password"){
        $(this).attr('initType','password');
        $(this).attr('type','text');
      }
      $(this).focus(function(){
        if($(this).val()==$(this).attr('init')){
          $(this).val('');
        }
        $(this).css('color','black');
        if($(this).attr('initType')=="password"){
          $(this).attr('type','password');
        }
      }).blur(function(){
        if($.trim($(this).val()).length==0){
          $(this).val($(this).attr('init')).css('color','#cccccc');
          if($(this).attr('type')=="password"){
            $(this).attr('initType','password');
            $(this).attr('type','text');
          }
        }else{

        }
      });
    }
  });

  //function check(obj) end;

  //弹出气泡设置
  $(".validRequired").poshytip({
    showOn: 'none',
    hideTimeout: hideTime,
    showTimeout : 0,
    alignTo: 'target',
    alignX: 'inner-left',
    alignY: 'top',
//  alignX: 'inner-left',
//  alignY: 'top',
    offsetX: 0,
    offsetY: 0,
    fade: true,
    content: function(updateCallback) {
      var checkthis = check($(this));
      return checkthis;
    }

  });

  //通用的元素失焦时
  $('body').on('blur','.validRequired',function(){
  //$('.validRequired').bind('blur',function(){
    var temp = $(this);
    if(!($(this).hasClass('checkboxGroup') || $(this).hasClass('radioGroup'))){
      var ss = setTimeout(function(){
        //clearTimeout(ss);
        //$('.tip-yellow').hide();
        //$('.tip-yellow').stop();
        try{
          temp.poshytip('show');
          //console.log('出现！');
          timeouts['s'+Object.getOwnPropertyNames(timeouts).length] = setTimeout(function(){temp.poshytip('hide')},hideTime);
        }catch(e){

        }

      },'120');
    }

  });

  //只显示一个气泡
  if(fantaValid.only1tip && fantaValid.only1tip == true){
    $(document).click(function(){
      //console.log('消失');
      $('.tip-yellow').remove();
    });
  }


  //获得焦点时，气泡消失
  $(".validRequired").focus(function(){
  //  $('.tip-yellow').stop();
    $(this).poshytip('hide');
  });
  //每个form
  $('.validForm').each(function(){
    var pass = 'yes';
    var formbox = $(this);
    $(this).find('select').each(function(){
      if($(this).hasClass('validRequired')){
        $(this).bind('change', function(){//console.log('click');
          check($(this));
          checkEntireForm();
        });
      }
    });

    $(this).find('.validRequired').each(function(){
        var hide;
        var temp = $(this);
        //单选复选框组
        if($(this).hasClass('checkboxGroup') || $(this).hasClass('radioGroup')){

          $(this).find('input').each(function(){
            $(this).bind('blur, click', function(){
            //  clearTimeout(hide);
              check(temp);
              checkEntireForm();
              ss = setTimeout(function(){
                try{
                  temp.poshytip('enable');
                  //console.log('');
                  temp.poshytip('show');
                  //temp.poshytip('hide');
                  setTimeout(function(){temp.poshytip('show');},100);
                }catch(e){

                }
                //console.log(1111);
                timeouts['s'+Object.getOwnPropertyNames(timeouts).length] = setTimeout(function(){temp.poshytip('hide');},hideTime);
              },'150');
            });
          });

        //非单选复选框
        }else{
          temp.bind('propertychange, input', function(){
            check(temp);
            checkEntireForm();
          });
          if(temp.attr('type') == 'file'){
            temp.bind('change', function(){
              check(temp);
              checkEntireForm();
            })

          }
        }
    });
  });

  $('.submitForm').each(function(e){

      $(this).click(function(e){

        checkSingleForm($(this).closest('.validForm').index('.validForm'))

        if(!$(this).hasClass('gray')){
          //若对应的validForm含有不直接提交的class
          if($(this).closest('.validForm').hasClass('dontSubmitStraight')){

          }else{

          }
        }else{
          e.preventDefault();
          return false;
        }
      });

  });

});

//检测整个表单内需要验证的所有元素是否验证通过
function checkEntireForm(){
  for(var i in timeouts){
    //console.log(i);
    clearTimeout(timeouts[i]);
  }
  timeouts = {};
  $('.tip-yellow').remove();
  //弹出气泡设置
  $(".validRequired").poshytip({
    showOn: 'none',
    hideTimeout: hideTime,
    showTimeout : 0,
    alignTo: 'target',
    alignX: 'inner-left',
    alignY: 'top',
    offsetX: 0,
    offsetY: 0,
    fade: true,
    content: function(updateCallback) {
      var checkthis = check($(this));
      return checkthis;
    }

  });
  //每个form中的submit按钮设置
  $('.validForm').each(function(){
    var formbox = $(this);
    //console.log($(this).find('.validRequired').length);
    var pass;

    formbox.find('.validRequired').each(function(){
     // //console.log($(this).html()+" 啊啊啊"+$(this).attr('pass'));
      if(!$(this).attr('pass') || $(this).attr('pass')=='no'){
        pass = 'no';
      }
    });
    //	//console.log(pass);
    //console.log(formbox.find('.validRequired').length+'  '+formbox.find('.validRequired[pass="no"]').length);
    if(formbox.find('.validRequired').length == formbox.find('.validRequired[pass="yes"]').length){
      pass = 'yes';
    }else{
      pass = 'no';
    }
    //console.log('pass?? '+pass);
    if(pass == 'no'){
      formbox.find('.submitForm').addClass('gray');//.attr('disabled',true);

    }else{
      formbox.find('.submitForm').removeClass('gray');//.removeAttr('disabled');
    }

  });

}

//获取指定表单中的元素是否全部验证通过，Index为当前页面上validForm的索引，从0开始。
function checkSingleForm(index){
  $('.datepicker').each(function(){
	  if($(this).val().length>0){
		  $(this).attr('pass','yes');
	  }
    else{
      $(this).poshytip('show');
    }
  });
  $('.validForm').eq(index).find('select').each(function(){
	  $(this).click().blur();
  });
  $('.validForm').eq(index).find('select').each(function(){
	  $(this).click().blur();
  });

  checkEntireForm();
  $('.validForm').eq(index).find('.validRequired:not(.datepicker, .sendCode, [type="file"], [type="reset"])').each(function(){
	  $(this).click().focus().blur();
	  try{
		  $(this).poshytip('show');
		/*  $(this).poshytip('hide');
		  $(this).poshytip('disable');
		  var tempthis = $(this);
		  setTimeout(function(){
			  tempthis.poshytip('enable');
		  },100);*/

	  }catch(e){

	  }

  });
  $('.validForm').eq(index).find('.checkboxGroup, .radioGroup').each(function(){
    try{
		  $(this).poshytip('show');
      var temp = $(this);
      timeouts['s'+Object.getOwnPropertyNames(timeouts).length] = setTimeout(function(){temp.poshytip('hide')},hideTime);
    }catch(e){

    }
  })
  //console.log('【【【【【【【'+($('.validForm').eq(index).find('.validRequired').length +'  '+ $('.validForm').eq(index).find('.validRequired[pass="yes"]').length));
  var pass;

  $('.validForm').eq(index).find('.validRequired').each(function(){
    if(!$(this).attr('pass') || $(this).attr('pass')=='no'){
      pass = 'no';
    }
  });
  if($('.validForm').eq(index).find('.validRequired').length == $('.validForm').eq(index).find('.validRequired[pass="yes"]').length){
      pass = 'yes';
    }else{
      pass = 'no';
    }
    //console.log('pass???? '+pass);
    if(pass == 'no'){
    	$('.validForm').eq(index).find('.submitForm').addClass('gray');//.attr('disabled',true);

    }else{
    	$('.validForm').eq(index).find('.submitForm').removeClass('gray');//.removeAttr('disabled');
    }
  var result = $('.validForm').eq(index).find('.submitForm').hasClass('gray')?false:true;

  return result;
}

//显示表单中未验证通过的气泡，Index为当前页面上validForm的索引，从0开始。
function showBubbles(index){
  for(var i in timeouts){
    //console.log(i);
    clearTimeout(timeouts[i]);
  }
  timeouts = {};
  $('.validForm').eq(index).find('.validRequired').each(function(){
    var temp = $(this);

    if($(this).attr('pass') && $(this).attr('pass')=='no'){
    	try{
    		$(this).poshytip('show');
    	}catch(e){

    	}

      timeouts['s'+Object.getOwnPropertyNames(timeouts).length] = setTimeout(function(){
        temp.poshytip('hide');
      },hideTime);
    }
  });
}

$(window).load(function(){
  var codeInterval;
  //回显数据的页面，页面加载时先判断当前表单数据是否正确
  if(fantaValid.onloadValid && fantaValid.onloadValid == true){
    $('.validForm').each(function(){
   		$(this).find('input,textarea').each(function(){
  	 		if($(this).val() && $(this).val().length>0 && $(this).attr('type')!='file'){
  	 			$(this).click().blur();
  	 		}
  	 	});
   	});
  }

  hideTime = (fantaValid.hideTime&&fantaValid.hideTime.length>0)?fantaValid.hideTime:3000;
//  checkEntireForm();
  //console.log(checkSingleForm(0));
  /*设置旧密码判断正确与否的后端url
  fantaValid.setOldPasswordValidUrl('aaaaaaaaaaaaaaaa');
  //console.log(fantaValid.oldPasswordValidUrl);
  */

  //获取body所有('.validRequired')元素
  //发送验证码倒计时
  //起始数值为countDownInit属性，不存在时默认120。
  $('body').find('.validRequired').each(function(){

    if($(this).attr('class') && $(this).attr('class').indexOf('sendCode') >= 0){
      $(this).addClass('gray');
      $(this).click(function(){
        var temp = $(this);
        //若手机号不必填且当前手机号未填写，点发送验证码依然要验证手机格式
        if(!$(this).closest('.validForm').find('.phone').hasClass('noEmpty') && !$(this).closest('.validForm').find('.phone').val().length>0){
          $(this).closest('.validForm').find('.phone').addClass('noEmpty');
          $(this).closest('.validForm').find('.phone').click().blur();
          setTimeout(function(){
            temp.closest('.validForm').find('.phone').removeClass('noEmpty');
            temp.closest('.validForm').find('.phone').attr('pass','yes');
          },121);

          return false;
        }
        if(!$(this).closest('.validForm').find('.phone').attr('pass') || $(this).closest('.validForm').find('.phone').attr('pass')!='yes'){
        //  $(this).addClass('gray');
          $(this).closest('.validForm').find('.phone').click().blur();
          return false;
        }


        if(!$(this).hasClass('gray') && !$(this).hasClass('counting')){
          var seconds = 120;
          if($(this).attr('countDownInit') && $(this).attr('countDownInit').toString().length > 0 ){
            seconds = parseFloat($(this).attr('countDownInit'));
          }
          $(this).addClass('gray');
          $(this).click(function(e){
            if($(this).hasClass('gray')){
              e.preventDefault();
              return false;
            }
          })
          $(this).addClass('counting');
          $(this).attr('initText',$(this).text());
          var temp = $(this);
          clearInterval(codeInterval);
          codeInterval = setInterval(function () {
            temp.html(seconds--);
            if(seconds < 0){
              temp.removeClass('gray');
              temp.removeClass('counting');
              clearInterval(codeInterval);
              seconds = parseFloat($(this).attr('countDownInit'));
              temp.text('重新发送');
            }

          }, 1000);
        }

      });
    }
  });

  //样式带有gray时，点击无效
  $('body').find('*').each(function(){
    $(this).click(function(e){
      if($(this).hasClass('gray')){
        e.preventDefault();
        return false;
      }
    });
  });


  //禁用日期输入框手动输入
  $('.datepicker').bind('keydown',function(){
 	return false;
  });
});

//浏览器大小变化时，错误信息为空的气泡remove
$(window).resize(function() {
    $('.tip-yellow').each(function () {
        if ($.trim($(this).find('.tip-inner').html()).length == 0) {
            $(this).remove();
        }
    });

});
