
>　　　　　　　　6//?r=　&d=2024/12/16 10:32:08　&b=m4qf5vm5
## Support for Korean language in search bar · Issue #1245 · just-the-docs/just-the-docs
https://github.com/just-the-docs/just-the-docs/issues/1245
|
Multi Language Support #59

>　　　　　　　　6//?r=⭐　&d=2024/12/16 10:32:57　&b=m4qf6x6l
## CAN NOT support Chinese search · Issue #452 · just-the-docs/just-the-docs
https://github.com/just-the-docs/just-the-docs/issues/452
|

>　　　　　　　　6//?r=　&d=2024/12/16 10:33:06　&b=m4qf74qe
## Support of searching CJK and i18n · just-the-docs/just-the-docs · Discussion #437
https://github.com/just-the-docs/just-the-docs/discussions/437
|
pdmosses
jekyll-theme-chirpy
christian-fei/Simple-Jekyll-Search

>　　　　　　　　6//?r=⭐　&d=2024/12/16 14:32:05　&b=m4qnqg2c
## ilumin/dendron-jekyll-thai at feature/search-thai
https://github.com/ilumin/dendron-jekyll-thai/tree/feature/search-thai
|
lunr.th.

>　　　　　　　　6//?r=⭐⭐　&d=2024/12/16 10:42:24　&b=m4qfj2li
## Great theme templates, can search improve compatibility with Chinese? 很棒的主题模板，可惜搜索不支持中文，可以完善吗？ · Issue #470 · just-the-docs/just-the-docs
https://github.com/just-the-docs/just-the-docs/issues/470
|

https://user-images.githubusercontent.com/6513389/164498072-94aea35d-d805-4534-8687-ce9a69451bf9.png

>　　　　　　　　6//?r=⭐⭐　&d=2024/12/16 10:45:50　&b=m4qfnhri
## Comparing dendronhq:master...ilumin:feature/search-thai · dendronhq/dendron-jekyll
https://github.com/dendronhq/dendron-jekyll/compare/master...ilumin:feature/search-thai
|
>@ilumin
1. .prettierignore
assets/js/vendor/lunr.min.js
assets/js/vendor/lunr.*.min.js

2. _includes/head.html
<script type="text/javascript" src="{{ '/assets/js/vendor/lunr.min.js' | absolute_url }}"></script>
<script type="text/javascript" src="{{ '/assets/js/vendor/lunr.multi.js' | absolute_url }}"></script>
<script type="text/javascript" src="{{ '/assets/js/vendor/lunr.stemmer.support.js' | absolute_url }}"></script>
<script type="text/javascript" src="{{ '/assets/js/vendor/lunr.zh.js' | absolute_url }}"></script>

3. assets/js/just-the-docs.js
var index = lunr(function(){
  this.use(lunr.multiLanguage('en', 'zh'));
  this.ref('id');

>　　　　　　　　6//?r=⭐　&d=2024/12/14 21:33:20　&b=m4o7whh1
## MihaiValentin/lunr-languages: A collection of languages stemmers and stopwords for Lunr Javascript library
https://github.com/MihaiValentin/lunr-languages
|
lunr.multi.js
lunr.stemmer.support.js
lunr.zh.js
>lunr.multiLanguage stemmers plugins

>　　　　　　　　6//?r=⭐　&d=2024/12/16 15:26:36　&b=m4qpokcv
### turbobit/lunr-languages: A collection of languages stemmers and stopwords for Lunr Javascript library
https://github.com/turbobit/lunr-languages
|
lunr.zh.js

>　　　　　　　　6//?r=　&d=2024/12/16 14:45:33　&b=m4qo7rt9
## olivernn/lunr.js: A bit like Solr, but much smaller and not as bright
https://github.com/olivernn/lunr.js
|
https://lunrjs.com/

>　　　　　　　　6//?r=⭐　&d=2024/12/16 13:14:22　&b=m4qkyila
## 使用lunr.js及Lunr-languages实现静态HTML中文全文搜索-CSDN博客
https://blog.csdn.net/weixin_52297807/article/details/142072182
|
使用Intl.Segmenter替代nodejieba，

>　　　　　　　　6//?r=⭐⭐　&d=2024/12/16 13:14:50　&b=m4qkz426
## mochi-cards/lunr-languages at mochi/zh-novel-segment
https://github.com/mochi-cards/lunr-languages/tree/mochi/zh-novel-segment
|
lunr.zh.js modified
>require('@node-rs/jieba')

>　　　　　　　　6//?r=⭐　&d=2024/12/16 13:55:35　&b=m4qmfihs
## 使用lnur.js给网站增加博文搜索功能 - ScalaPie | 阶图智派
https://scalapie.com/post/2024/09/10/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E9%83%A8%E7%BD%B2%E4%B8%AA%E4%BA%BA%E7%BD%91%E7%AB%99%E4%B8%8A%E7%BA%BF%E4%B9%8B11/
|
英文的，且博文数量在万篇以下，那么 lunr.js + 浏览器 还是可以提供非常可靠的便捷体验的；

中文的，那么需要 node.js 环境才能让 lunr-languages 的中文分词功能正常工作，
Intl.Segmenter

>　　　　　　　　6//?r=⭐　&d=2024/12/16 15:07:50　&b=m4qp0fef
## Idea: Use Intl.Segmenter to reduce bundle size in browsers · Issue #90 · MihaiValentin/lunr-languages
https://github.com/MihaiValentin/lunr-languages/issues/90
|
I have a working proof of concept here where I use the stemmer specifically for zh to gain the ability to use it in browser.
>m4qkz426

>　　　　　　　　6//?r=⭐　&d=2024/12/14 17:05:49　&b=m4nycgjb
## The Korean keyword cannot be searched in the search function. · Issue #1047 · just-the-docs/just-the-docs
https://github.com/just-the-docs/just-the-docs/issues/1047
|

https://github.com/turbobit/lunr-languages

>　　　　　　　　6//?r=⭐　&d=2024/12/14 17:16:58　&b=m4nyqs8m
## CAN NOT support Chinese search · Issue #452 · just-the-docs/just-the-docs
https://github.com/just-the-docs/just-the-docs/issues/452
|

CAN NOT support Chinese search

_includes/head.html
{% if site.search_enabled != false %}
  <script src="{{ '/assets/js/vendor/lunr.min.js' | relative_url }}"></script>
  <script src="{{ '/assets/js/vendor/lunr.stemmer.support.js' | relative_url }}"></script>
  <script src="{{ '/assets/js/vendor/lunr.zh.js' | relative_url }}"></script>
  <script>
    var idx = lunr(function () {
    this.use(lunr.zh);
    this.field('title', { boost: 10 });
    this.field('body');
    });
  </script>

{% endif %}
