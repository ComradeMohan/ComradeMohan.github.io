# UniVault — Full Case Study

## Overview
**Tag:** Exam Preparation Platform · Live on Play Store
**Role:** Solo Full Stack Developer (mobile app, backend, deployment)
**Timeline:** 2025 – Present (actively maintained)
**Website:** https://web.univault.live/ · **Play Store:** [your URL] · **Code:** [your GitHub URL]

UniVault is a mobile-first academic platform that helps university students prepare for exams systematically — structured study materials, unit-wise practice tests, and previous year papers, all in one app instead of scattered PDFs and group chats.

---

## The Problem
Exam prep for most students looks like this: a dozen PDFs from seniors, half-organized notes, no way to test yourself before the actual exam, and no clear sense of what's actually important per unit. It's reactive, not structured — students cram instead of practicing.

## The Solution
I built UniVault to turn exam prep into a structured, trackable process:
- **Unit-wise Study Materials** so students study in the same structure as their syllabus
- **Practice & Model Tests** to self-assess before the real exam
- **Previous Year Papers** for pattern recognition
- **Academic Progress Tracking** so students (and I) can see what's actually being used
- Shipped as a real **Android Application** on the Play Store, not just a web demo

### Why these technical choices
- **React Native** to ship a real mobile app from a single codebase, since exam prep is something students do on their phones, not laptops
- **Node.js + Express** backend to handle structured content delivery and test submission logic that didn't fit cleanly into a client-only Firebase setup
- **Firebase** for auth and real-time sync, layered with the custom backend for the heavier logic (test scoring, content structuring)

## My Role
- Built the React Native app end-to-end: navigation, offline-friendly content access, test-taking UI
- Designed and built the Node/Express API for test submissions and structured material delivery
- Set up Firebase Auth and sync for user state across devices
- Took the app through Play Store publishing — listing, screenshots, release process
- Built the companion web site (web.univault.live) for discoverability beyond the app store

## Stats
| Metric | Value |
|---|---|
| Active Students | **2.4K+** |
| Study Materials | **10K+** |
| Tests Attempted | **5K+** |

> Note: verify these against your actual Firebase/Play Console analytics before publishing. Swap any unverifiable metric (like a vague "focus %") for something concrete — e.g. average test completion rate or weekly active sessions.

## Tech Stack
📱 React Native · 🔥 Firebase · 🟢 Node.js · 🚂 Express

## Key Features
- Unit-wise Study Materials
- Academic Progress Tracking
- Practice & Model Tests
- Exam-focused Preparation
- Previous Year Papers
- Android Application

## Impact
- ✓ Faster access to organized academic resources
- ✓ Structured, syllabus-aligned exam preparation
- ✓ Measurable self-assessment via practice tests
- ✓ A real mobile-first learning experience students can use anywhere

## What I'd Improve Next
- Add offline-first caching for low-connectivity campus wifi
- Add personalized weak-topic recommendations based on test performance
- Expand beyond Saveetha to other universities (multi-tenant content structure)

## Links
- [Website]
- [Play Store]
- [View on GitHub]