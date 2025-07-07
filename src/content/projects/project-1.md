---
title: 'Online Sheet Music Management'
description: 'A web-based system to simplify how bands manage, organize, and distribute sheet music. Developed for Heimdal Storband in collaboration with Bouvet ASA.'
techStack:
  [
    'React',
    'TypeScript',
    'Python',
    'C#',
    '.NET',
    'ASP.NET Core',
    'PostgreSQL',
    'Azure',
    'Tailwind CSS',
    'Docker'
  ]
featured: true
publishDate: 2025-05-09
imageUrl: "ompa_project_image.png"
status: 'in-progress'
---

## Project Overview

This project tackled a real challenge: managing sheet music for big bands is often messy, scattered, and insecure. Our solution was to build a robust, user-friendly web app that lets bands like Heimdal Storband upload, organize, and distribute sheet music to members, with role-based access control and support for substitutes.

We collaborated closely with our customer, Bouvet ASA, and our product owner to ensure the system matched real-world needs.

## Key Features

- **Personalized Setlists:** Musicians get their parts automatically assembled, downloadable as PDFs.
- **Access Control:** Roles and permissions ensure only the right people see the right parts — even for substitutes.
- **Event Management:** Plan upcoming performances and generate setlists in one place.
- **Efficient PDF Processing:** Python pipelines handle splitting and watermarking sheet music securely.
- **Cloud Hosting:** Azure and Docker for scalable and maintainable deployment.

## Technical Highlights

The backend combines **ASP.NET Core**, **C#**, and **PostgreSQL** for a robust, relational data model and secure storage. PDF processing is handled by **Python** workers, integrated via Azure Queue and Blob Storage. For testing we use **xUnit** to ensure reliability and maintainability.

The frontend is built with **React**, **TypeScript**, and **Tailwind CSS**, delivering a clean, intuitive UI for musicians of all ages. We used modern tools like **Vite**, **PNPM**, and for testing we employed **Cypress** to ensure a smooth user experience.

## What I Learned

Building this system taught me how to develop real-world software in a large, cross-functional team — from agile workflows and CI/CD to user testing and live demos. I gained hands-on experience with **.NET**, **C#**, and **Azure**, picked up cloud deployment best practices, and saw how working with a real customer shapes a project’s scope and priorities.

## Challenges & Solutions

One big challenge was learning unfamiliar technologies quickly. For example, the **.NET Entity Framework**, Azure’s services and docker. We tackled this with pair programming, lots of internal demos, and careful version control.

Another was the actual development cycle. We had to scrap some features in the start due to our backend not being completed in time by the customer. This taught us the importance of prioritizing core functionality and being preemptive about potential roadblocks.

## Future Enhancements

- Automatic metadata extraction for even faster uploads
- Deployment to a production environment
- Extending the system for multiple bands and orchestras
