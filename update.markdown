---
layout: default
title: 更新列表
---

# 更新列表

<ul class="log-list">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <span>{{ post.date | date_to_string }}</span>
    </li>
  {% endfor %}
</ul>
