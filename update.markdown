---
layout: default
title: 更新列表
---

<ul class="log-list">
  <h2>更新列表</h2>
  {% for post in site.categories.thread %}
    <li class="log-item">
      <div class="log-icon">
        <img src="{{ post.icon }}"  width="120" height="120" alt="{{ post.title }}" loading="lazy">
      </div>
      <div class="log-content">
        <h1><a href="{{ post.url | relative_url }}" class="post_thread">{{ post.title }}&nbsp;{{post.version}}</a></h1>
          {% assign contents = post.update-content | newline_to_br | split: "<br />" %}
        {% for content in contents limit: 4 %}
            {% if content != "" %}
                <p>{{ content }}</p>
            {% endif %}
        {% endfor %}
        <!-- 点击下载 -->
        <div style="margin: 10px;">
          <a href="{{ post.url | relative_url }}" class="download-button">
          <svg t="1743150020287" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1493" width="32" height="32"><path d="M566.73 524.89l-30.37 31.4v-0.12l-1.7-102.33c-0.21-12.44-10.46-22.36-22.9-22.16-12.44 0.21-22.36 10.46-22.16 22.9l1.7 102.33c0 0.04 0 0.08 0.01 0.13l-31.47-30.44c-7.35-7.11-19.08-6.92-26.19 0.43-7.11 7.35-6.92 19.08 0.43 26.19l65.25 63.12c0.65 0.91 1.38 1.77 2.21 2.57 4.6 4.45 10.91 6.04 16.73 4.81a18.41 18.41 0 0 0 9.83-5.31c0.68-0.7 1.29-1.44 1.83-2.21l63.41-65.55c7.11-7.35 6.92-19.07-0.43-26.19-7.35-7.11-19.07-6.92-26.18 0.43z" fill="#FFFFFF" p-id="1494"></path><path d="M512 22C241.38 22 22 241.38 22 512s219.38 490 490 490 490-219.38 490-490S782.62 22 512 22z m179 695.62c-1.94 0.11-3.89 0.17-5.85 0.17H358.99c-1.79 0-3.58-0.05-5.35-0.14-2.03 0.08-4.07 0.14-6.12 0.14-81.79 0-148.1-66.47-148.1-148.47s66.31-148.47 148.1-148.47c9.28 0 18.35 0.86 27.15 2.5 0-0.47-0.02-0.93-0.02-1.4 0-88.76 71.77-160.71 160.31-160.71s160.31 71.95 160.31 160.71c0 3.11-0.1 6.2-0.27 9.27 74.15 5.57 132.59 67.5 132.59 143.08-0.01 76.93-60.55 139.72-136.59 143.32z" fill="#FFFFFF" p-id="1495"></path></svg>
          &nbsp;&nbsp;点击下载</a>
        </div>
      </div>
      <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
    </li>
  {% endfor %}
</ul>
