# B2B Landing Page — High Performance Frontend

Маркетинговый B2B-лендинг с фокусом на производительность, SEO и управляемую фронтенд-архитектуру.  
Проект задуман как переиспользуемый шаблон для быстрых коммерческих лендингов без фреймворков.

🔗 **Live: https://shadient-studio.ru/**

---

## 🎯 Цель проекта

Создать максимально быстрый и доступный лендинг:
- без фреймворков
- с ручным контролем рендеринга
- с предсказуемой загрузкой CSS и ассетов
- с высоким Lighthouse без компромиссов по UX

---

## 📊 PageSpeed Insights

Mobile: 93 / 100 / 92 / 100  
Desktop: 100 / 100 / 100 / 100  
Проект проходит Lighthouse без критических замечаний.

---

## 🚀 Highlights

- Vanilla JS (ES modules), без фреймворков  
- CSS split: Critical / Async
- WebP + оптимизированные ассеты
- Семантическая HTML-разметка
- Доступность и корректный focus-flow
- Самописные анимации и модальная система
- Готов к повторному использованию как шаблон

---

## Архитектура проекта

### Общая структура

src/  
├── assets/  
│   ├── images/        # изображения (webp)  
│   └── fonts/         # шрифты (woff2)  
├── css/  
│   ├── critical/      # стили первого экрана  
│   └── async/         # стили ниже hero  
├── scripts/  
│   ├── components/   # JS-компоненты  
│   └── pages/        # entry point страницы  
├── index.html  
docs/                  # build (GitHub Pages)

---
## 🎨 CSS: Critical / Async
- Critical CSS — стили первого экрана, загружаются синхронно
- Async CSS — остальные стили, подключаются неблокирующе
- Split выполняется на этапе сборки через Webpack  
→ быстрый First Paint и контролируемый LCP

---
## ⚙️ JavaScript
- 1 entry point (index.js)
- Компонентная структура

Реализовано:
- модальная система (focus trap, ESC / TAB, scroll lock)
- формы с HTML5-валидацией и success-modal
- анимации через CSS  
- лёгкая библиотека только для карусели отзывов (keen-carousel)

---
## 🛠️ Build (Webpack)

Сборка:
- минификация CSS / JS
- split critical / async CSS
- обработка изображений и шрифтов
- генерация docs/ для деплоя (GitHub Pages)

```bash
npm install
npm run build
```
--- 

## SEO и Accessibility

### Реализовано:
  - Семантические теги
  - Meta / OG / robots
  - alt у изображений
  - aria-атрибуты
  - клавиатурная навигация
  - корректный focus flow

--- 

## Автор

Олег Галузинский  
Frontend Developer

### Фокус:
  - производительность
  - архитектура
  - чистый код
  - UX без лишней сложности
