# CropSmart — Smart Crop Advisory System

[![Build](https://img.shields.io/badge/build-Maven-brightgreen)](https://maven.apache.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.x-6DB33F?logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![Thymeleaf](https://img.shields.io/badge/Template-Thymeleaf-005F73?logo=thymeleaf&logoColor=white)](https://www.thymeleaf.org/)
[![FontAwesome](https://img.shields.io/badge/Icons-FontAwesome-2274A5?logo=fontawesome&logoColor=white)](https://fontawesome.com/)

---

> **Short description (repo):** Smart Crop Advisory — AI-assisted crop recommendations, pest/disease guidance, irrigation and fertilizer advice for small-to-large farms.

---

## ▶️ Demo & Screenshots

> Note: The following links/images point to the project files you uploaded. Your hosting/tooling will map local paths to URLs.

- **Home / Landing page (preview)**  
  ![Home Page](/mnt/data/index.html)  
  View file: `/mnt/data/index.html`

- **Crop Advisory Form (preview)**  
  ![Crop Advisory Form](/mnt/data/farmer_form.html)  
  View file: `/mnt/data/farmer_form.html`

- **Recommendations page (preview)**  
  ![Recommendations](/mnt/data/recommendations.html)  
  View file: `/mnt/data/recommendations.html`

---

## Table of contents

- [About](#about)  
- [Features](#features)  
- [Tech stack & logos](#tech-stack--logos)  
- [Quick start (local)](#quick-start-local)  
- [Project structure](#project-structure)  
- [Endpoints / UI routes](#endpoints--ui-routes)  
- [How it works — short flow](#how-it-works---short-flow)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

## About

CropSmart is a Spring Boot + Thymeleaf web application that provides personalized crop recommendations based on soil, season, location and farmer inputs. It includes UI forms, recommendation pages, and placeholders for AI/pest detection modules.

---

## Features

- Multi-language form UI (English / Hindi / Marathi)
- Crop recommendations based on soil type & season
- Irrigation, fertilizer and pest/disease guidance
- Weather integration UI placeholder (fetch weather data)
- Upload & preview for pest detection (image-based)
- Printable and shareable recommendation cards

---

## Tech stack & logos

- ![Java](https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=white) `Java` (Spring Boot)
- ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.x-6DB33F?logo=spring)
- ![Thymeleaf](https://img.shields.io/badge/Template-Thymeleaf-005F73?logo=thymeleaf)
- ![FontAwesome](https://img.shields.io/badge/Icons-FontAwesome-2274A5?logo=fontawesome)
- HTML/CSS/Vanilla JS for front-end
- (Optional) Tailwind CSS — adaptable if you integrate it

---

## Quick start (local)

> Assumes you have Java and Maven installed. If you use Gradle, adapt commands accordingly.

1. **Clone repo**
   ```bash
   git clone <your-repo-url>
   cd cropsmart
