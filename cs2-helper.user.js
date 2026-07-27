// ==UserScript==
// @name         CS2 Friberg 猜选手助手
// @namespace    fuyiba-cs2-helper
// @version      1.0
// @description  辅助猜选手小游戏：根据反馈自动过滤候选选手，推荐最佳下一猜
// @author       WTSSS
// @match        https://shnlfriberg.online/single/*
// @match        https://shnlfriberg.online/multi/*
// @match        https://shnlfriberg.online/search*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
  'use strict';

  // ==================== 内嵌选手数据库 ====================
  // 紧凑格式: [nickname, nationality, region, team, age, role, majorChampionships, majorAppearances, isActive]
  const RAW_PLAYERS = [["1eer","白俄罗斯","独联体","未签约/已下放",24,"Rifler",0,1,true],["910","蒙古","亚太","The MongolZ",24,"AWPer",0,5,true],["abe","美国","北美洲","未签约/已下放",33,"Rifler",0,1,true],["ablej","巴西","南美洲","退役",28,"Rifler",0,2,false],["ace","印度","亚太","退役",32,"Rifler",0,1,false],["Acilion","丹麦","欧洲","Preasy",29,"Rifler",0,1,true],["acor","丹麦","欧洲","Sashi",29,"AWPer",0,4,true],["adamb","瑞典","欧洲","OG",21,"Rifler",0,1,true],["adams","罗马尼亚","欧洲","Sangal",25,"Rifler",0,1,true],["adren（哈萨克斯坦）","哈萨克斯坦","独联体","NOVAQ",36,"Rifler",1,12,true],["adren（美国）","美国","北美洲","未签约/已下放",36,"Rifler",0,4,true],["advent","中国","亚太","退役",34,"Rifler",0,1,false],["aerial","芬兰","欧洲","未签约/已下放",32,"Rifler",0,2,true],["afro","法国","欧洲","Luminosity",27,"AWPer",0,1,true],["aizy","丹麦","欧洲","Preasy",30,"Coach",0,11,true],["Aleksib","芬兰","欧洲","Natus Vincere",29,"Rifler",1,10,true],["ALEX（英国）","英国","欧洲","未签约/已下放",30,"Rifler",0,2,true],["alex（西班牙）","西班牙","欧洲","Gentle Mates",30,"Rifler",0,1,true],["alex666","乌克兰","欧洲","B8",24,"Rifler",0,3,true],["alexrr","德国","欧洲","退役",31,"AWPer",0,1,false],["alistair","澳大利亚","大洋洲","THUNDER dOWNUNDER",28,"AWPer",0,6,true],["allu","芬兰","欧洲","ENCE",34,"Coach",0,7,true],["almazer","俄罗斯","独联体","未签约/已下放",27,"Rifler",0,1,true],["amanek","法国","欧洲","Julie&Cie",32,"AWPer",0,3,true],["android","加拿大","北美洲","退役",32,"Rifler",0,1,false],["ange1","乌克兰","欧洲","退役",36,"Rifler",0,9,false],["anger","美国","北美洲","退役",38,"Rifler",0,2,false],["annihilation","蒙古","亚太","The Huns",26,"Rifler",0,2,true],["apEX","法国","欧洲","Vitality",33,"Rifler",4,22,true],["ariucle","蒙古","亚太","5star",22,"Rifler",0,1,true],["arrozdoce","葡萄牙","欧洲","未签约/已下放",24,"Rifler",0,1,true],["arT","巴西","南美洲","Legacy",30,"Rifler",0,10,true],["arya","美国","北美洲","退役",33,"Rifler",0,1,false],["asap","澳大利亚","大洋洲","THUNDER dOWNUNDER",23,"Rifler",0,1,true],["astarr","印度","亚太","退役",34,"Rifler",0,1,false],["Attacker","中国","亚太","退役",29,"Rifler",0,6,false],["auman","中国","亚太","退役",32,"Rifler",0,1,false],["autimatic","美国","北美洲","未签约/已下放",29,"Rifler",1,5,true],["AW","俄罗斯","独联体","magic",20,"Rifler",0,1,true],["Ax1le","俄罗斯","独联体","TDK",24,"Rifler",0,6,true],["azk","加拿大","北美洲","退役",35,"Rifler",0,4,false],["azr","澳大利亚","大洋洲","FlyQuest",33,"Coach",0,8,true],["AZUWU","英国","欧洲","Luminosity",22,"Rifler",0,1,true],["b1ad3","乌克兰","欧洲","Natus Vincere",39,"Coach",0,9,true],["b1t","乌克兰","欧洲","Natus Vincere",23,"Rifler",2,9,true],["b4rtin","巴西","南美洲","未签约/已下放",24,"Rifler",0,2,true],["balblna","俄罗斯","独联体","K27",30,"Coach",0,2,true],["bart4k","蒙古","亚太","The Huns",22,"Rifler",0,2,true],["beastik","捷克","欧洲","SINNERS",28,"Rifler",0,1,true],["BELCHONOKK","俄罗斯","独联体","TDK",22,"Rifler",0,2,true],["bendji","瑞典","欧洲","未签约/已下放",30,"AWPer",0,1,true],["berg","瑞典","欧洲","退役",30,"Rifler",0,1,false],["biguzera","巴西","南美洲","paiN",29,"Rifler",0,7,true],["blackpoison","南非","非洲与以色列","退役",33,"Rifler",0,1,false],["blameF","丹麦","欧洲","BIG",29,"Rifler",0,4,true],["blitz","蒙古","亚太","The MongolZ",25,"Rifler",0,8,true],["bnTeT","印度尼西亚","亚太","Alter Ego",30,"Rifler",0,3,true],["bodyy","法国","欧洲","OG",29,"Rifler",0,9,true],["boltz","巴西","南美洲","未签约/已下放",29,"Rifler",0,6,true],["bondik","乌克兰","欧洲","FAVBET",33,"Rifler",0,7,true],["boombl4","俄罗斯","独联体","BetBoom",27,"Rifler",1,10,true],["boros","约旦","亚太","Alter Ego",22,"Rifler",0,1,true],["br0","丹麦","欧洲","Eternal Fire",24,"Rifler",0,3,true],["brehze","美国","北美洲","未签约/已下放",28,"Rifler",0,4,true],["brnz4n","巴西","南美洲","MIBR",22,"Rifler",0,3,true],["broky","拉脱维亚","欧洲","未签约/已下放",25,"AWPer",1,7,true],["Brollan","瑞典","欧洲","HEROIC",24,"Rifler",0,9,true],["buda","阿根廷","南美洲","BESTIA",23,"Rifler",0,1,true],["buster","哈萨克斯坦","独联体","DEPO",26,"Rifler",0,5,true],["buzz","丹麦","欧洲","未签约/已下放",23,"Rifler",0,1,true],["byali","波兰","欧洲","未签约/已下放",32,"Rifler",1,13,true],["bymas","立陶宛","欧洲","Luminosity",22,"Rifler",0,2,true],["C4LLM3SU3","中国","亚太","Lynn Vision",22,"Rifler",0,3,true],["cacanito","北马其顿","欧洲","JiJieHao",25,"Rifler",0,1,true],["cadian","丹麦","欧洲","OG",31,"AWPer",0,8,true],["cajunb","丹麦","欧洲","退役",36,"Rifler",0,13,false],["calyx","土耳其","亚太","未签约/已下放",27,"Rifler",0,4,true],["CaptainMo","中国","亚太","Steel Helmet",37,"AWPer",0,1,true],["ceh9","乌克兰","欧洲","退役",37,"Rifler",0,1,false],["cent","南非","非洲与以色列","退役",39,"Rifler",0,1,false],["centeks","挪威","欧洲","退役",31,"Rifler",0,1,false],["cerq","保加利亚","欧洲","未签约/已下放",26,"AWPer",0,4,true],["chayjesus","巴西","南美洲","未签约/已下放",24,"Rifler",0,2,true],["chelo","巴西","南美洲","Imperial",28,"Rifler",0,6,true],["childking","中国","亚太","未签约/已下放",26,"Rifler",0,2,true],["chopper","俄罗斯","独联体","未签约/已下放",29,"Rifler",1,11,true],["chr1zn","丹麦","欧洲","HEROIC",19,"Rifler",0,2,true],["chrisj","荷兰","欧洲","退役",36,"AWPer",0,10,false],["cmtry","乌克兰","欧洲","FUT",18,"AWPer",0,1,true],["cobrazera","蒙古","亚太","未签约/已下放",20,"Rifler",0,2,true],["coldyy1","乌克兰","欧洲","退役",34,"Rifler",0,2,false],["coldzera","巴西","南美洲","未签约/已下放",31,"Rifler",2,11,true],["colon","丹麦","欧洲","退役",35,"Rifler",0,1,false],["controlez","蒙古","亚太","The Huns",29,"Rifler",0,2,true],["cool4st","蒙古","亚太","未签约/已下放",24,"AWPer",0,1,true],["cruc1al","荷兰","欧洲","未签约/已下放",29,"AWPer",0,1,true],["crush","乌克兰","欧洲","未签约/已下放",30,"Rifler",0,2,true],["Cxzi","美国","北美洲","Wildcard",26,"Rifler",0,1,true],["cype","瑞典","欧洲","退役",30,"Rifler",0,1,false],["cypher","英国","欧洲","未签约/已下放",23,"Rifler",0,1,true],["d1Ledez","俄罗斯","独联体","BetBoom",23,"Rifler",0,1,true],["dank1ng","中国","亚太","未签约/已下放",26,"AWPer",0,1,true],["daps","加拿大","北美洲","NRG",32,"Coach",0,3,true],["dav1deus","智利","南美洲","Fluxo",26,"Rifler",0,4,true],["dav1g","西班牙","欧洲","Gentle Mates",25,"Rifler",0,2,true],["davcost","俄罗斯","独联体","未签约/已下放",30,"AWPer",0,5,true],["davey","加拿大","北美洲","退役",30,"Rifler",0,1,false],["dazed","美国","北美洲","退役",36,"Rifler",0,3,false],["DD","中国","亚太","退役",31,"Rifler",0,1,false],["deadfox","匈牙利","欧洲","退役",31,"AWPer",0,3,false],["DeathZz","西班牙","欧洲","未签约/已下放",30,"Rifler",0,1,true],["decenty","巴西","南美洲","Imperial",22,"Rifler",0,4,true],["degster","俄罗斯","独联体","未签约/已下放",24,"AWPer",0,5,true],["delpan","瑞典","欧洲","退役",36,"AWPer",0,1,false],["dem0n","乌克兰","欧洲","FUT",18,"Rifler",0,1,true],["DemQQ","乌克兰","欧洲","未签约/已下放",25,"Rifler",0,1,true],["denis","德国","欧洲","退役",31,"Rifler",0,9,false],["dennis","瑞典","欧洲","退役",35,"Rifler",0,10,false],["dephh","英国","欧洲","M80",34,"Coach",0,3,true],["desi","美国","北美洲","退役",33,"Rifler",0,1,false],["destiny","巴西","南美洲","未签约/已下放",29,"Rifler",0,1,true],["detrony","南非","非洲与以色列","退役",35,"Rifler",0,1,false],["deviant","南非","非洲与以色列","退役",38,"Rifler",0,1,false],["device","丹麦","欧洲","100 Thieves",30,"AWPer",4,17,true],["devil","法国","欧洲","退役",31,"Rifler",0,2,false],["devilwalk","瑞典","欧洲","退役",35,"Rifler",1,2,false],["devoduvek","法国","欧洲","未签约/已下放",31,"Rifler",0,1,true],["dexter","澳大利亚","大洋洲","THUNDER dOWNUNDER",31,"Rifler",0,7,true],["dgt","乌拉圭","南美洲","9z",25,"Rifler",0,5,true],["dickstacy","澳大利亚","大洋洲","退役",29,"Rifler",0,2,false],["dimaoneshot","俄罗斯","独联体","退役",31,"Rifler",0,2,false],["dimasick","哈萨克斯坦","独联体","退役",30,"Rifler",0,1,false],["disco-doplan","瑞典","欧洲","退役",30,"Rifler",0,1,false],["disturbed","芬兰","欧洲","未签约/已下放",33,"Rifler",0,1,true],["Djoko","法国","欧洲","GenOne",29,"Rifler",0,1,true],["doc","巴西","南美洲","Sharks",23,"Rifler",0,1,true],["donk","俄罗斯","独联体","Spirit",19,"Rifler",1,5,true],["dosia","俄罗斯","独联体","退役",38,"Rifler",1,11,false],["doto","芬兰","欧洲","HEROIC",30,"Coach",0,1,true],["draken","瑞典","欧洲","Johnny Speeds",30,"AWPer",0,1,true],["drop","巴西","南美洲","未签约/已下放",22,"Rifler",0,6,true],["dumau","巴西","南美洲","Legacy",22,"Rifler",0,6,true],["dumz","瑞典","欧洲","退役",30,"Rifler",0,1,false],["dupreeh","丹麦","欧洲","退役",33,"Rifler",5,18,false],["dycha","波兰","欧洲","未签约/已下放",28,"Rifler",0,5,true],["dziugss","立陶宛","欧洲","FUT",17,"Rifler",0,1,true],["edward","乌克兰","欧洲","退役",38,"Rifler",0,13,false],["Efire","蒙古","亚太","Chinggis Warriors",20,"Rifler",0,1,true],["el1an","俄罗斯","独联体","SPARTA",26,"AWPer",0,1,true],["electronic","俄罗斯","独联体","BC.Game",27,"Rifler",1,13,true],["elige","美国","北美洲","Liquid",29,"Rifler",0,17,true],["emagine","澳大利亚","大洋洲","退役",35,"Rifler",0,1,false],["EmiliaQAQ","中国","亚太","Lynn Vision",21,"Rifler",0,4,true],["erkast","蒙古","亚太","NEXVOID",31,"Rifler",0,2,true],["es3tag","丹麦","欧洲","未签约/已下放",30,"Rifler",0,2,true],["esenthial","乌克兰","欧洲","B8",20,"Rifler",0,3,true],["espiranto","立陶宛","欧洲","未签约/已下放",25,"Rifler",0,1,true],["ethan","美国","北美洲","退役",26,"Rifler",0,2,false],["ewjerkz","葡萄牙","欧洲","SAW",25,"Rifler",0,2,true],["ex3rcice","法国","欧洲","未签约/已下放",26,"Rifler",0,3,true],["ex6tenz","比利时","欧洲","退役",36,"Rifler",0,8,false],["exit","巴西","南美洲","Fluxo",29,"Rifler",0,4,true],["exr","丹麦","欧洲","退役",32,"Rifler",0,2,false],["f0rest","瑞典","欧洲","退役",38,"Rifler",1,12,false],["F1KU","波兰","欧洲","Metizport",23,"Rifler",0,3,true],["facecrack","俄罗斯","独联体","PsychoFace",32,"Rifler",0,1,true],["Fallen","巴西","南美洲","FURIA",35,"Rifler",2,19,true],["fame","俄罗斯","独联体","TDK",23,"Rifler",1,4,true],["FaNg","加拿大","北美洲","未签约/已下放",24,"Rifler",0,2,true],["Farlig","丹麦","欧洲","退役",27,"AWPer",0,1,false],["fashr","荷兰","欧洲","未签约/已下放",30,"Rifler",0,2,true],["faveN","德国","欧洲","BIG",26,"Rifler",0,2,true],["fEAR","乌克兰","欧洲","fnatic",25,"Rifler",0,2,true],["fel1x","德国","欧洲","退役",38,"Rifler",0,1,false],["felps","巴西","南美洲","未签约/已下放",29,"Rifler",0,7,true],["fer","巴西","南美洲","未签约/已下放",34,"Rifler",2,14,true],["fetish","丹麦","欧洲","未签约/已下放",39,"Rifler",0,4,true],["fifflaren","瑞典","欧洲","退役",38,"AWPer",1,3,false],["fitch","哈萨克斯坦","独联体","未签约/已下放",34,"Rifler",0,2,true],["FL1T","俄罗斯","独联体","未签约/已下放",25,"Rifler",1,7,true],["fl4mus","俄罗斯","独联体","GamerLegion",21,"Rifler",0,3,true],["flameZ","以色列","非洲与以色列","Vitality",23,"Rifler",2,7,true],["flamie","俄罗斯","独联体","未签约/已下放",29,"Rifler",0,12,true],["floppy","美国","北美洲","未签约/已下放",26,"Rifler",0,4,true],["flusha","瑞典","欧洲","退役",32,"Rifler",3,14,false],["FNS","加拿大","北美洲","退役",34,"Rifler",0,3,false],["fnx","巴西","南美洲","退役",36,"Rifler",2,3,false],["forester","俄罗斯","独联体","未签约/已下放",26,"Rifler",0,3,true],["fox","葡萄牙","欧洲","未签约/已下放",39,"AWPer",0,5,true],["freakazoid","美国","北美洲","未签约/已下放",33,"Rifler",0,3,true],["freeman","中国","亚太","未签约/已下放",26,"Rifler",0,2,true],["friberg","瑞典","欧洲","退役",34,"Rifler",1,9,false],["friis","丹麦","欧洲","未签约/已下放",37,"Rifler",0,2,true],["frozen","斯洛伐克","欧洲","FaZe",24,"Rifler",0,8,true],["fugly","美国","北美洲","退役",31,"Rifler",0,3,false],["furlan","波兰","欧洲","退役",31,"Rifler",0,2,false],["fxy0","法国","欧洲","退役",34,"AWPer",0,1,false],["gade","丹麦","欧洲","FaZe Up Next",31,"Coach",0,3,true],["gafolo","巴西","南美洲","Sharks",24,"Rifler",0,1,true],["GeT-RiGhT","瑞典","欧洲","退役",36,"Rifler",1,12,false],["Gizmy","英国","欧洲","100 Thieves",22,"Rifler",0,1,true],["gla1ve","丹麦","欧洲","100 Thieves",31,"Coach",4,14,true],["GMX","法国","欧洲","退役",33,"Rifler",0,3,false],["gob-b","德国","欧洲","退役",38,"Coach",0,6,false],["golden","瑞典","欧洲","未签约/已下放",32,"Rifler",0,3,true],["Goofy","波兰","欧洲","未签约/已下放",25,"Rifler",0,2,true],["gr1ks","白俄罗斯","独联体","BIG",20,"AWPer",0,1,true],["gratisfaction","新西兰","大洋洲","未签约/已下放",30,"AWPer",0,2,true],["Graviti","法国","欧洲","3DMAX",22,"Rifler",0,3,true],["Grim","美国","北美洲","NRG",25,"Rifler",0,8,true],["gruby","波兰","欧洲","未签约/已下放",31,"Rifler",0,2,true],["guardian","斯洛伐克","欧洲","退役",35,"AWPer",0,14,false],["gxx-","塞尔维亚科索沃","欧洲","ASTRAL",27,"AWPer",0,3,true],["hades","波兰","欧洲","未签约/已下放",26,"AWPer",0,5,true],["hallzerk","挪威","欧洲","NRG",26,"AWPer",0,4,true],["hampus","瑞典","欧洲","Johnny Speeds",27,"Rifler",0,4,true],["happy","法国","欧洲","退役",34,"Rifler",2,11,false],["hardstyle","土耳其","亚太","未签约/已下放",43,"Coach",0,1,true],["hardzao","巴西","南美洲","Fake do Biru",25,"Rifler",0,2,true],["harts","法国","欧洲","退役",40,"Rifler",0,2,false],["hasteka","蒙古","亚太","Chinggis Warriors",28,"Rifler",0,1,true],["hatz","澳大利亚","大洋洲","未签约/已下放",28,"Rifler",0,2,true],["havoc","澳大利亚","大洋洲","退役",36,"Rifler",0,4,false],["hazed","美国","北美洲","退役",37,"Rifler",0,5,false],["headtr1ck","乌克兰","欧洲","Inner Circle",22,"AWPer",0,3,true],["heavygod","以色列","非洲与以色列","G2",23,"Rifler",0,4,true],["hen1","巴西","南美洲","未签约/已下放",31,"AWPer",0,3,true],["HexT","加拿大","北美洲","Wildcard",24,"Rifler",0,3,true],["hiko","美国","北美洲","退役",36,"Rifler",0,9,false],["history","巴西","南美洲","Patins da Ferrari",22,"AWPer",0,2,true],["hobbit","哈萨克斯坦","独联体","PARIVISION",32,"Rifler",1,9,true],["hooch","俄罗斯","独联体","未签约/已下放",39,"Rifler",0,2,true],["hooxi","丹麦","欧洲","Astralis",31,"Rifler",0,6,true],["HS","爱沙尼亚","欧洲","Millennium",29,"Rifler",0,1,true],["HUASOPEEK","智利","南美洲","9z",23,"Rifler",0,1,true],["hunden","丹麦","欧洲","Sashi",35,"Coach",0,1,true],["hunter-","波黑","欧洲","G2",30,"Rifler",0,9,true],["hutji","俄罗斯","独联体","退役",30,"Rifler",0,4,false],["hyper","波兰","欧洲","退役",36,"Rifler",0,2,false],["hypex","波兰","欧洲","GamerLegion",22,"AWPer",0,2,true],["icy","哈萨克斯坦","独联体","未签约/已下放",20,"AWPer",0,3,true],["iM","罗马尼亚","欧洲","Natus Vincere",26,"Rifler",1,7,true],["imoRR","土耳其","亚太","未签约/已下放",26,"Rifler",0,1,true],["innocent","波兰","欧洲","KOLESIE",32,"Rifler",0,3,true],["ins","澳大利亚","大洋洲","FlyQuest",27,"Rifler",0,8,true],["insani","巴西","南美洲","MIBR",22,"Rifler",0,4,true],["interz","俄罗斯","独联体","未签约/已下放",25,"Rifler",0,4,true],["iorek","法国","欧洲","退役",37,"Rifler",0,1,false],["isak","瑞典","欧洲","未签约/已下放",24,"Rifler",0,4,true],["iSSAA","约旦","亚太","退役",29,"Rifler",0,3,false],["jabbi","丹麦","欧洲","Astralis",22,"Rifler",0,6,true],["jackasmo","乌克兰","欧洲","fnatic",19,"Rifler",0,2,true],["jackz","法国","欧洲","Hashiras",34,"Rifler",0,4,true],["jambo","乌克兰","欧洲","fnatic",21,"AWPer",0,2,true],["Jame","俄罗斯","独联体","PARIVISION",27,"AWPer",1,10,true],["James","澳大利亚","大洋洲","未签约/已下放",32,"Rifler",0,1,true],["Jamyoung","中国","亚太","TYLOO",25,"Rifler",0,3,true],["jasonR","加拿大","北美洲","退役",31,"Rifler",0,1,false],["JBa","美国","北美洲","M80",22,"Rifler",0,3,true],["jcobbb","波兰","欧洲","FaZe",21,"Rifler",0,1,true],["JDC","德国","欧洲","BIG",26,"Rifler",0,4,true],["Jdm64","美国","北美洲","退役",36,"AWPer",0,6,false],["jee","中国","亚太","TYLOO",21,"AWPer",0,4,true],["Jeorge","美国","北美洲","NRG",23,"Rifler",0,2,true],["Jerry","俄罗斯","独联体","未签约/已下放",28,"Rifler",0,3,true],["Jimpphat","芬兰","欧洲","Aurora",19,"Rifler",0,4,true],["jkaem","挪威","欧洲","未签约/已下放",32,"Rifler",0,9,true],["jks","澳大利亚","大洋洲","FlyQuest",30,"Rifler",0,11,true],["jL","立陶宛","欧洲","未签约/已下放",26,"Rifler",1,4,true],["jmqa","俄罗斯","独联体","未签约/已下放",29,"AWPer",0,2,true],["jnt","巴西","南美洲","未签约/已下放",32,"Coach",0,1,true],["JOTA","巴西","南美洲","未签约/已下放",28,"Rifler",0,2,true],["jottAAA","土耳其","亚太","Eternal Fire",24,"Rifler",0,2,true],["jR","乌克兰","欧洲","Inner Circle",33,"Coach",0,4,true],["JT","南非","非洲与以色列","Liquid",27,"Rifler",0,6,true],["juanflatroo","塞尔维亚科索沃","欧洲","未签约/已下放",29,"Rifler",0,3,true],["jugi","丹麦","欧洲","退役",29,"AWPer",0,2,false],["junior","美国","北美洲","Voca",25,"AWPer",0,2,true],["just","葡萄牙","欧洲","退役",30,"Rifler",0,1,false],["JW","瑞典","欧洲","EYEBALLERS",31,"AWPer",3,14,true],["k0nfig","丹麦","欧洲","退役",29,"Rifler",0,7,false],["k1to","德国","欧洲","AM",27,"Rifler",0,2,true],["kabal","蒙古","亚太","未签约/已下放",31,"Rifler",0,2,true],["karrigan","丹麦","欧洲","Falcons",36,"Rifler",2,22,true],["karsa","中国","亚太","未签约/已下放",34,"Rifler",0,1,true],["kauez","巴西","南美洲","未签约/已下放",23,"Rifler",0,3,true],["kaze","马来西亚","亚太","未签约/已下放",31,"AWPer",0,3,true],["keev","德国","欧洲","退役",34,"AWPer",0,2,false],["KEi","波兰","欧洲","Phantom",25,"Rifler",0,1,true],["kennys","法国","欧洲","退役",31,"AWPer",1,14,false],["kensi","俄罗斯","独联体","Lavked",24,"Rifler",0,1,true],["kensizor","乌克兰","欧洲","B8",20,"Rifler",0,3,true],["Keoz","比利时","欧洲","GenOne",25,"Rifler",0,4,true],["keshandr","俄罗斯","独联体","退役",32,"Rifler",0,2,false],["khan","哈萨克斯坦","独联体","Nemiga",22,"AWPer",0,1,true],["khrn","芬兰","欧洲","退役",36,"Rifler",0,1,false],["kinqie","俄罗斯","独联体","BET-M",34,"Rifler",0,1,true],["kioshima","法国","欧洲","退役",31,"Rifler",2,11,false],["kisserek","波兰","欧洲","SINNERS",23,"Rifler",0,1,true],["kjaerbye","丹麦","欧洲","未签约/已下放",28,"Rifler",1,7,true],["kl1m","俄罗斯","独联体","未签约/已下放",21,"AWPer",0,2,true],["kngv","巴西","南美洲","未签约/已下放",33,"AWPer",0,2,true],["koala","巴西","南美洲","Sharks",21,"Rifler",0,1,true],["koosta","美国","北美洲","退役",30,"AWPer",0,1,false],["KQLY","法国","欧洲","退役",35,"Rifler",0,3,false],["Krabeni","塞尔维亚科索沃","欧洲","FUT",21,"Rifler",0,1,true],["krad","俄罗斯","独联体","未签约/已下放",27,"Rifler",0,4,true],["kraghen","丹麦","欧洲","9INE",24,"Rifler",0,1,true],["krasnal","波兰","欧洲","未签约/已下放",23,"Rifler",0,1,true],["krimbo","德国","欧洲","未签约/已下放",23,"Rifler",0,3,true],["krimz","瑞典","欧洲","EYEBALLERS",32,"Rifler",2,18,true],["krizzen","哈萨克斯坦","独联体","未签约/已下放",26,"Rifler",0,2,true],["krystal","德国","欧洲","未签约/已下放",32,"Coach",0,4,true],["KSCERATO","巴西","南美洲","FURIA",26,"Rifler",0,11,true],["kucheR","俄罗斯","独联体","退役",37,"Rifler",0,5,false],["kvem","乌克兰","欧洲","Eternal Fire",24,"Rifler",0,1,true],["kvik","立陶宛","欧洲","退役",30,"Rifler",0,3,false],["kye","巴西","南美洲","Fluxo",21,"Rifler",0,2,true],["kylar","波兰","欧洲","Phantom",26,"Rifler",0,2,true],["kyojin","法国","欧洲","Clutchain",27,"Rifler",0,1,true],["kyousuke","俄罗斯","独联体","Falcons",18,"Rifler",1,2,true],["kyxsan","北马其顿","欧洲","Aurora",26,"Rifler",0,5,true],["l00m1","瑞典","欧洲","Entropy",25,"AWPer",0,1,true],["L1hang","中国","亚太","Rare Atom",22,"Rifler",0,2,true],["lack1","哈萨克斯坦","独联体","FORZE Reload",26,"Rifler",0,1,true],["lake","美国","北美洲","M80",21,"Rifler",0,3,true],["latto","巴西","南美洲","Legacy",23,"Rifler",0,6,true],["launx","罗马尼亚","欧洲","未签约/已下放",21,"Rifler",0,2,true],["legija","德国","欧洲","退役",35,"Rifler",0,3,false],["lekr0","瑞典","欧洲","未签约/已下放",33,"Rifler",0,5,true],["letn1","塞尔维亚","欧洲","MIBR",33,"Coach",0,1,true],["liazz","澳大利亚","大洋洲","THUNDER dOWNUNDER",28,"Rifler",0,8,true],["LNZ","瑞典","欧洲","MIBR",23,"Rifler",0,3,true],["lomme","丹麦","欧洲","未签约/已下放",32,"Rifler",0,2,true],["LOVEYY","中国","亚太","退役",37,"Rifler",0,1,false],["lowel","西班牙","欧洲","退役",29,"Rifler",0,3,false],["lucaozy","巴西","南美洲","未签约/已下放",24,"Rifler",0,5,true],["lucas1","巴西","南美洲","未签约/已下放",31,"Rifler",0,2,true],["luchov","阿根廷","南美洲","9z",25,"Rifler",0,1,true],["Lucky（丹麦）","丹麦","欧洲","Washed",23,"AWPer",0,1,true],["Lucky（法国）","法国","欧洲","3DMAX",28,"Rifler",0,5,true],["luken","阿根廷","南美洲","未签约/已下放",29,"Rifler",0,2,true],["lux","巴西","南美洲","Luminosity",24,"Rifler",0,4,true],["m0nesy","俄罗斯","独联体","Falcons",21,"AWPer",1,7,true],["maden","黑山","欧洲","未签约/已下放",27,"Rifler",0,3,true],["Magisk","丹麦","欧洲","BC.Game",28,"Rifler",4,11,true],["magixx","俄罗斯","独联体","Spirit",23,"Rifler",1,7,true],["magnojez","俄罗斯","独联体","BetBoom",21,"Rifler",0,2,true],["maikelele","瑞典","欧洲","退役",35,"AWPer",0,5,false],["maj3r","土耳其","亚太","未签约/已下放",35,"Rifler",0,6,true],["MaKa","法国","欧洲","3DMAX",29,"AWPer",0,3,true],["makazze","塞尔维亚科索沃","欧洲","Natus Vincere",19,"Rifler",0,2,true],["malbsmd","危地马拉","北美洲","Liquid",23,"Rifler",0,4,true],["malta","澳大利亚","大洋洲","退役",30,"Rifler",0,3,false],["maniac","瑞士","欧洲","退役",36,"Rifler",0,5,false],["marek","中国","亚太","Rare Atom",32,"Coach",0,1,true],["markeloff","乌克兰","欧洲","退役",38,"AWPer",0,12,false],["MATYS","斯洛伐克","欧洲","G2",24,"Rifler",0,3,true],["max","乌拉圭","南美洲","9z",27,"Rifler",0,3,true],["maxxkor","阿根廷","南美洲","Sharks",23,"AWPer",0,1,true],["mercury","中国","亚太","TYLOO",25,"Rifler",0,3,true],["meyern","阿根廷","南美洲","9z",23,"AWPer",0,1,true],["mezii","英国","欧洲","Vitality",27,"Rifler",2,7,true],["michu","波兰","欧洲","未签约/已下放",29,"Rifler",0,2,true],["minise","波兰","欧洲","退役",32,"AWPer",0,1,false],["mir","俄罗斯","独联体","Virtus.pro",30,"Rifler",0,5,true],["misutaaa","法国","欧洲","3DMAX",23,"Rifler",0,2,true],["mithilf","印度","亚太","退役",33,"Rifler",0,1,false],["mixwell","西班牙","欧洲","未签约/已下放",30,"AWPer",0,2,true],["mlhzin","巴西","南美洲","Patins da Ferrari",20,"Rifler",0,1,true],["moddii","瑞典","欧洲","退役",36,"Rifler",0,1,false],["MoDo","罗马尼亚","欧洲","SINNERS",23,"AWPer",0,1,true],["molodoy","哈萨克斯坦","独联体","FURIA",21,"AWPer",0,3,true],["mopoz","西班牙","欧洲","Gentle Mates",29,"Rifler",0,2,true],["moseyuh","中国","亚太","TYLOO",21,"Rifler",0,3,true],["mou","哈萨克斯坦","独联体","HOTU",34,"Coach",1,6,true],["mouz","波兰","欧洲","退役",30,"Rifler",0,1,false],["MSL","丹麦","欧洲","退役",31,"Rifler",0,9,false],["MUTiRiS","葡萄牙","欧洲","SAW",33,"Rifler",0,1,true],["mynio","波兰","欧洲","未签约/已下放",30,"Rifler",0,1,true],["mzinho","蒙古","亚太","BC.Game",19,"Rifler",0,5,true],["n0rb3r7","俄罗斯","独联体","HOTU",25,"Rifler",1,4,true],["n0thing","美国","北美洲","未签约/已下放",35,"Rifler",0,10,true],["n1ssim","巴西","南美洲","Legacy",25,"Rifler",0,4,true],["NAF","加拿大","北美洲","Liquid",28,"Rifler",0,14,true],["nafany","俄罗斯","独联体","TDK",25,"Rifler",0,3,true],["natu","芬兰","欧洲","退役",41,"Rifler",0,1,false],["nawwk","瑞典","欧洲","未签约/已下放",28,"AWPer",0,3,true],["NBK-","法国","欧洲","未签约/已下放",32,"Rifler",2,14,true],["nealan","哈萨克斯坦","独联体","NOVAQ",25,"AWPer",0,2,true],["nekiz","巴西","南美洲","未签约/已下放",30,"Rifler",0,4,true],["neo","波兰","欧洲","Astralis",39,"Coach",1,14,true],["neofrag","捷克","欧洲","未签约/已下放",25,"Rifler",0,2,true],["NertZ","以色列","非洲与以色列","G2",27,"Rifler",0,6,true],["nettik","新西兰","大洋洲","FlyQuest",22,"Rifler",0,3,true],["nex","德国","欧洲","退役",34,"Rifler",0,10,false],["nexa","塞尔维亚","欧洲","未签约/已下放",29,"Rifler",0,4,true],["ngiN","土耳其","亚太","退役",33,"Rifler",0,1,false],["nickelback","俄罗斯","独联体","SPARTA",28,"Rifler",0,2,true],["Nico","丹麦","欧洲","退役",34,"AWPer",0,2,false],["nicoodoz","丹麦","欧洲","Phantom",25,"AWPer",0,6,true],["nicx","美国","北美洲","Marsborne",22,"Rifler",0,2,true],["nifty","美国","北美洲","退役",28,"AWPer",0,2,false],["niko(丹麦)","丹麦","欧洲","Millennium",27,"Rifler",0,2,true],["NiKo（波黑）","波黑","欧洲","Falcons",29,"Rifler",1,17,true],["nilo","瑞典","欧洲","HEROIC",21,"Rifler",0,1,true],["nin9","蒙古","亚太","The Huns",28,"AWPer",0,2,true],["nitr0","美国","北美洲","NRG",30,"Rifler",0,14,true],["nodios","丹麦","欧洲","未签约/已下放",27,"Rifler",0,1,true],["norwi","俄罗斯","独联体","Lavked",25,"Rifler",0,1,true],["nota","俄罗斯","独联体","未签约/已下放",19,"Rifler",0,2,true],["noway","巴西","南美洲","Imperial",21,"Rifler",0,4,true],["npl","乌克兰","欧洲","B8",20,"Rifler",0,4,true],["nqz","巴西","南美洲","MIBR",21,"AWPer",0,5,true],["nukkye","立陶宛","欧洲","ALGO",28,"Rifler",0,1,true],["obo","美国","北美洲","未签约/已下放",23,"Rifler",0,2,true],["olofmeister","瑞典","欧洲","未签约/已下放",34,"Rifler",2,16,true],["oSee","美国","北美洲","未签约/已下放",27,"AWPer",0,5,true],["oskar","捷克","欧洲","退役",35,"AWPer",0,4,false],["ottond","芬兰","欧洲","未签约/已下放",28,"AWPer",0,1,true],["pancc","巴西","南美洲","UNO MILLE",28,"Rifler",0,1,true],["pashabiceps","波兰","欧洲","退役",38,"Rifler",1,13,false],["patsi","俄罗斯","独联体","未签约/已下放",22,"Rifler",0,2,true],["Patti","丹麦","欧洲","STATE",28,"Rifler",0,1,true],["paz","土耳其","亚太","未签约/已下放",29,"Rifler",0,2,true],["peet","波兰","欧洲","退役",35,"AWPer",0,2,false],["perfecto","俄罗斯","独联体","未签约/已下放",26,"Rifler",1,6,true],["phzy","瑞典","欧洲","Astralis",23,"AWPer",0,3,true],["pimp","丹麦","欧洲","未签约/已下放",30,"Rifler",0,6,true],["piriajr","巴西","南美洲","paiN",23,"Rifler",0,2,true],["pita","波黑","欧洲","EYEBALLERS",35,"Coach",0,2,true],["PKL","巴西","南美洲","Fake do Biru",31,"Rifler",0,1,true],["plopski","瑞典","欧洲","Metizport",24,"Rifler",0,3,true],["polly","挪威","欧洲","未签约/已下放",35,"Rifler",0,2,true],["PR","捷克","欧洲","MOUZ",19,"Rifler",0,2,true],["prb","挪威","欧洲","退役",38,"Rifler",0,1,false],["professor-chaos","美国","北美洲","退役",36,"Rifler",0,1,false],["pronax","瑞典","欧洲","退役",35,"Rifler",3,8,false],["ptr","美国","北美洲","退役",36,"AWPer",0,1,false],["pyth","瑞典","欧洲","退役",32,"Rifler",0,1,false],["Qikert","哈萨克斯坦","独联体","1win",27,"Rifler",1,7,true],["Queenix","丹麦","欧洲","Hashiras",27,"Rifler",0,1,true],["r0bs3n","德国","欧洲","退役",33,"Rifler",0,1,false],["r1nkle","乌克兰","欧洲","G2",21,"AWPer",0,1,true],["r3salt","俄罗斯","独联体","Nemesis",21,"Rifler",0,1,true],["raalz","丹麦","欧洲","9INE",30,"Rifler",0,2,true],["racno","南非","非洲与以色列","退役",39,"Rifler",0,1,false],["rain","挪威","欧洲","100 Thieves",31,"Rifler",1,19,true],["Rainwaker","保加利亚","欧洲","Luminosity",25,"Rifler",0,1,true],["rallen","波兰","欧洲","未签约/已下放",32,"Rifler",0,4,true],["ramz1kbo$$","哈萨克斯坦","独联体","退役",26,"AWPer",0,1,false],["rdnzao","巴西","南美洲","Sharks",23,"Rifler",0,1,true],["realz1n","巴西","南美洲","退役",31,"Rifler",0,1,false],["reck","美国","北美洲","Wildcard",22,"Rifler",0,1,true],["refrezh","丹麦","欧洲","未签约/已下放",28,"Rifler",0,3,true],["regali","罗马尼亚","欧洲","Eternal Fire",23,"AWPer",0,2,true],["reltuc","美国","北美洲","退役",37,"Rifler",0,5,false],["rez","瑞典","欧洲","GamerLegion",28,"Rifler",0,9,true],["rickeh","澳大利亚","大洋洲","退役",34,"AWPer",0,4,false],["rigoN","瑞士","欧洲","未签约/已下放",26,"Rifler",0,4,true],["riskyb0b","俄罗斯","独联体","未签约/已下放",23,"Rifler",0,1,true],["ritz","印度","亚太","未签约/已下放",37,"Rifler",0,1,true],["rix","印度","亚太","未签约/已下放",37,"AWPer",0,1,true],["robiin","瑞典","欧洲","未签约/已下放",31,"Rifler",0,1,true],["roeJ","丹麦","欧洲","退役",32,"Rifler",0,4,false],["roman","葡萄牙","欧洲","退役",34,"Rifler",0,1,false],["ropz","爱沙尼亚","欧洲","Vitality",26,"Rifler",3,13,true],["ROUX","蒙古","亚太","Chinggis Warriors",26,"Rifler",0,1,true],["rox","阿根廷","南美洲","未签约/已下放",23,"Rifler",0,1,true],["RpK","法国","欧洲","退役",36,"Rifler",0,9,false],["rubino","挪威","欧洲","退役",32,"Rifler",0,4,false],["RUSH","美国","北美洲","退役",32,"Rifler",1,5,false],["ryu","立陶宛","欧洲","Astralis",21,"Rifler",0,1,true],["s-chilla","乌克兰","欧洲","未签约/已下放",21,"Rifler",0,1,true],["S0tF1k","俄罗斯","独联体","未签约/已下放",31,"Coach",0,2,true],["s1mple","乌克兰","欧洲","BC.Game",28,"AWPer",1,14,true],["s1n","德国","欧洲","M80",24,"Rifler",0,4,true],["S1ren","俄罗斯","独联体","BetBoom",24,"Rifler",0,3,true],["s1zzi","乌克兰","欧洲","B8",16,"AWPer",0,1,true],["saadzin","巴西","南美洲","Imperial",22,"AWPer",0,3,true],["saffee","巴西","南美洲","paiN",31,"AWPer",0,7,true],["salazar","丹麦","欧洲","Echo",21,"AWPer",0,1,true],["sanji","乌兹别克斯坦","独联体","未签约/已下放",28,"Rifler",0,1,true],["scream","比利时","欧洲","Clutchain",32,"Rifler",0,9,true],["sdy","乌克兰","欧洲","未签约/已下放",29,"Rifler",0,5,true],["seang@res","美国","北美洲","退役",38,"Rifler",0,8,false],["seized","俄罗斯","独联体","退役",31,"Rifler",0,12,false],["semphis","加拿大","北美洲","Voca",36,"Coach",0,5,true],["sener1","塞尔维亚科索沃","欧洲","未签约/已下放",29,"Rifler",0,3,true],["sense","挪威","欧洲","Nordix",22,"Rifler",0,1,true],["senzu","蒙古","亚太","BC.Game",19,"Rifler",0,3,true],["sergej","芬兰","欧洲","未签约/已下放",24,"Rifler",0,2,true],["sf","法国","欧洲","未签约/已下放",34,"Rifler",0,2,true],["sh1ro","俄罗斯","独联体","Spirit",25,"AWPer",1,8,true],["shahzam","美国","北美洲","退役",32,"AWPer",0,5,false],["shalfey","俄罗斯","独联体","未签约/已下放",24,"Rifler",0,2,true],["shara","乌克兰","欧洲","ALGO",34,"Coach",0,2,true],["SHOCK","捷克","欧洲","SINNERS",25,"Rifler",0,1,true],["shox","法国","欧洲","未签约/已下放",34,"Rifler",1,17,true],["shroud","加拿大","北美洲","退役",32,"Rifler",0,7,false],["sick","美国","北美洲","退役",27,"Rifler",0,3,false],["sico","新西兰","大洋洲","未签约/已下放",31,"Rifler",0,5,true],["sinnopsyy","塞尔维亚科索沃","欧洲","JiJieHao",30,"Rifler",0,3,true],["siuhy","波兰","欧洲","未签约/已下放",23,"Rifler",0,7,true],["sixer","法国","欧洲","未签约/已下放",35,"Rifler",0,2,true],["sjuush","丹麦","欧洲","Ninjas in Pyjamas",27,"Rifler",0,7,true],["sk0r","蒙古","亚太","未签约/已下放",24,"Rifler",0,3,true],["skadoodle","美国","北美洲","退役",32,"AWPer",1,10,false],["skullz","巴西","南美洲","未签约/已下放",24,"Rifler",0,3,true],["skurk","挪威","欧洲","未签约/已下放",33,"Rifler",0,1,true],["skytten","瑞典","欧洲","未签约/已下放",33,"Rifler",0,1,true],["sl3nd","匈牙利","欧洲","INFINITE",21,"AWPer",0,1,true],["slaxz-","德国","欧洲","M80",27,"AWPer",0,4,true],["SLOWLY","中国","亚太","退役",24,"Rifler",0,1,false],["smF","丹麦","欧洲","未签约/已下放",34,"Rifler",0,3,true],["smithzz","法国","欧洲","退役",37,"AWPer",1,11,false],["smooya","英国","欧洲","未签约/已下放",26,"AWPer",0,1,true],["snappi","丹麦","欧洲","Ninjas in Pyjamas",36,"Rifler",0,6,true],["snatchie","波兰","欧洲","NAVI Junior",28,"Coach",0,1,true],["Snax","波兰","欧洲","GamerLegion",33,"Rifler",1,17,true],["snow","巴西","南美洲","paiN",19,"Rifler",0,4,true],["snyper","澳大利亚","大洋洲","未签约/已下放",39,"Rifler",0,2,true],["somebody","中国","亚太","未签约/已下放",31,"Rifler",0,5,true],["sonic","南非","非洲与以色列","NRG",27,"Rifler",0,4,true],["soulfly","土耳其","亚太","未签约/已下放",22,"Rifler",0,1,true],["spaze","俄罗斯","独联体","未签约/已下放",29,"Rifler",0,1,true],["speed4k","俄罗斯","独联体","未签约/已下放",30,"AWPer",0,1,true],["spiidi","德国","欧洲","BIG Academy",30,"Coach",0,7,true],["spinx","以色列","非洲与以色列","MOUZ",25,"Rifler",1,9,true],["spooke","瑞典","欧洲","OG",24,"Rifler",0,1,true],["spunj","澳大利亚","大洋洲","退役",36,"Rifler",0,4,false],["stadodo","葡萄牙","欧洲","Rebels",29,"AWPer",0,1,true],["staehr","丹麦","欧洲","Astralis",22,"Rifler",0,3,true],["stanislaw","加拿大","北美洲","Metizport",32,"Rifler",0,8,true],["starix","乌克兰","欧洲","未签约/已下放",38,"Rifler",0,5,true],["starry","中国","亚太","Lynn Vision",21,"Rifler",0,4,true],["stavn","丹麦","欧洲","Ninjas in Pyjamas",24,"AWPer",0,4,true],["stavros","德国","欧洲","未签约/已下放",33,"Rifler",0,1,true],["steel(加拿大)","加拿大","北美洲","未签约/已下放",36,"Rifler",0,1,true],["steel（巴西）","巴西","南美洲","退役",32,"Rifler",0,4,false],["sterling","新西兰","大洋洲","未签约/已下放",28,"AWPer",0,1,true],["stewie2k","美国","北美洲","未签约/已下放",28,"Rifler",1,7,true],["stonde","芬兰","欧洲","退役",33,"AWPer",0,1,false],["story","葡萄牙","欧洲","SAW",24,"AWPer",0,2,true],["stressarN","北马其顿","欧洲","SINNERS",23,"Rifler",0,1,true],["strux1","德国","欧洲","退役",35,"Rifler",0,1,false],["styko","斯洛伐克","欧洲","未签约/已下放",30,"Rifler",0,5,true],["summer","中国","亚太","Rare Atom",29,"Rifler",0,6,true],["sunny","芬兰","欧洲","未签约/已下放",31,"Rifler",0,3,true],["sunpayus","西班牙","欧洲","未签约/已下放",27,"AWPer",0,6,true],["susp","瑞典","欧洲","HEROIC",21,"Rifler",0,3,true],["svyat","俄罗斯","独联体","未签约/已下放",31,"Rifler",0,1,true],["swag","美国","北美洲","Third Prime",29,"Coach",0,4,true],["swisher","美国","北美洲","M80",27,"Rifler",0,3,true],["syrson","德国","欧洲","未签约/已下放",30,"AWPer",0,4,true],["szpero","波兰","欧洲","退役",35,"Rifler",0,1,false],["t0rick","阿塞拜疆","独联体","未签约/已下放",32,"Rifler",0,1,true],["tabsen","德国","欧洲","BIG",31,"Rifler",0,10,true],["taco","巴西","南美洲","未签约/已下放",31,"Rifler",2,10,true],["tarik","美国","北美洲","未签约/已下放",30,"Rifler",1,9,true],["tauson","丹麦","欧洲","GamerLegion",20,"Rifler",0,3,true],["taz","波兰","欧洲","BC.Game",40,"Coach",1,12,true],["techno","蒙古","亚太","The MongolZ",21,"Rifler",0,8,true],["tenzki","丹麦","欧洲","退役",32,"Coach",0,3,false],["TeSeS","丹麦","欧洲","Falcons",25,"Rifler",1,9,true],["thomas","英国","欧洲","退役",28,"Rifler",0,1,false],["threat","瑞典","欧洲","退役",38,"Rifler",0,1,false],["tiger","中国","亚太","未签约/已下放",23,"AWPer",0,1,true],["tizian","德国","欧洲","退役",30,"Rifler",0,5,false],["TjP","澳大利亚","大洋洲","THUNDER dOWNUNDER",24,"Rifler",0,1,true],["tN1R","白俄罗斯","独联体","Spirit",25,"Rifler",0,3,true],["tonyblack","俄罗斯","独联体","Aurora Young Blud",33,"Coach",0,3,true],["topgun","澳大利亚","大洋洲","未签约/已下放",37,"Rifler",0,3,true],["torzsi","匈牙利","欧洲","MOUZ",24,"AWPer",0,7,true],["travis","俄罗斯","独联体","SPARTA",28,"Rifler",0,1,true],["troubley","德国","欧洲","退役",33,"Rifler",0,2,false],["try","阿根廷","南美洲","Legacy",21,"AWPer",0,4,true],["tuurtle","巴西","南美洲","Fake do Biru",27,"Rifler",0,1,true],["twist","瑞典","欧洲","Alliance",31,"Rifler",0,5,true],["twistzz","加拿大","北美洲","FaZe",26,"Rifler",1,11,true],["ub1que","俄罗斯","独联体","退役",34,"Rifler",0,1,false],["ultimate","波兰","欧洲","未签约/已下放",22,"AWPer",0,4,true],["ultra","挪威","欧洲","未签约/已下放",33,"Rifler",0,1,true],["ustilo","澳大利亚","大洋洲","未签约/已下放",32,"Rifler",0,3,true],["uzzziii","法国","欧洲","退役",36,"Rifler",0,3,false],["valde","丹麦","欧洲","未签约/已下放",31,"Rifler",0,4,true],["venomzera","巴西","南美洲","MIBR",21,"Rifler",0,2,true],["Vexite","澳大利亚","大洋洲","FlyQuest",21,"Rifler",0,6,true],["vice","美国","北美洲","退役",30,"Rifler",0,1,false],["VINI","巴西","南美洲","Imperial",27,"Rifler",0,9,true],["volt","罗马尼亚","欧洲","INFINITE",24,"Rifler",0,3,true],["vsm","巴西","南美洲","paiN",27,"Rifler",0,2,true],["w0nderful","乌克兰","欧洲","Natus Vincere",21,"AWPer",1,6,true],["waterfallz","俄罗斯","独联体","NEW VISION",31,"Coach",0,2,true],["waylander","俄罗斯","独联体","退役",32,"Rifler",0,6,false],["Westmelon","中国","亚太","Lynn Vision",25,"Rifler",0,4,true],["wicadia","土耳其","亚太","Aurora",21,"Rifler",0,4,true],["wood7","巴西","南美洲","未签约/已下放",31,"AWPer",0,2,true],["worldedit","俄罗斯","独联体","未签约/已下放",34,"AWPer",0,10,true],["woro2k","乌克兰","欧洲","未签约/已下放",24,"AWPer",0,1,true],["woxic","土耳其","亚太","Aurora",27,"AWPer",0,8,true],["xand","巴西","南美洲","退役",31,"Rifler",0,1,false],["xant3r","俄罗斯","独联体","未签约/已下放",22,"Rifler",0,1,true],["xantares","土耳其","亚太","Aurora",30,"Rifler",0,8,true],["xarte","芬兰","欧洲","未签约/已下放",34,"Rifler",0,1,true],["xccurate","印度尼西亚","亚太","退役",28,"AWPer",0,2,false],["xelex","匈牙利","欧洲","MOUZ",18,"Rifler",0,1,true],["xelos","瑞典","欧洲","未签约/已下放",33,"Rifler",0,1,true],["xerolte","蒙古","亚太","未签约/已下放",23,"Rifler",0,1,true],["xertion","以色列","非洲与以色列","MOUZ",21,"Rifler",0,7,true],["xfl0ud","土耳其","亚太","FUT",23,"Rifler",0,3,true],["xielo","俄罗斯","独联体","PARIVISION",20,"Rifler",0,2,true],["xizt","瑞典","欧洲","Ninjas in Pyjamas",35,"Coach",1,11,true],["xkacpersky","波兰","欧洲","Ninjas in Pyjamas",19,"Rifler",0,1,true],["xms","法国","欧洲","退役",29,"Rifler",0,1,false],["xotic","美国","北美洲","未签约/已下放",25,"AWPer",0,1,true],["xsepower","俄罗斯","独联体","bankaPEPSI",28,"AWPer",0,1,true],["xseven","芬兰","欧洲","退役",31,"Rifler",0,2,false],["Xyp9x","丹麦","欧洲","未签约/已下放",30,"Rifler",4,17,true],["yam","澳大利亚","大洋洲","未签约/已下放",37,"AWPer",0,1,true],["yay","美国","北美洲","退役",27,"Rifler",0,1,false],["YEKINDAR","拉脱维亚","欧洲","FURIA",26,"Rifler",0,8,true],["yel","巴西","南美洲","退役",34,"Rifler",0,1,false],["yuurih","巴西","南美洲","FURIA",26,"Rifler",0,11,true],["yxngstxr","瑞典","欧洲","未签约/已下放",21,"Rifler",0,2,true],["z4kr","中国","亚太","Lynn Vision",23,"AWPer",0,4,true],["zehn","芬兰","欧洲","未签约/已下放",34,"Rifler",0,2,true],["Zellsis","美国","北美洲","退役",28,"Rifler",0,1,false],["zende","瑞典","欧洲","未签约/已下放",31,"Rifler",0,1,true],["Zero（中国）","中国","亚太","TYLOO",20,"Rifler",0,1,true],["Zero（斯洛伐克）","斯洛伐克","欧洲","退役",27,"Rifler",0,1,false],["zerrofix","乌克兰","欧洲","Inner Circle",19,"Rifler",0,1,true],["zeus","乌克兰","欧洲","退役",38,"Rifler",1,15,false],["zEVES","挪威","欧洲","未签约/已下放",35,"Rifler",0,1,true],["zevy","巴西","南美洲","Fluxo",25,"AWPer",0,4,true],["zews","巴西","南美洲","未签约/已下放",38,"Rifler",0,2,true],["zhokiNg","中国","亚太","TYLOO",32,"Coach",0,1,true],["znajder","瑞典","欧洲","退役",33,"Rifler",1,3,false],["zonic","丹麦","欧洲","Falcons",39,"Coach",0,1,true],["zont1x","乌克兰","欧洲","Spirit",21,"Rifler",1,4,true],["zorte","俄罗斯","独联体","BetBoom",28,"AWPer",0,4,true],["zqks","巴西","南美洲","未签约/已下放",34,"Rifler",0,1,true],["ztr","瑞典","欧洲","FOKUS",22,"Rifler",0,2,true],["zweih","俄罗斯","独联体","PARIVISION",18,"Rifler",0,3,true],["zyphon","丹麦","欧洲","Sashi",22,"Rifler",0,3,true],["ZywOo","法国","欧洲","Vitality",25,"AWPer",3,11,true]];

  const ALL_PLAYERS = RAW_PLAYERS.map(p => ({
    nickname: p[0],
    nationality: p[1],
    region: p[2],
    team: p[3],
    age: p[4],
    role: p[5],
    majorChampionships: p[6],
    majorAppearances: p[7],
    isActive: p[8]
  }));

  // 快速查找: nickname -> player
  const PLAYER_MAP = new Map();
  ALL_PLAYERS.forEach(p => PLAYER_MAP.set(p.nickname.toLowerCase(), p));

  // ==================== 常量 ====================
  const AGE_CLOSE = 3;
  const MAJOR_CLOSE = 1;
  const MAX_DISPLAY = 50;

  var DEBUG = true;

  function log() {
    if (DEBUG) console.log('[CS2Helper]', Array.prototype.slice.call(arguments).join(' '));
  }
  let candidates = [...ALL_PLAYERS];
  let guessHistory = [];
  let gameActive = false;
  let gameMode = null; // 'single' | 'multi' | null
  let multiObserver = null;
  let panelEl = null;

  // ==================== 核心过滤逻辑 ====================
  function checkAttrNumber(playerVal, feedback) {
    const guessVal = feedback.value;
    const diff = playerVal - guessVal;
    if (feedback.level === 'correct') return playerVal === guessVal;
    if (feedback.level === 'close') {
      if (playerVal === guessVal) return false;
      return Math.abs(diff) <= MAJOR_CLOSE;
    }
    // wrong
    if (feedback.hint === 'higher') return diff > MAJOR_CLOSE;
    if (feedback.hint === 'lower') return diff < -MAJOR_CLOSE;
    return true;
  }

  function checkAttrAge(playerAge, feedback) {
    const guessAge = feedback.value;
    const diff = playerAge - guessAge;
    if (feedback.level === 'correct') return playerAge === guessAge;
    if (feedback.level === 'close') {
      if (playerAge === guessAge) return false;
      return Math.abs(diff) <= AGE_CLOSE;
    }
    if (feedback.hint === 'higher') return diff > AGE_CLOSE;
    if (feedback.hint === 'lower') return diff < -AGE_CLOSE;
    return true;
  }

  function playerMatchesFeedback(player, feedback) {
    const attr = feedback.attributes;
    if (!attr) return true;

    // nationality
    if (attr.nationality) {
      const nv = attr.nationality.value;
      if (attr.nationality.level === 'correct' && player.nationality !== nv) return false;
      if (attr.nationality.level === 'close') {
        if (player.nationality === nv) return false;
        const guessed = PLAYER_MAP.get(String(feedback.nickname).toLowerCase());
        const regionVal = (attr.region && attr.region.value) ? attr.region.value : (guessed ? guessed.region : null);
        if (regionVal && player.region !== regionVal) return false;
      }
      if (attr.nationality.level === 'wrong') {
        const guessed = PLAYER_MAP.get(String(feedback.nickname).toLowerCase());
        const regionVal = (attr.region && attr.region.value) ? attr.region.value : (guessed ? guessed.region : null);
        if (regionVal && player.region === regionVal) return false;
      }
    }

    // region (redundant & supplementary)
    if (attr.region && attr.region.value) {
      if (attr.region.level === 'correct' && player.region !== attr.region.value) return false;
      if (attr.region.level === 'wrong' && player.region === attr.region.value) return false;
    }

    // team
    if (attr.team) {
      if (attr.team.level === 'correct' && player.team !== attr.team.value) return false;
      if (attr.team.level === 'wrong' && player.team === attr.team.value) return false;
    }

    // age
    if (attr.age) {
      if (!checkAttrAge(player.age, attr.age)) return false;
    }

    // role
    if (attr.role) {
      if (attr.role.level === 'correct' && player.role !== attr.role.value) return false;
      if (attr.role.level === 'wrong' && player.role === attr.role.value) return false;
    }

    // majorChampionships
    if (attr.majorChampionships) {
      if (!checkAttrNumber(player.majorChampionships, attr.majorChampionships)) return false;
    }

    // majorAppearances
    if (attr.majorAppearances) {
      if (!checkAttrNumber(player.majorAppearances, attr.majorAppearances)) return false;
    }

    // isActive
    if (attr.isActive) {
      if (attr.isActive.level === 'correct' && player.isActive !== attr.isActive.value) return false;
      if (attr.isActive.level === 'wrong' && player.isActive === attr.isActive.value) return false;
    }

    return true;
  }

  function filterCandidates() {
    const guessedNicks = new Set(guessHistory.map(g => String(g.nickname).toLowerCase()));
    var before = candidates.length;
    candidates = ALL_PLAYERS.filter(player => {
      if (guessedNicks.has(player.nickname.toLowerCase())) return false;
      for (const feedback of guessHistory) {
        if (!playerMatchesFeedback(player, feedback)) return false;
      }
      return true;
    });
    log('filterCandidates: ' + before + ' -> ' + candidates.length + ' (已排除: ' + Array.from(guessedNicks).join(',') + ')');
  }

  // ==================== 推荐引擎 ====================
  function computeFeedbackKey(guess, target) {
    const parts = [];

    // nationality
    if (guess.nationality === target.nationality) parts.push('Nc');
    else if (guess.region === target.region) parts.push('Nl');
    else parts.push('Nw');

    // team
    parts.push(guess.team === target.team ? 'Tc' : 'Tw');

    // age
    const ageDiff = target.age - guess.age;
    if (ageDiff === 0) parts.push('Ac');
    else if (Math.abs(ageDiff) <= AGE_CLOSE) parts.push('Al_' + (ageDiff > 0 ? 'h' : 'l'));
    else parts.push('Aw_' + (ageDiff > 0 ? 'h' : 'l'));

    // role
    parts.push(guess.role === target.role ? 'Rc' : 'Rw');

    // majorChampionships
    const mcDiff = target.majorChampionships - guess.majorChampionships;
    if (mcDiff === 0) parts.push('MCc');
    else if (Math.abs(mcDiff) <= MAJOR_CLOSE) parts.push('MCl_' + (mcDiff > 0 ? 'h' : 'l'));
    else parts.push('MCw_' + (mcDiff > 0 ? 'h' : 'l'));

    // majorAppearances
    const maDiff = target.majorAppearances - guess.majorAppearances;
    if (maDiff === 0) parts.push('MAc');
    else if (Math.abs(maDiff) <= MAJOR_CLOSE) parts.push('MAl_' + (maDiff > 0 ? 'h' : 'l'));
    else parts.push('MAw_' + (maDiff > 0 ? 'h' : 'l'));

    // isActive
    parts.push(guess.isActive === target.isActive ? 'IAc' : 'IAw');

    return parts.join('|');
  }

  function computeBestGuesses(count) {
    if (candidates.length <= 1) return candidates.slice();

    const n = candidates.length;
    const scored = [];

    for (const guess of candidates) {
      const patterns = new Map();
      for (const target of candidates) {
        if (target.nickname === guess.nickname) continue;
        const key = computeFeedbackKey(guess, target);
        patterns.set(key, (patterns.get(key) || 0) + 1);
      }

      // Expected remaining after guess (excluding target case = immediate win)
      let sumSquares = 0;
      let totalTargets = 0;
      for (const cnt of patterns.values()) {
        sumSquares += cnt * cnt;
        totalTargets += cnt;
      }
      // Include the case where guess IS the target (remaining = 0, probability = 1/n)
      // For the (n-1) wrong targets, expected remaining = sum(count²) / (n-1)
      // Combined: (0 * 1 + sum(count²) / (n-1) * (n-1)) / n = sum(count²) / n
      const avgRemaining = totalTargets > 0 ? sumSquares / n : 0;

      scored.push({
        player: guess,
        score: avgRemaining,
        diversity: patterns.size
      });
    }

    scored.sort((a, b) => a.score - b.score || b.diversity - a.diversity);
    return scored.slice(0, count).map(s => s.player);
  }

  // ==================== XHR 拦截 (仅单人模式) ====================
  function interceptXHR() {
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function(method, url) {
      this._cs2_url = url;
      return origOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function() {
      const xhr = this;
      xhr.addEventListener('load', function() {
        const url = xhr._cs2_url || '';
        if (!url || typeof url !== 'string') return;

        if (gameMode !== 'single') return;

        // 猜测反馈
        if (url.includes('/api/game/') && url.includes('/guess')) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.feedback) {
              processGuess(data.feedback);
            }
            if (data.status === 'won' || data.status === 'lost') {
              gameActive = false;
              updatePanel();
            }
          } catch(e) {}
        }

        // 新游戏开始
        if (url.includes('/api/game/start')) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.gameId) {
              startNewGame();
            }
          } catch(e) {}
        }
      });
      return origSend.apply(xhr, arguments);
    };
  }

  function processGuess(feedback) {
    guessHistory.push(feedback);
    gameActive = true;
    filterCandidates();
    updatePanel();
  }

  function startNewGame() {
    guessHistory = [];
    candidates = [...ALL_PLAYERS];
    gameActive = false;
    updatePanel();
  }

  // 选手查询页面分析
  function onPlayerSearchResult(players) {
    // 在搜索页面展示匹配的选手信息
    if (!panelEl) createPanel();
  }

  // ==================== DOM 解析已有猜测 ====================
  function getSelfBoardSelector() {
    return gameMode === 'multi' ? '.player-board-self .game-table tbody tr' : '.game-table tbody tr';
  }

  function parseExistingGuesses() {
    var selector = getSelfBoardSelector();
    var rows = document.querySelectorAll(selector);
    log('parseExistingGuesses: 选择器=' + selector + ' 行数=' + rows.length + ' 已记录=' + guessHistory.length);
    if (!rows.length) return;

    var newRows = false;
    rows.forEach(function(row) {
      var cells = row.querySelectorAll('td');
      if (cells.length < 8) { log('  跳过行: 只有' + cells.length + '个td'); return; }

      var nickname = (cells[0].textContent || '').trim();
      if (!nickname) { log('  跳过隐藏猜测行'); return; }

      var isCorrect = row.classList.contains('row-correct');

      if (guessHistory.some(function(g) { return String(g.nickname).toLowerCase() === nickname.toLowerCase(); })) return;
      newRows = true;

      function getValue(colIdx) {
        var text = (cells[colIdx].textContent || '').trim();
        var dirEl = cells[colIdx].querySelector('.dir');
        if (dirEl) text = text.replace(dirEl.textContent || '', '').trim();
        return text;
      }

      function getLevel(colIdx) {
        if (cells[colIdx].classList.contains('correct')) return 'correct';
        if (cells[colIdx].classList.contains('close')) return 'close';
        return 'wrong';
      }

      function getHint(colIdx) {
        var dirSpan = cells[colIdx].querySelector('.dir');
        if (!dirSpan) return undefined;
        var svg = dirSpan.querySelector('svg');
        if (!svg) return undefined;
        var cls = (svg.getAttribute('class') || '').toLowerCase();
        if (cls.includes('arrow-up') || cls.includes('arrowup')) return 'higher';
        if (cls.includes('arrow-down') || cls.includes('arrowdown')) return 'lower';
        return undefined;
      }

      var dbPlayer = PLAYER_MAP.get(nickname.toLowerCase());
      if (!dbPlayer) return; // 数据库无此选手，跳过

      // 所有值从数据库读取，避免DOM翻译差异
      var teamVal = dbPlayer.team;
      var natVal = dbPlayer.nationality;
      var ageVal = dbPlayer.age;
      var roleVal = dbPlayer.role;
      var mcVal = dbPlayer.majorChampionships;
      var maVal = dbPlayer.majorAppearances;
      var iaVal = dbPlayer.isActive;

      var feedback = {
        playerId: -1,
        nickname: nickname,
        correct: isCorrect,
        attributes: {
          nationality: { value: natVal, level: getLevel(2), hint: undefined },
          region: { value: dbPlayer.region, level: getLevel(2) === 'correct' || getLevel(2) === 'close' ? 'correct' : 'wrong' },
          team: { value: teamVal, level: getLevel(1), hint: undefined },
          age: { value: ageVal, level: getLevel(3), hint: getHint(3) },
          role: { value: roleVal, level: getLevel(4), hint: undefined },
          majorChampionships: { value: mcVal, level: getLevel(5), hint: getHint(5) },
          majorAppearances: { value: maVal, level: getLevel(6), hint: getHint(6) },
          isActive: { value: iaVal, level: getLevel(7), hint: undefined }
        }
      };

      guessHistory.push(feedback);
    });

    if (newRows) {
      var last = guessHistory[guessHistory.length-1];
      log('  新增猜测: ' + last.nickname +
        ' 国籍=' + last.attributes.nationality.level + '(' + last.attributes.nationality.value + ')' +
        ' 队伍=' + last.attributes.team.level + '(' + last.attributes.team.value + ')' +
        ' 年龄=' + last.attributes.age.level + '(' + last.attributes.age.value + ' ' + (last.attributes.age.hint||'') + ')' +
        ' 位置=' + last.attributes.role.level + '(' + last.attributes.role.value + ')' +
        ' MC=' + last.attributes.majorChampionships.level + '(' + last.attributes.majorChampionships.value + ' ' + (last.attributes.majorChampionships.hint||'') + ')' +
        ' MA=' + last.attributes.majorAppearances.level + '(' + last.attributes.majorAppearances.value + ' ' + (last.attributes.majorAppearances.hint||'') + ')' +
        ' 在役=' + last.attributes.isActive.level + '(' + last.attributes.isActive.value + ')');
      if (!gameActive) gameActive = true;
      filterCandidates();
      log('  过滤后候选: ' + candidates.length);
      updatePanel();
    }
  }

  // ==================== 多人模式观察器 ====================
  var multiRetryTimer = null;

  function trySetupMulti() {
    if (gameMode !== 'multi') return;

    var card = document.querySelector('.player-board-self');
    if (!card) {
      if (!multiRetryTimer && panelEl) {
        log('多人棋盘未渲染,500ms后重试');
        multiRetryTimer = setTimeout(trySetupMulti, 500);
      }
      return;
    }

    var selfBoard = card.querySelector('.game-table tbody');
    if (!selfBoard) {
      if (!multiRetryTimer && panelEl) {
        log('多人棋盘无tbody,500ms后重试');
        multiRetryTimer = setTimeout(trySetupMulti, 500);
      }
      return;
    }

    if (multiRetryTimer) {
      clearTimeout(multiRetryTimer);
      multiRetryTimer = null;
    }

    // 检查已有观察器是否仍然有效(观察的card是否还在DOM中)
    if (multiObserver) {
      var observedCard = document.querySelector('.player-board-self');
      if (observedCard && observedCard === card) {
        // 观察器仍然有效,仅解析新行
        parseExistingGuesses();
        if (!gameActive && (guessHistory.length > 0 || selfBoard.children.length > 0)) gameActive = true;
        return;
      }
      // Card被替换了,重建观察器
      multiObserver.disconnect();
      multiObserver = null;
      log('多人棋盘被替换,重建观察器');
    }

    log('多人棋盘就绪,行数:', selfBoard.children.length);
    parseExistingGuesses();
    if (guessHistory.length > 0 || selfBoard.children.length === 0) {
      gameActive = true;
    }

    startMultiObserver();
  }

  function startMultiObserver() {
    if (multiObserver) return; // 已运行则不重建

    var boardCard = document.querySelector('.player-board-self');
    if (!boardCard) return;

    var lastRowCount = 0;
    var selfTbody = boardCard.querySelector('.game-table tbody');
    if (selfTbody) lastRowCount = selfTbody.children.length;

    multiObserver = new MutationObserver(function() {
      var card = document.querySelector('.player-board-self');
      if (!card) {
        if (multiObserver) { multiObserver.disconnect(); multiObserver = null; }
        return;
      }

      var tbody = card.querySelector('.game-table tbody');
      var currentRows = tbody ? tbody.children.length : 0;

      // 检测回合重置: 行数从 >0 变成 0
      if (currentRows === 0 && lastRowCount > 0) {
        startNewGame();
        lastRowCount = 0;
        return;
      }

      // 检测新增行
      if (currentRows > lastRowCount) {
        log('多人观察器: 检测新行 ' + lastRowCount + ' -> ' + currentRows);
        setTimeout(function() { parseExistingGuesses(); }, 50);
        if (!gameActive && currentRows > 0) gameActive = true;
      }

      lastRowCount = currentRows;
    });

    multiObserver.observe(boardCard, { childList: true, subtree: true });
    log('多人观察器已启动, 当前行数: ' + lastRowCount);
  }

  function stopMultiObserver() {
    if (multiObserver) {
      multiObserver.disconnect();
      multiObserver = null;
    }
    if (multiRetryTimer) {
      clearTimeout(multiRetryTimer);
      multiRetryTimer = null;
    }
  }

  // ==================== UI 面板 ====================
  function createPanel() {
    if (panelEl) return;

    var styleEl = document.createElement('style');
    styleEl.textContent = '\
      #cs2-helper-panel{position:fixed;right:10px;top:80px;width:360px;max-height:calc(100vh - 100px);\
        background:#14142b;border:1px solid #2a2a4a;border-radius:10px;z-index:9999;\
        font-family:system-ui,-apple-system,sans-serif;font-size:12px;color:#c0c0d0;\
        box-shadow:0 4px 24px rgba(0,0,0,0.6);display:flex;flex-direction:column;}\
      #cs2-helper-header{display:flex;align-items:center;padding:8px 12px;\
        background:linear-gradient(135deg,#1a1a3a 0%,#0f0f28 100%);\
        border-radius:10px 10px 0 0;border-bottom:1px solid #2a2a4a;gap:8px;cursor:move;}\
      #cs2-helper-title{font-weight:700;color:#38bd78;font-size:13px;letter-spacing:.5px;}\
      #cs2-helper-count{color:#d59632;margin-left:auto;font-weight:700;font-size:12px;}\
      #cs2-helper-toggle{background:none;border:1px solid #444;color:#999;width:22px;height:22px;\
        border-radius:4px;cursor:pointer;font-size:12px;line-height:1;padding:0;}\
      #cs2-helper-body{overflow-y:auto;flex:1;padding:8px;min-height:0;}\
      #cs2-helper-body.collapsed{display:none;}\
      #cs2-helper-best{margin-bottom:8px;}\
      #cs2-helper-best h4,.helper-section-title{margin:0 0 4px;color:#38bd78;font-size:11px;\
        text-transform:uppercase;letter-spacing:1px;}\
      #cs2-helper-best .helper-rec{display:inline-block;margin:1px 4px 2px 0;padding:3px 8px;\
        background:#1a3a1a;border:1px solid #2a5a2a;border-radius:5px;cursor:pointer;\
        color:#38bd78;font-size:12px;transition:all .15s;font-weight:600;}\
      #cs2-helper-best .helper-rec:hover{background:#2a4a2a;border-color:#38bd78;}\
      #cs2-helper-best .helper-rec.sure{background:#1a4a1a;border-color:#38bd78;\
        animation:pulse 1.2s ease-in-out infinite;}\
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}\
      #cs2-helper-list{max-height:420px;overflow-y:auto;}\
      #cs2-helper-list .helper-row{display:flex;align-items:center;padding:3px 6px;\
        border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;font-size:11px;gap:6px;\
        transition:background .12s;border-radius:3px;}\
      #cs2-helper-list .helper-row:hover{background:rgba(56,189,120,.08);}\
      #cs2-helper-list .helper-nick{color:#e0e0e0;font-weight:600;min-width:75px;font-size:11px;}\
      #cs2-helper-list .helper-attr{color:#888;font-size:10px;overflow:hidden;\
        text-overflow:ellipsis;white-space:nowrap;}\
      #cs2-helper-empty{color:#555;text-align:center;padding:20px 0;font-size:12px;}\
      #cs2-helper-panel.docked{bottom:60px;top:auto;max-height:50vh;}\
      .helper-rec-floating{position:fixed;bottom:60px;left:50%;transform:translateX(-50%);\
        background:#14142b;border:1px solid #38bd78;border-radius:10px;padding:6px 14px;\
        z-index:9998;display:flex;gap:8px;align-items:center;box-shadow:0 2px 12px rgba(0,0,0,0.5);\
        font-size:11px;color:#38bd78;}\
      .helper-rec-floating span{color:#999;}\
      .helper-rec-floating .helper-rec{cursor:pointer;padding:2px 8px;border:1px solid #2a5a2a;\
        border-radius:4px;background:#1a3a1a;font-weight:600;}\
      .helper-rec-floating .helper-rec:hover{background:#2a4a2a;}\
      #cs2-helper-manual{border-top:1px solid #2a2a4a;padding:8px;}\
      #cs2-helper-manual-header{display:flex;align-items:center;cursor:pointer;margin-bottom:6px;}\
      #cs2-helper-manual-header span{color:#d59632;font-weight:600;font-size:11px;text-transform:uppercase;}\
      #cs2-helper-manual-header button{background:none;border:none;color:#999;cursor:pointer;margin-left:auto;}\
      #cs2-helper-manual-form.collapsed{display:none;}\
      .manual-search-wrap{position:relative;margin-bottom:6px;}\
      .manual-search-wrap input{width:100%;box-sizing:border-box;padding:4px 8px;background:#0f0f28;\
        border:1px solid #2a2a4a;border-radius:4px;color:#e0e0e0;font-size:11px;}\
      .manual-suggestions{position:absolute;top:100%;left:0;right:0;max-height:140px;overflow-y:auto;\
        background:#1a1a3a;border:1px solid #38bd78;border-radius:4px;z-index:10;display:none;}\
      .manual-suggestions .manual-sug-item{padding:3px 8px;cursor:pointer;font-size:11px;border-bottom:1px solid #222;}\
      .manual-suggestions .manual-sug-item:hover{background:#2a2a4a;}\
      .manual-attrs{margin-bottom:6px;}\
      .manual-attr-row{display:flex;align-items:center;margin:2px 0;gap:4px;}\
      .manual-attr-label{width:60px;font-size:10px;color:#999;flex-shrink:0;}\
      .manual-attr-val{font-size:10px;color:#e0e0e0;min-width:60px;}\
      .manual-lvl-btn{width:28px;height:18px;border:1px solid #444;border-radius:3px;cursor:pointer;\
        font-size:9px;padding:0;background:#222;color:#888;transition:all .12s;}\
      .manual-lvl-btn.c{background:#1a3a1a;border-color:#38bd78;color:#38bd78;}\
      .manual-lvl-btn.l{background:#3a2a1a;border-color:#d59632;color:#d59632;}\
      .manual-lvl-btn.w{background:#2a1a2a;border-color:#675563;color:#a89ba3;}\
      .manual-arrow-btn{width:20px;height:18px;border:1px solid #444;border-radius:3px;cursor:pointer;\
        font-size:9px;padding:0;background:#222;color:#888;margin-left:4px;}\
      .manual-arrow-btn.sel{background:#3a2a1a;border-color:#d59632;color:#d59632;}\
      #cs2-helper-manual-add{width:100%;padding:4px;background:#1a3a1a;border:1px solid #38bd78;\
        border-radius:4px;color:#38bd78;cursor:pointer;font-size:11px;font-weight:600;margin-top:4px;}\
      #cs2-helper-manual-add:hover{background:#2a4a2a;}\
      #cs2-helper-manual-add:disabled{opacity:.4;cursor:default;}\
      #cs2-helper-guesslog{border-top:1px solid #2a2a4a;padding:4px 8px;}\
      #cs2-helper-guesslog-item{font-size:10px;color:#888;max-height:60px;overflow-y:auto;}\
      #cs2-helper-guesslog-item span{color:#e0e0e0;}\
      .manual-guess-del{color:#c44;cursor:pointer;margin-left:4px;font-size:10px;}\
    ';
    document.head.appendChild(styleEl);

    panelEl = document.createElement('div');
    panelEl.id = 'cs2-helper-panel';
    panelEl.innerHTML = '\
      <div id="cs2-helper-header">\
        <span id="cs2-helper-title">猜选手助手</span>\
        <span id="cs2-helper-count">--</span>\
        <button id="cs2-helper-toggle" title="折叠/展开">_</button>\
      </div>\
      <div id="cs2-helper-body">\
        <div id="cs2-helper-best"></div>\
        <div class="helper-section-title">候选列表</div>\
        <div id="cs2-helper-list"></div>\
        <div id="cs2-helper-guesslog">\
          <div class="helper-section-title">猜测记录</div>\
          <div id="cs2-helper-guesslog-item"></div>\
        </div>\
        <div id="cs2-helper-manual">\
          <div id="cs2-helper-manual-header">\
            <span>手动推演</span>\
            <button id="cs2-helper-manual-toggle">+</button>\
          </div>\
          <div id="cs2-helper-manual-form" class="collapsed">\
            <div class="manual-search-wrap">\
              <input id="cs2-manual-search" placeholder="输入选手名称..." autocomplete="off">\
              <div id="cs2-manual-suggestions" class="manual-suggestions"></div>\
            </div>\
            <div id="cs2-manual-attrs" class="manual-attrs"></div>\
            <button id="cs2-helper-manual-add" disabled>添加猜测</button>\
          </div>\
        </div>\
      </div>\
    ';

    document.body.appendChild(panelEl);

    // 折叠
    panelEl.querySelector('#cs2-helper-toggle').addEventListener('click', function() {
      panelEl.querySelector('#cs2-helper-body').classList.toggle('collapsed');
    });

    // 拖拽
    makeDraggable(panelEl, panelEl.querySelector('#cs2-helper-header'));

    // 手动推演
    setupManualInput();

    updatePanel();
  }

  function makeDraggable(el, handle) {
    var offsetX = 0, offsetY = 0, startX = 0, startY = 0;
    handle.addEventListener('mousedown', function(e) {
      if (e.target.tagName === 'BUTTON') return;
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      var rect = el.getBoundingClientRect();
      offsetX = startX - rect.left;
      offsetY = startY - rect.top;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
    function onMove(e) {
      el.style.left = (e.clientX - offsetX) + 'px';
      el.style.top = (e.clientY - offsetY) + 'px';
      el.style.right = 'auto';
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
  }

  // ==================== 手动输入推演 ====================
  var manualSelectedPlayer = null;
  var manualLevels = {};
  var manualHints = {};

  var ATTR_DEFS = [
    { key: 'nationality', label: '国籍', isNum: false },
    { key: 'team', label: '队伍', isNum: false },
    { key: 'age', label: '年龄', isNum: true },
    { key: 'role', label: '位置', isNum: false },
    { key: 'majorChampionships', label: 'Major冠军', isNum: true },
    { key: 'majorAppearances', label: 'Major出场', isNum: true },
    { key: 'isActive', label: '状态', isNum: false }
  ];

  function resetManualState() {
    manualSelectedPlayer = null;
    manualLevels = {};
    manualHints = {};
  }

  function setupManualInput() {
    var toggleBtn = panelEl.querySelector('#cs2-helper-manual-toggle');
    var formEl = panelEl.querySelector('#cs2-helper-manual-form');
    var searchInput = panelEl.querySelector('#cs2-manual-search');
    var suggestionsEl = panelEl.querySelector('#cs2-manual-suggestions');
    var attrsEl = panelEl.querySelector('#cs2-manual-attrs');
    var addBtn = panelEl.querySelector('#cs2-helper-manual-add');

    // 展开/折叠
    toggleBtn.addEventListener('click', function() {
      var collapsed = formEl.classList.toggle('collapsed');
      toggleBtn.textContent = collapsed ? '+' : '-';
    });

    // 选手搜索
    searchInput.addEventListener('input', function() {
      var query = searchInput.value.trim().toLowerCase();
      if (!query) {
        suggestionsEl.style.display = 'none';
        return;
      }
      var matches = ALL_PLAYERS.filter(function(p) {
        return p.nickname.toLowerCase().includes(query);
      }).slice(0, 8);
      if (matches.length === 0) {
        suggestionsEl.style.display = 'none';
        return;
      }
      suggestionsEl.innerHTML = matches.map(function(p) {
        return '<div class="manual-sug-item" data-nick="' + p.nickname.replace(/"/g, '&quot;') + '">' +
          p.nickname + ' <span style="color:#666">| ' + p.team + ' | ' + p.nationality + '</span></div>';
      }).join('');
      suggestionsEl.style.display = 'block';

      suggestionsEl.querySelectorAll('.manual-sug-item').forEach(function(el) {
        el.addEventListener('mousedown', function(e) {
          e.preventDefault();
          selectManualPlayer(el.dataset.nick);
        });
      });
    });

    searchInput.addEventListener('blur', function() {
      setTimeout(function() { suggestionsEl.style.display = 'none'; }, 150);
    });

    // 添加猜测
    addBtn.addEventListener('click', addManualGuess);
  }

  function selectManualPlayer(nickname) {
    var player = PLAYER_MAP.get(nickname.toLowerCase());
    if (!player) return;

    manualSelectedPlayer = player;

    var searchInput = panelEl.querySelector('#cs2-manual-search');
    var suggestionsEl = panelEl.querySelector('#cs2-manual-suggestions');
    var attrsEl = panelEl.querySelector('#cs2-manual-attrs');
    var addBtn = panelEl.querySelector('#cs2-helper-manual-add');

    searchInput.value = player.nickname;
    suggestionsEl.style.display = 'none';
    addBtn.disabled = false;

    // 初始化所有属性为wrong
    manualLevels = {};
    manualHints = {};
    ATTR_DEFS.forEach(function(a) {
      manualLevels[a.key] = 'wrong';
      if (a.isNum) manualHints[a.key] = null;
    });

    // 渲染属性选择器
    renderManualAttrs();
  }

  function renderManualAttrs() {
    var attrsEl = panelEl.querySelector('#cs2-manual-attrs');
    if (!manualSelectedPlayer) return;

    var player = manualSelectedPlayer;
    var valueMap = {
      nationality: player.nationality,
      team: player.team,
      age: player.age,
      role: player.role,
      majorChampionships: player.majorChampionships,
      majorAppearances: player.majorAppearances,
      isActive: player.isActive ? '在役' : '退役'
    };

    attrsEl.innerHTML = ATTR_DEFS.map(function(attr) {
      var lvl = manualLevels[attr.key];
      var val = valueMap[attr.key];
      var cCls = lvl === 'correct' ? ' c' : '';
      var lCls = lvl === 'close' ? ' l' : '';
      var wCls = lvl === 'wrong' ? ' w' : '';

      var arrows = '';
      if (attr.isNum && lvl !== 'correct') {
        var hUp = manualHints[attr.key] === 'higher' ? ' sel' : '';
        var hDn = manualHints[attr.key] === 'lower' ? ' sel' : '';
        arrows = '<button class="manual-arrow-btn' + hUp + '" data-attr="' + attr.key + '" data-hint="higher">▲</button>' +
                 '<button class="manual-arrow-btn' + hDn + '" data-attr="' + attr.key + '" data-hint="lower">▼</button>';
      }

      return '<div class="manual-attr-row">\
        <span class="manual-attr-label">' + attr.label + '</span>\
        <span class="manual-attr-val">' + val + '</span>\
        <button class="manual-lvl-btn' + cCls + '" data-attr="' + attr.key + '" data-lvl="correct">C</button>\
        <button class="manual-lvl-btn' + lCls + '" data-attr="' + attr.key + '" data-lvl="close">~</button>\
        <button class="manual-lvl-btn' + wCls + '" data-attr="' + attr.key + '" data-lvl="wrong">X</button>\
        ' + arrows + '\
      </div>';
    }).join('');

    // 绑定事件
    attrsEl.querySelectorAll('.manual-lvl-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        manualLevels[btn.dataset.attr] = btn.dataset.lvl;
        if (btn.dataset.lvl === 'correct') manualHints[btn.dataset.attr] = null;
        renderManualAttrs();
      });
    });

    attrsEl.querySelectorAll('.manual-arrow-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        manualHints[btn.dataset.attr] = manualHints[btn.dataset.attr] === btn.dataset.hint ? null : btn.dataset.hint;
        renderManualAttrs();
      });
    });
  }

  function addManualGuess() {
    if (!manualSelectedPlayer) return;

    var player = manualSelectedPlayer;
    var attrs = {};
    var isCorrect = true;

    ATTR_DEFS.forEach(function(a) {
      var lvl = manualLevels[a.key] || 'wrong';
      if (lvl !== 'correct') isCorrect = false;
      var val;
      switch (a.key) {
        case 'nationality': val = player.nationality; break;
        case 'team': val = player.team; break;
        case 'age': val = player.age; break;
        case 'role': val = player.role; break;
        case 'majorChampionships': val = player.majorChampionships; break;
        case 'majorAppearances': val = player.majorAppearances; break;
        case 'isActive': val = player.isActive; break;
      }
      attrs[a.key] = {
        value: val,
        level: lvl,
        hint: a.isNum && lvl !== 'correct' ? manualHints[a.key] || undefined : undefined
      };
    });

    // 根据nationality推断region
    if (attrs.nationality.level === 'correct' || attrs.nationality.level === 'close') {
      attrs.region = { value: player.region, level: 'correct' };
    } else {
      attrs.region = { value: player.region, level: 'wrong' };
    }

    var feedback = {
      playerId: -1,
      nickname: player.nickname,
      correct: isCorrect,
      attributes: attrs,
      _manual: true
    };

    guessHistory.push(feedback);
    gameActive = true;
    filterCandidates();
    updatePanel();

    // 重置手动状态
    resetManualState();
    var searchInput = panelEl.querySelector('#cs2-manual-search');
    searchInput.value = '';
    panelEl.querySelector('#cs2-manual-attrs').innerHTML = '';
    panelEl.querySelector('#cs2-helper-manual-add').disabled = true;
  }

  function updatePanel() {
    if (!panelEl) return;

    var countEl = panelEl.querySelector('#cs2-helper-count');
    var bestEl = panelEl.querySelector('#cs2-helper-best');
    var listEl = panelEl.querySelector('#cs2-helper-list');

    if (!gameActive) {
      countEl.textContent = guessHistory.length > 0 ? '游戏结束' : '等待游戏';
      if (guessHistory.length === 0) {
        bestEl.innerHTML = '';
        listEl.innerHTML = '<div class="helper-empty">等待游戏开始，或输入首次猜测...</div>';
        return;
      }
    }

    countEl.textContent = '剩余 ' + candidates.length + ' 人 / ' + guessHistory.length + '次';

    // 最佳推荐
    if (gameActive && candidates.length > 1) {
      var best = computeBestGuesses(6);
      var html = '<h4>最佳推荐</h4>';
      for (var i = 0; i < best.length; i++) {
        html += '<span class="helper-rec' + (i === 0 ? ' sure' : '') + '" data-nick="' +
          best[i].nickname.replace(/"/g, '&quot;') + '">' + best[i].nickname + '</span>';
      }
      bestEl.innerHTML = html;

      bestEl.querySelectorAll('.helper-rec').forEach(function(el) {
        el.addEventListener('click', function() { autoGuess(el.dataset.nick); });
      });
    } else if (candidates.length === 1) {
      bestEl.innerHTML = '<span style="color:#38bd78;font-weight:bold;font-size:13px;">' +
        '就是 ' + candidates[0].nickname + '!</span>';
    } else {
      bestEl.innerHTML = '';
    }

    // 候选列表
    if (candidates.length === 0) {
      listEl.innerHTML = '<div class="helper-empty">无匹配选手，可能数据不全，请刷新</div>';
    } else {
      var display = candidates.length <= MAX_DISPLAY ? candidates : candidates.slice(0, MAX_DISPLAY);
      var rows = '';
      for (var j = 0; j < display.length; j++) {
        var p = display[j];
        rows += '<div class="helper-row" data-nick="' + p.nickname.replace(/"/g, '&quot;') + '">\
          <span class="helper-nick">' + p.nickname + '</span>\
          <span class="helper-attr">' + p.nationality + ' | ' + p.team + ' | ' + p.age + '岁 | ' +
          p.role + ' | Maj:' + p.majorChampionships + '/' + p.majorAppearances + ' | ' +
          (p.isActive ? '在役' : '退役') + '</span></div>';
      }
      if (candidates.length > MAX_DISPLAY) {
        rows += '<div class="helper-empty">还有 ' + (candidates.length - MAX_DISPLAY) + ' 名未显示</div>';
      }
      listEl.innerHTML = rows;

      listEl.querySelectorAll('.helper-row').forEach(function(el) {
        el.addEventListener('click', function() { autoGuess(el.dataset.nick); });
      });
    }

    // 猜测记录
    updateGuessLog();

    // 浮动推荐条(手机/小屏幕)
    updateFloatingBar();
  }

  function updateGuessLog() {
    var logEl = panelEl.querySelector('#cs2-helper-guesslog-item');
    if (!logEl) return;

    if (guessHistory.length === 0) {
      logEl.innerHTML = '<span style="color:#555">暂无猜测</span>';
      return;
    }

    logEl.innerHTML = guessHistory.map(function(g, i) {
      var lvlEmoji = g.correct ? '✔' : '✗';
      var levelCounts = { correct: 0, close: 0, wrong: 0 };
      var keys = ['nationality','team','age','role','majorChampionships','majorAppearances','isActive'];
      keys.forEach(function(k) {
        if (g.attributes[k]) levelCounts[g.attributes[k].level] = (levelCounts[g.attributes[k].level] || 0) + 1;
      });
      var tag = '自动';
      if (g._manual) tag = '手动';

      return '<div style="margin:1px 0">' +
        '<span style="color:' + (g.correct ? '#38bd78' : '#e0e0e0') + '">' + lvlEmoji + ' ' + g.nickname + '</span>' +
        ' <span style="color:#666">C:' + (levelCounts.correct || 0) + ' ~:' + (levelCounts.close || 0) + ' X:' + (levelCounts.wrong || 0) + '</span>' +
        ' <span style="color:#555;font-size:9px">[' + tag + ']</span>' +
        '<span class="manual-guess-del" data-idx="' + i + '" title="删除此猜测">✕</span>' +
        '</div>';
    }).join('');

    logEl.querySelectorAll('.manual-guess-del').forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        var idx = parseInt(el.dataset.idx);
        guessHistory.splice(idx, 1);
        if (guessHistory.length === 0) { gameActive = false; candidates = ALL_PLAYERS.slice(); }
        else filterCandidates();
        updatePanel();
      });
    });
  }

  var floatingBar = null;
  function updateFloatingBar() {
    if (!gameActive || candidates.length <= 1) {
      if (floatingBar) { floatingBar.remove(); floatingBar = null; }
      return;
    }
    var inputEl = document.querySelector('.game-page .input-bar input');
    if (!inputEl) {
      if (floatingBar) { floatingBar.remove(); floatingBar = null; }
      return;
    }
    if (!floatingBar) {
      floatingBar = document.createElement('div');
      floatingBar.className = 'helper-rec-floating';
      document.body.appendChild(floatingBar);
    }
    var best = computeBestGuesses(3);
    floatingBar.innerHTML = '<span>推荐: </span>' +
      best.map(function(p) {
        return '<span class="helper-rec">' + p.nickname + '</span>';
      }).join('');
    floatingBar.querySelectorAll('.helper-rec').forEach(function(el) {
      el.addEventListener('click', function() { autoGuess(el.textContent); });
    });
  }

  // ==================== 自动输入 ====================
  function autoGuess(nickname) {
    var input = document.querySelector('.game-page .input-bar input');
    if (!input) {
      input = document.querySelector('.search-page .input-bar input');
    }
    if (!input) return;
    if (input.disabled) return;

    var nativeSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeSetter.call(input, nickname);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();

    // 多人模式有2秒冷却,适当延后
    var delay = gameMode === 'multi' ? 300 : 200;
    setTimeout(function() {
      var btn = document.querySelector('.game-page .input-bar .btn') ||
                document.querySelector('.search-page .input-bar .btn');
      if (btn && !btn.disabled) {
        btn.click();
      }
    }, delay);
  }

  // ==================== 键盘快捷键 ====================
  function setupKeyboard() {
    document.addEventListener('keydown', function(e) {
      if (!panelEl || !gameActive) return;
      // Ctrl+Shift+H: toggle panel
      if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        e.preventDefault();
        panelEl.querySelector('#cs2-helper-body').classList.toggle('collapsed');
      }
      // Ctrl+Shift+1~5: quick select from recommendations
      if (e.ctrlKey && e.shiftKey && e.key >= '1' && e.key <= '5') {
        var best = computeBestGuesses(5);
        var idx = parseInt(e.key) - 1;
        if (best[idx]) {
          e.preventDefault();
          autoGuess(best[idx].nickname);
        }
      }
    });
  }

  // ==================== 初始化 ====================
  function tryInit() {
    var isSinglePage = !!document.querySelector('.single-game-page');
    var isMultiPage = !!document.querySelector('.multi-game-page');
    var isSearchPage = !!document.querySelector('.search-page');

    var newMode = isSinglePage ? 'single' : isMultiPage ? 'multi' : isSearchPage ? 'search' : null;

    // 页面切换时更新模式
    if (newMode !== gameMode) {
      log('模式切换: ' + gameMode + ' -> ' + newMode);
      if (gameMode === 'multi') stopMultiObserver();
      gameMode = newMode;
      if (newMode) startNewGame();
      else { gameActive = false; updatePanel(); }
    }
    if (!newMode) return;

    if (!panelEl) {
      createPanel();
      setupKeyboard();
    }

    if (isSinglePage) {
      if (document.querySelector('.game-table tbody tr') && !gameActive) {
        gameActive = true;
        parseExistingGuesses();
      }
    } else if (isMultiPage) {
      trySetupMulti();
    }
  }

  function init() {
    interceptXHR();

    tryInit();

    var observer = new MutationObserver(function() {
      tryInit();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
