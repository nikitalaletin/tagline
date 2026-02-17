# Tagline Element Editor

Тестове завдання: редактор tagline-елемента з live preview, налаштуванням стилів та drag & drop сортуванням тегів.

## Запуск

**Потрібно:** Node.js

1. Встановити залежності:
   ```
   npm install
   ```

2. Запустити в режимі розробки:
   ```
   npm run dev
   ```

3. Зібрати для продакшену:
   ```
   npm run build
   ```

4. Переглянути зібраний проєкт:
   ```
   npm run preview
   ```

## GitHub Pages

Після push у гілку `main` GitHub Actions автоматично збирає та деплоїть проєкт.

**Налаштування:**
1. У репо: **Settings** → **Pages**
2. **Source:** GitHub Actions
3. Зберегти зміни

Додаток буде доступний за адресою:  
`https://<username>.github.io/<repo-name>/`

## Стек

- React + TypeScript
- MobX
- Tailwind CSS
- Vite
