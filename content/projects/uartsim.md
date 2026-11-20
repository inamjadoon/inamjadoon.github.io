---
title: UARTSim — UART Peripheral Simulator in C++
summary: A software model of a UART peripheral with memory-mapped registers, circular FIFO buffers and interrupt-style callbacks, built as a hardware–software co-design capstone.
date: "2026"
status: completed
role: Developer
areas: [hw]   
tags: [Embedded Systems, Hardware–Software Co-design]
tech: [C++, OOP, Event-driven design]
links:
  github: https://github.com/inamjadoon/UART-Peripheral-Simulator-in-C-
featured: true
order: 8
---

- **Memory-mapped registers** for realistic software-to-peripheral interaction.
- **Loopback link** between two UART instances to simulate TX → RX serial transmission.
- **Circular FIFO buffers** on transmit and receive paths.
- **Lambda callbacks** that mimic hardware interrupts.

Capstone for the *C/C++ for Hardware Engineers* module.
