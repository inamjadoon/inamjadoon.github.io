---
title: KaraGLOF — Glacial Lake Outburst Flood Early-Warning System
summary: An open early-warning system that ranks the outburst-flood susceptibility of glacial lakes in Pakistan's Karakoram from 26 years of satellite and climate data, with explainable models and a live web app.
date: "2026-11"
status: completed
role: Lead Developer · independent project
areas: [eo, ml, web]
tags: [Remote Sensing, Climate Risk, Explainable ML]
tech: [Google Earth Engine, Landsat, Sentinel-1/2, ITS_LIVE, ERA5-Land, LightGBM, SHAP, FastAPI, React, Leaflet, GitHub Actions]
links:
  github: https://github.com/inamjadoon/KaraGlof
  demo: https://inamjadoon.github.io/KaraGlof/
featured: true
order: 3
---

## Why it matters
Glacial lake outburst floods (GLOFs) threaten villages across Gilgit-Baltistan. Monitoring is sparse, and most published risk maps are static. KaraGLOF asks a simple, testable question: **which lakes are becoming more susceptible, year by year?**

## What I built
- **Lake inventory and 26-year record.** Mapped **552 glacial lakes** across the Hunza, Shimshal and Shigar basins in Google Earth Engine, with yearly lake area, glacier velocity and climate for **2000–2025** from Landsat, Sentinel-1/2, ITS_LIVE and ERA5-Land.
- **Labels.** Matched **17 recorded GLOF events** to lakes to build a labeled lake-year dataset.
- **Leakage-free evaluation.** A strict time split (train 2000–2017, test 2020–2025) so the model is judged on years it has never seen, guarded by an automated no-leakage test.
- **Yearly susceptibility ranking.** A LightGBM model ranks every lake each year, with SHAP explanations of the top drivers.
- **Weekly warning signs.** Transparent rules (lake growth plus heat) for three ice-dammed lakes, Shisper, Khurdopin and Passu, using validated Sentinel-2 NDWI lake outlines.
- **Open web app.** A React + Leaflet lake map with explanations, served by a tested FastAPI backend and deployed with GitHub Actions CI/CD.

## Results
- Every lake that had an outburst in 2020–2025 ranked in **its year's top 10 of 552** (PR-AUC **0.48** vs **0.0015** for a random ranking).
- A frozen-threshold replay of the **2022 Shisper outburst** shows warning signals **5–6 weeks early**.
- Leave-one-lake-out testing exposed the model's generalisation limits, which are documented openly rather than hidden.

> Research prototype: it ranks *susceptibility* and never predicts floods. It is not an official warning system.
