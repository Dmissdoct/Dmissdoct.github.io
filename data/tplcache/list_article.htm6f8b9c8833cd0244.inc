<?php
$z[0]=Array("field","",255,278);
$z[0][4]['name']="seotitle";
$z[1]=Array("global","",279,305);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",346,368);
$z[2][4]['name']="keywords";
$z[3]=Array("field","",408,459);
$z[3][4]['name']="description";
$z[3][4]['function']="html2text(@me)";
$z[4]=Array("global","",477,509);
$z[4][4]['name']="cfg_templets_skin";
$z[5]=Array("global","",578,610);
$z[5][4]['name']="cfg_templets_skin";
$z[6]=Array("include","",700,735);
$z[6][4]['filename']="top1.htm";
$z[7]=Array("type","<a href=\"[field:typelink /]\">电商新闻</a>",915,992);
$z[7][4]['typeid']="126";
$z[8]=Array("type","<a href=\"[field:typelink /]\">店铺诊断</a>",992,1069);
$z[8][4]['typeid']="155";
$z[9]=Array("type","<a href=\"[field:typelink /]\">淘宝客服</a>",1069,1146);
$z[9][4]['typeid']="129";
$z[10]=Array("type","<a href=\"[field:typelink /]\">淘宝装修</a>",1146,1223);
$z[10][4]['typeid']="128";
$z[11]=Array("type","<a href=\"[field:typelink /]\"> 淘宝开店</a>",1223,1301);
$z[11][4]['typeid']="127";
$z[12]=Array("type","<a href=\"[field:typelink /]\">电商人物</a>",1301,1378);
$z[12][4]['typeid']="132";
$z[13]=Array("type","<a href=\"[field:typelink /]\">移动电商</a>",1378,1455);
$z[13][4]['typeid']="133";
$z[14]=Array("field","",1563,1592);
$z[14][4]['name']="position";
$z[15]=Array("list","\r\n      <li> [field:array runphp='yes']@me = (empty(@me['litpic']) ? \"\" : \"<a href='{@me['arcurl']}' class='preview'><img src='{@me['litpic']}'/></a>\"); [/field:array]\r\n        [<b>[field:typelink/]</b>] <a href=\"[field:arcurl/]\" class=\"title\">[field:title/]</a> <span > <span>日期：</span>[field:pubdate function=\"GetDateTimeMK(@me)\"/] <span style=\"margin-left:5px;\">点击：</span>[field:click/] <span style=\"margin-left:5px;\">好评：</span>[field:scores/] </span>\r\n        <p style=\"color:#888;\"> [field:description/]... </p>\r\n      </li>\r\n      ",1655,2238);
$z[15][4]['pagesize']="10";
$z[16]=Array("pagelist","",2347,2425);
$z[16][4]['listitem']="info,index,end,pre,next,pageno,option";
$z[16][4]['listsize']="5";
$z[17]=Array("arclist","\r\n        <li><span>[field:global.autoindex/]</span><a href=\"[field:arcurl/]\" title=\"[field:title/]\">[field:title/]</a></li>\r\n        ",2584,2794);
$z[17][4]['row']="7";
$z[17][4]['orderby']="pubdate";
$z[17][4]['type']="image.";
$z[17][4]['typeid']="1";
$z[18]=Array("arclist","\r\n        <li> <a href=\"[field:arcurl/]\" title=\"[field:title/]\" target=\"_blank\" >[field:image/]<span class=\"v_ishd\">高清</span><span class=\"v_time\">41:18</span><span class=\"v_bg\"></span></a><span><a href=\"[field:arcurl/]\" target=\"_blank\">[field:title/]</a></span> </li>\r\n        ",2902,3257);
$z[18][4]['row']="4";
$z[18][4]['orderby']="pubdate";
$z[18][4]['type']="image.";
$z[18][4]['typeid']="1";
$z[19]=Array("tag","\r\n        <li><a href=\"[field:link/]\" target=\"_blank\" style=\"color:#fe7d39\">[field:tag /]</a></li>\r\n        ",3363,3512);
$z[19][4]['row']="30";
$z[19][4]['getall']="1";
$z[20]=Array("include","",3578,3616);
$z[20][4]['filename']="footer1.htm";
$z[21]=Array("include","",3661,3699);
$z[21][4]['filename']="footer2.htm";

?>