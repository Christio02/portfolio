---
title: 'Dungeons and Developers'
description: 'An application to explore the various functionalities and mechanics of the popular roleplaying game Dungeons & Dragons. Where you can create your own character, explore the games classes, monsters, races and abilityscores!'
techStack:
  [
    'React',
    'TypeScript',
    'Node.js',
    'Apollo Server',
    'Express',
    'MongoDB',
    'GraphQL',
    'Apollo Client',
    'Tailwind CSS',
    'Cypress',
    'Material UI',
    'Framer Motion'
  ]
projectLink: 'https://github.com/Christio02/dungeons-and-developers'
githubLink: 'https://github.com/Christio02/dungeons-and-developers'
featured: true
publishDate: 2024-12-01
status: 'completed'
---

## Project Overview

**Dungeons and Developers** is a web app inspired by classic dungeon crawlers — but built as a fun way for users to track and review monsters they encounter in their code adventures. It helps helps DnD fans to explore the different monsters, classes, items and abilities of the game, while also providing a platform to create and manage their own characters. The web app is meant to be used as a resource when playing DnD, by reviewing how difficult the different monsters are.
The project was developed together with my good friends in the course IT2810 at NTNU, giving us the chance to experiment with a modern full-stack setup and best practices for accessibility, maintainability, and developer experience.

## Key Features

- **Monster Exploration:** Explore monsters, review the encounters and manage your own character.
- **Login functionality** Basic login functionality, as the examiner in the course wanted to have an easy login functionality to test the application.
- **GraphQL API:** Flexible data fetching with Apollo Client and Server.
- **Responsive UI:** Designed with Tailwind CSS and accessibility in mind.
- **Testing:** Cypress tests for user flows and reliability, and Vitest with mocked GraphQL queries for unit testing.

## Technical Highlights

The backend is built with **Node.js**, **Express**, and **MongoDB**, exposed through a **GraphQL** API. The API supports rich queries and mutations. Based on the <https://www.dnd5eapi.co/> api

The frontend uses **React**, **TypeScript**, **Tailwind CSS**, **Material UI**, and **Framer Motion** for animations. We implemented a clean, responsive design with a focus on accessibility and usability, ensuring the app is easy to navigate for all users. We leveraged **Apollo Client** for state management and data fetching, ensuring a smooth developer experience.

A strong focus on testing was maintained, including unit tests, integration tests, and **Cypress** end-to-end tests to catch bugs early.

## What I Learned

Through this project, I deepened my skills in **React** and **TypeScript**, including more advanced hooks and state patterns. In addition, I learned how to set up advanced caching mechanism with **Apollo Client**. I aslo learned how to design and set up a **GraphQL backend** with MongoDB and how to integrate it cleanly with the frontend.

I also gained hands-on experience with accessibility principles and sustainable web development practices, ensuring the app is usable by as many people as possible.

This project pushed me to improve my **version-control workflows**, coordinate changes with a team, and communicate effectively during feature development and testing. I also learned to write thorough end-to-end tests that simulate real user behavior.

## Challenges & Solutions

One major challenge was setting up the GraphQL server and resolving complex queries without over-fetching data. This was solved by pair programming, which helped us quickly identify and implement efficient query structures.

Another challenge was making the app accessible and responsive across devices — we focused on semantic HTML, ARIA roles, and keyboard navigation, which paid off in better usability.
