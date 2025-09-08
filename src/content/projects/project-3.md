---
title: 'Flappy Bird Reinvented: Flight & Firepower'
description: 'An experimental twist on the Flappy Bird concept where players not only dodge pipes but also blast them apart to carve their own path forward.'
techStack:
  [
    'Unity',
    'C#',
    '2D Graphics',
    'Game Physics',
    'Audio System'
  ]
featured: true
publishDate: 2025-09-08
imageUrl: "flappy.png"
status: 'completed'
---

## Project Overview

This project reimagines the familiar **Flappy Bird** formula into something more experimental. Instead of simply squeezing through narrow gaps between pipes, the player controls a bird that can **shoot projectiles** to destroy obstacles outright. The game becomes less about pure reaction time and more about deciding whether to dodge, shoot, or combine both strategies to survive.

I built the project in Unity with **C#**, starting from my [Flappy repository](https://github.com/Christio02/flappy). The focus was on exploring how a small mechanic change—giving the player agency to alter the environment—completely transforms the flow and feel of a well-known game.

## Key Features

- **Destructible Pipes:** Instead of being passive obstacles, pipes can be blasted apart, turning a purely avoidance-based game into one with offensive strategy.  
- **Risk–Reward Shooting Mechanic:** Shooting costs time and precision; mistimed shots leave the player vulnerable.  

## Technical Highlights

The architecture uses **Unity’s component system** to keep systems modular: pipes, projectiles, and the player all operate as separate GameObjects.

- **Projectile Physics:** I implemented simple physics for projectiles, ensuring they arc realistically and interact with pipes using collision detection.

- **Ragdoll Bird Collision:** When the bird hits a pipe, it triggers a ragdoll effect for visual feedback, enhancing the impact of failure.

## What I Learned

By layering a new mechanic onto a classic game, I learned:  

- How small changes in player agency can drastically alter game dynamics and player engagement.
- How to create a game from the ground up in Unity, managing assets, physics, and user input.
-

## Challenges & Solutions

The biggest challenge, and still is making sure the pipes stretch to cover the vertical space. I tried several approaches, but ultimately I could not get it to work as intended. I had to settle for a fixed height, which is not ideal but works for now.

Another challenge, was handling the middle pipe for shooting logic. I had to create a separate collider for the middle pipe, which was tricky to get right. I also had to make sure the projectile would only destroy the pipe it hit, and not all pipes.

## Future Enhancements

- Fix the pipe stretching issue to allow for dynamic heights.
- Make game faster as time goes on.
- Rename the game, as "Flappy Reverse" does not really fit the game

[View Live Game](/flappy-game)
