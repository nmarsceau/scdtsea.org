---
layout: layouts/base.njk
title: Home | SCDTSEA
permalink: /
mission: >-
  ## Our Mission

  is to support and advance traffic safety and education among commercial and public driving schools. The members work together to promote solutions and laws related to driver safety and education.
image:
  jpg: /static/img/posts/joe_and_julie_sabbadino_and_sherry_bachmann.jpg
  webp: /static/img/posts/joe_and_julie_sabbadino_and_sherry_bachmann.webp
  alt: Joe and Julie Sabbadino with Sherry Bachmann.
purpose: >-
  ## Our Purpose

  1. Serve as spokesperson for driver & traffic safety education educators in South Carolina

  1. Advance the cause of driver & traffic safety education for all individuals.

  1. Stimulate the general interest of all individuals in the total program of driver & traffic safety through a wide variety of informative resources.

  1. Promote professional excellence along with the basic importance of the safety educator in the learning process.

  1. Protect the rights of safety educators and advance their interests and welfare.
letter: >-
  ## Message From The President

  I am truly honored to be the President of the SCDTSEA for the two year term of 2021-2023. I have been coming to these conferences since they were held on Broad River Road in the 90&apos;s and I always took something back to my high school or commercial school to pass on to young novice drivers.


  I always looked so forward to seeing &ldquo;legends&rdquo; such as Dr. Harry Stille talk about Wal-Mart and why he used a certain type of toothpaste&mdash;the young teachers in our profession will certainly miss out on those educational talks.


  We are now in 2022 and we are talking about driving cars that control themselves and have blind spot alarms&mdash;I worry that the skill of driving will be lost on these new bells and whistles:


  1. Not being distracted

  2. Keeping a safe following distance

  3. Maintaining the speed limit

  4. Using the Smith system


  I have talked enough&mdash;Thanks for visiting our website and I look forward to seeing you and having you become involved with the SCDTSEA in 2022.


  Best wishes,


  David E. Smith

  *SCDTSEA President 2021-2023*
---
<h1>SCDTSEA</h1>
<article>
  {{ mission | markdownify | safe }}
</article>

<div class="img-container center large float-right">
  <picture>
    <source type="image/webp" srcset="{{ image.webp }}" />
    <img type="image/jpeg" src="{{ image.jpg }}" alt="{{ image.alt }}" class="border" />
  </picture>
</div>

<article>
  {{ purpose | markdownify | safe }}
</article>

<article>
  {{ letter | markdownify | safe }}
</article>