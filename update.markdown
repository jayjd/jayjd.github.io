---
layout: default
title: 更新列表
---

# 更新列表

<style>
  .log-icon img {
    margin-right: 10px; /* 图标与标题之间的间距 */
    vertical-align: middle; /* 垂直居中 */
    border-radius: 10px; /* 圆角  */    
  }

  /* 日志项样式 */
  .log-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .log-item:hover {
    transform: translateY(-5px);
  }
  /* 日志标题样式 */
  .log-item h1 {
    margin: 0 0 10px 0;
    font-size: 1.2em;
  }

  .log-item h1 a {
    color: #007BFF;
    text-decoration: none;
  }

  .log-item h2 a:hover {
    text-decoration: underline;
  }
   .log-icon {
    margin-right: 10px;
  }
  .log-content {
    flex-grow: 1;
  }
 .date {
    margin-left: 20px;
  }
</style>

<ul class="log-list">
  {% for post in site.posts %}
    <li class="log-item">
      <div class="log-icon">
        <img src="{{ post.icon }}" alt="{{ post.title }}">
      </div>
      <div class="log-content">
        <h1><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h1>
       {{ post.update-content }}
      </div>
      <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>
