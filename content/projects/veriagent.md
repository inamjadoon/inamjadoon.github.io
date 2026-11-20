---
title: VeriAgent — Safe, Verifiable AI Data Agent
summary: Ask questions of a CSV in plain English; an LLM writes pandas code that is policy-checked, run in an isolated sandbox, auto-repaired and returned with SHA-256 provenance.
date: "2026"
status: completed
role: Developer
areas: [llm, web]   
tags: [Trustworthy AI, LLM Agents, Security]
tech: [Python, FastAPI, Docker, pandas, LLMs]
links:
  github: https://github.com/inamjadoon/VeriAgent
featured: true
order: 4
# TODO(inam): if this was built at a hackathon, add `hackathon: <slug>` and a file in content/hackathons/
---

## The problem
Analysts and disaster officers often can't code. Chatbots can invent numbers, their code can't be checked, and running AI-written code on your own machine is risky.

## How it works
1. An LLM writes pandas code for the question.
2. A **safety policy** blocks risky code (network, shell, secrets, file deletion).
3. The code runs in a **Docker sandbox** with no network, 512 MB RAM, one CPU and a read-only filesystem.
4. Errors are **auto-fixed** (up to 3 attempts).
5. The answer comes back with the exact code, a step-by-step log and **SHA-256 hashes** of every input and output.
