---
layout: default
title: 留言板
---
<div id="gitalk-container"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>

<script>
  const gitalk = new Gitalk({
    clientID: 'Ov23li5R82FSKDuNshyF',
    clientSecret: 'd1212945e42cc5a38dc9563baaabee7612237874',
    repo: 'jayjd.github.io',  // 修改为你的仓库名
    owner: 'jayjd',           // 修改为你的 GitHub 用户名
    admin: ['jayjd'],         // 修改为你的 GitHub 用户名
    id: location.pathname,
    distractionFreeMode: false
  })
  gitalk.render('gitalk-container')
</script>