---
title: 'Dodge the creeps-First Godot Game'
description: 'A fast-paced 2D action game built with Godot and GDScript where players dodge enemy mobs while shooting projectiles to survive as long as possible.'
techStack:
  [
    'Godot',
    'GDScript',
    '2D Graphics',
    'Game Physics',
    'Audio System'
  ]
featured: true
publishDate: 2025-07-08
imageUrl: "dodge_game_image.png"
status: 'completed'
---

## Project Overview

This project marks my first venture into game development using the Godot engine. The game is a classic arcade-style experience where players control a character that must dodge incoming enemy mobs while shooting projectiles to defend themselves. The goal is simple: survive as long as possible while the difficulty progressively increases.

Built entirely with GDScript, Godot's native scripting language, this project served as a comprehensive introduction to game development concepts including physics, collision detection, sprite animation, and game state management. I based the game on the Godot 2D tutorial, but expanded it by adding projectiles and better score system.

## Key Features

- **Dynamic Enemy Spawning:** Mobs spawn at random intervals and positions, keeping gameplay unpredictable and challenging.
- **Projectile System:** Players can shoot projectiles to destroy approaching enemies, adding a strategic element to survival.
- **Score System:** Track your survival time and enemies defeated with a persistent high score system.

## Technical Highlights

The game architecture leverages Godot's scene system with separate nodes for the player, enemies, projectiles, and UI elements. **GDScript** handles all game logic, from input processing to collision detection and game state management.

## What I Learned

This project was an invaluable introduction to game development fundamentals. I learned how to think in terms of **game loops**, **frame-rate independent movement**, and **event-driven programming**. Understanding Godot's node system and scene architecture gave me insight into how modern game engines organize complex interactive systems. I also learned how to use Godot's signal system for event handling, allowing for clean communication between different game components.

## Challenges & Solutions

The signal system was the biggest obstacle I faced. I struggled with understanding how to connect signals between different nodes. I spent time reading the Godot documentation and experimenting by myself, which helped me grasp the concept of signals and how they can be used to decouple game logic.

## Future Enhancements

- Better enemy AI with different movement patterns
- Power-ups that spawn randomly to aid the player
- Larger scene
