---
title: KaraGLOF — Glacial Lake Outburst Flood Early-Warning Prototype
summary: An open research prototype that ranks the outburst-flood susceptibility of glacial lakes in Pakistan's Karakoram from satellite data, with explainable models and weekly warning signs for ice-dammed lakes.
date: "2026"
status: ongoing
role: Lead Developer · independent research
areas: [eo, ml, web]   
tags: [Remote Sensing, Climate Risk, Explainable ML]
tech: [Google Earth Engine, Sentinel-2, LightGBM, SHAP, FastAPI, React, Leaflet]
links:
  github: https://github.com/inamjadoon/KaraGlof
featured: true
order: 3
---

## Why it matters
Glacial lake outburst floods (GLOFs) threaten villages across Gilgit-Baltistan. Monitoring is sparse, and most published risk maps are static. KaraGLOF asks a simple, testable question: **which lakes are becoming more susceptible, year by year?**

## What I built
- **Lake inventory.** Mapped **552 glacial lakes** across the Hunza, Shimshal and Shigar basins in Google Earth Engine from JRC Global Surface Water and RGI v7 glacier outlines.
- **Labels.** Matched **17 recorded GLOF events** to lakes to build a labeled lake-year dataset.
- **Leakage-free evaluation.** A strict time split (train 2000–2017, test 2020–2025) so the model is judged on years it has never seen.
- **Tier 1, yearly susceptibility.** A LightGBM model ranks every lake each year, with SHAP explanations of the top drivers.
- **Tier 2, weekly warning signs.** Transparent rules (lake growth plus heat) for three ice-dammed lakes, Shisper, Khurdopin and Passu, using validated Sentinel-2 NDWI lake outlines.
- **Platform.** A tested, read-only FastAPI backend and a React + Leaflet dashboard that serve only small released files, so hosting is free.

> Research prototype: it ranks *susceptibility* and never predicts floods. It is not an official warning system.
