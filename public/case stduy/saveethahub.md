# SaveethaHub — Full Case Study

## Overview
**Tag:** Live Project · Web Platform
**Role:** Solo Full Stack Developer (design, frontend, backend, deployment)
**Timeline:** 2024 – Present (actively maintained)
**Live:** [your URL] · **Code:** [your GitHub URL]

SaveethaHub is a centralized web platform built for Saveetha University students to access study resources, collaborate on projects, and stay connected with campus life — replacing the scattered mess of WhatsApp groups, random Drive links, and outdated notice boards students were relying on before.

---

## The Problem
Before SaveethaHub, students at Saveetha had no single place to:
- Find updated study materials for their courses
- See campus events and academic updates in real time
- Collaborate on group projects without juggling five different apps
- Track their CGPA without doing manual spreadsheet math every semester

Information was fragmented across WhatsApp groups, scattered Google Drive folders, and word-of-mouth. New students especially struggled — there was no canonical source of truth.

## The Solution
I built SaveethaHub as an all-in-one student portal with:
- A real-time **Community Hub** for discussions and project collaboration
- A structured **Study Materials** library, organized by course/unit
- A built-in **CGPA Calculator** so students don't need external tools
- **Events & Updates** feed synced in real time via Firebase
- **Secure Authentication** so content stays within the university community

### Why these technical choices
- **React + Vite** for a fast, modern frontend with quick build times
- **Firebase (Firestore + Auth)** for real-time data sync without managing my own backend infrastructure — critical since I was building and shipping this solo
- **Tailwind CSS** to move fast on UI without fighting custom CSS, while keeping a consistent design system across pages

## My Role
I designed and built the entire product end-to-end:
- Designed the Firestore data schema for real-time community threads and academic content
- Built the authentication and access-control flow (student-only access)
- Built the CGPA calculator logic from Saveetha's actual grading scheme
- Handled deployment, SEO setup, and have been monitoring/iterating using Google Analytics and Search Console since launch

## Live Performance
*(Source: Google Analytics & Search Console)*

| Metric | Value | Window |
|---|---|---|
| Search Clicks | **24,706** | Google Search (lifetime) |
| Active Users | **3.8K+** | Last 28 days |
| New Users | **1.7K+** | Last 28 days |
| Avg Engagement Time | **50s** | Per active user |

These aren't projected numbers — this is a platform with real, ongoing usage at a university, discoverable organically through Google Search.

## Tech Stack
⚛️ React · 🎨 Tailwind CSS · 🔥 Firebase · ⚡ Vite

## Key Features
- Study Materials
- Community Hub
- Project Collaboration
- CGPA Calculator
- Events & Updates
- Secure Authentication

## Impact
- ✓ Unified access to student resources and academic tools
- ✓ Real-time collaboration and discussion replacing fragmented group chats
- ✓ Active and growing campus community, sustained organically post-launch

## What I'd Improve Next
- Add push notifications for events/updates instead of requiring users to check the feed
- Move file storage to a CDN-backed solution as material volume grows
- Add lightweight admin moderation tools for the community hub

## Links
- [View on GitHub]
- [Live Demo]