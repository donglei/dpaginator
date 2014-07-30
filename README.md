dpaginator
==========

Javascript 分页插件

=========

使用方法

1、创建 dPaginator 对象 var dp = new dPaginator(total_item, pre_page, current_page)

2、设置 <a> tag 的属性 , :page: 会替换成相应的页数 dp.setAttributes('href="javascript:void(0)" onclick="alert(:page:)"');

3、获取分页html片段 var link = dp.toLink();

4、将link 片段放到指定的位置 $('#dpaginator').html(link);

示例如下：

<pre>
var dp = new dPaginator(1000, 10, 4);
dp.setAttributes('href="javascript:void(0)" onclick="alert(:page:)"');
var link = dp.toLink();
</pre>
