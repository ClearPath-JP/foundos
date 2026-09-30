# Install the selected foundos UI components

The existing project uses Next.js, React, TypeScript, Tailwind CSS 4, and npm. At inspection, it had no components.json (shadcn configuration).

Run these commands one at a time in PowerShell. First save or commit existing work. Initialization may update the global stylesheet and install dependencies; review those changes before accepting the new appearance.

```powershell
Set-Location -LiteralPath 'C:\Dev\ClearPath\foundos'
npx shadcn@latest init
npx shadcn@latest add @magicui/interactive-hover-button @magicui/noise-texture @magicui/blur-fade @magicui/safari
npx shadcn@latest add input label textarea button
npm run build
```

Use the existing Next.js project when initializing. Choose a neutral base when asked; apply the foundos purple palette afterward. Do not overwrite an existing component if prompted without checking its current contents. If components.json already exists when you use this guide, skip init.

These commands download component source and dependencies. They do not automatically redesign the homepage or deploy the site. File paths follow the aliases selected during setup, typically src/components/ui in this project.

## Handoff for your site-building chat

Install the free components using the commands above after inspecting project instructions and current changes. Preserve the current brand styles during initialization. Integrate InteractiveHoverButton for the main free-tech-checkup CTA, NoiseTexture very faintly in the hero, BlurFade sparingly for section entrances, and Safari to frame a clearly labeled sample consultation screenshot. Use Input, Label, Textarea, and Button for the inquiry form. Keep the primary headline visible immediately, honor reduced-motion preferences, support keyboard and touch interaction, and use the purple/white colors in the rebuild brief. Installing components alone does not complete the request form or Telegram integration. Test the build and mobile layout; do not deploy without the owner's approval.

## Official sources

- https://ui.shadcn.com/docs/installation/next
- https://magicui.design/docs/components/interactive-hover-button
- https://magicui.design/docs/components/noise-texture
- https://magicui.design/docs/components/blur-fade
- https://magicui.design/docs/components/safari

Status: instructions prepared; installation has not been run and the project has not been modified.
