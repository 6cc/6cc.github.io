m4qfnhri
    <script src="{{ '/assets/js/vendor/lunr.min.js' | relative_url }}"></script>
    <script src="{{ '/assets/js/vendor/lunr.multi.js' | relative_url }}"></script>
    <script src="{{ '/assets/js/vendor/lunr.stemmer.support.js' | relative_url }}"></script>
    <script src="{{ '/assets/js/vendor/tinyseg.js' | relative_url }}"></script>
    <script src="{{ '/assets/js/vendor/lunr.ja.js' | relative_url }}"></script>
    
      var index = lunr(function(){
        this.use(lunr.multiLanguage('en', 'ja'));
        this.ref('id');
