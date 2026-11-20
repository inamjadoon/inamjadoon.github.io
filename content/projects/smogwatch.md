---
title: SmogWatch — Crop-Burning Forecast for Lahore
summary: Harmonizes NASA MODIS and VIIRS fire detections into a crop-burning calendar, a 7-day burning forecast and a smoke-exposure index for Lahore.
date: "2026"
status: completed
role: Developer · NASA Space Apps team
areas: [eo, ml]    
tags: [Remote Sensing, Air Quality, Forecasting]
tech: [Python, NASA FIRMS, NASA POWER, Streamlit]
links:
  github: https://github.com/inamjadoon/SmogWatch
  demo: https://smogwatch.streamlit.app/
hackathon: nasa-space-apps-2026
featured: true
order: 5
---

## The problem
Every October to December, rice-stubble burning across Punjab and Haryana pushes Lahore's air quality to some of the worst levels in the world. NASA's two fire instruments, MODIS and VIIRS, describe the same fires differently, and existing maps show *where* fires are, not *which ones affect the city today*.

## What SmogWatch does
- **Merged fire map** of the last 48 hours from MODIS and VIIRS with duplicates removed.
- **Burning-activity calendar** showing seasonal patterns.
- **7-day burning forecast** and a **smoke-exposure index** for Lahore that combines fire activity with NASA POWER weather (wind, humidity, temperature, rain).

Built for the NASA Space Apps Challenge 2026, challenge *Harmonization of MODIS and VIIRS Hot Spots*.
