<li> [field:array runphp='yes']@me = (empty(@me['litpic']) ? "" : "<a href='{@me['arcurl']}' class='preview'><img src='{@me['litpic']}'/></a>"); [/field:array]
        [<b>[field:typelink/]</b>] <a href="[field:arcurl/]" class="title">[field:title/]</a> <span > <span>日期：</span>[field:pubdate function="GetDateTimeMK(@me)"/] <span style="margin-left:5px;">点击：</span>[field:click/] <span style="margin-left:5px;">好评：</span>[field:scores/] </span>
        <p style="color:#888;"> [field:description/]... </p>
      </li>