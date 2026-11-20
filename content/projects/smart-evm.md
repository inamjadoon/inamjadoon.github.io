---
title: smartEVM — AI-Powered Project Intelligence Platform
summary: Four Random Forest models, a Monte Carlo what-if simulator and an LLM insights agent that turn Earned Value data into early warnings about cost, schedule and quality.
date: "2026"
status: completed
role: AI Lead · team project
areas: [ml, llm, web]   
tags: [Predictive Modeling, LLM Agents, Simulation]
tech: [Python, scikit-learn, FastAPI, PostgreSQL, Groq, TypeScript]
links:
  github: https://github.com/inamjadoon/Smart-EVM
  demo: https://smart-evm-sbgx.vercel.app/
featured: true
order: 1
---

## What I built
I owned the entire AI component of the platform:

- **Four Random Forest models** predicting cost overrun, schedule slip, defect volume and overall project health, served as FastAPI endpoints on real project data in PostgreSQL.
- A **risk-probability index** and an **anomaly detector** that flags poor-quality project data before it misleads the models.
- A **Monte Carlo what-if simulation** for budget and schedule scenarios.
- An **LLM insights and chat agent** (Groq) grounded in Earned Value metrics, with a rule-based fallback so insights stay visible when the model is unavailable.
