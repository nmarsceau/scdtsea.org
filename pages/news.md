---
layout: layouts/news.njk
title: SCDTSEA News
eleventyNavigation:
  key: SCDTSEA News
  order: 2
pagination:
  data: collections.post
  size: 10
  reverse: true
permalink: "/news/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html"
---
