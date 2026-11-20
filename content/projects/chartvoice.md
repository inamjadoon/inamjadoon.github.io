---
title: ChartVoice — Hear, Read and Check the Numbers in a Chart
summary: Turns a picture of a bar, line or pie chart into a plain-language summary, a data table, speech and sound, for people who can't see or struggle to read charts.
date: "2026"
status: completed
role: Backend & ML · team of 4
areas: [cv, llm]   
tags: [Accessibility, Vision-Language Models]
tech: [Python, DePlot, Groq vision, TypeScript, React]
links:
  github: https://github.com/inamjadoon/Chart-Voice
  devpost: https://devpost.com/software/chartvoice
hackathon: banana-hacks-2026
featured: true
order: 6
---

## What it does
Charts often hold the one number that matters, and they are almost always just an image. ChartVoice extracts the underlying data table and makes it usable: read aloud, laid out as a table, played as sound and open to questions.

## My part
I built the backend API, DePlot-based offline chart extraction and parsing, the facts-and-checks layer, and online chart reading. Online, a Groq vision model reads the chart; offline, Google's DePlot runs locally, and a cross-check mode warns wherever the two disagree.

Built in one weekend at Banana Hacks 2026 with Talal, Hasnain and Adnan.
