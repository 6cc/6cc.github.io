let hideBool = domainHide.test(segmentS[i]);

const domainH =
 `afast\.ws
 |hentai-cosplays\.com|porn-images-xxx\.com|hentai-img\.com
 |imagefap\.com|moviefap\.com
 |nagy-dudak\.blog\.hu
 |pornhub\.com|phncdn\.com
 `;
const domainHide = new RegExp(domainH, 'i');
let elemSC = domainHide.test(singleLineS[i][j]);
console.log(elemSC);

for (const element of singleLineS[i]) {
      if (regexpHide.test(element)) {
        visiVar = 0;
        break;
      }
    }

visiVar = !regexpHide.test(element) ? visiVar : 0;
