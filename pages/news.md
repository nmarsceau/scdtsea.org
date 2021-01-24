---
layout: layouts/news.njk
title: SCDTSEA News
eleventyNavigation:
  key: News
  order: 3
pagination:
  data: collections.post
  size: 10
  reverse: true
permalink: "/news/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber | plus: 1 }}/{% endif %}index.html"
---
