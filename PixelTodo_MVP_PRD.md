# MVP PRD — Gamified To-Do System
**Product Name:** PixelTodo  
**Stage:** MVP  
**Header Status:** `AI: Coming soon!`  
**Primary Goal:** Help users manage time by creating realistic deadlines, completing tasks on time, and earning rewards for disciplined execution.

---

## 1. Product Summary

This MVP is a basic to-do application with a hidden gamification layer.

The product should feel simple on the surface: users create tasks, organize them, set deadlines, and mark them complete. Underneath, the system rewards better deadline prediction and timely completion with points, tokens, and productivity score changes.

The AI/LLM integration is **not part of the MVP experience**. Any AI-related area remains disabled and visually marked as future functionality.

---

## 2. Problem Statement

People often:
- create vague tasks without deadlines,
- underestimate how long tasks will take,
- ignore task completion until it becomes urgent,
- lose motivation after building a to-do list.

The product should make task creation feel engaging, while nudging users toward realistic planning and better follow-through.

---

## 3. MVP Goal

Build a lightweight task manager that:
1. lets users create, edit, delete, and complete tasks,
2. encourages deadline prediction before work begins,
3. rewards on-time and early completion,
4. calculates a productivity score from user performance,
5. includes limited, purchasable powerups using tokens,
6. keeps AI visible only as a disabled future feature.

---

## 4. Non-Goals for MVP

The MVP will not include:
- LLM / async AI task extraction,
- note-to-task conversion,
- project auto-generation,
- planner optimization using AI,
- team collaboration,
- calendar sync,
- recurring task intelligence,
- external integrations.

These can remain in the codebase as disabled modules, but they must not be presented as active MVP features.

---

## 5. Product Principles

### 5.1 Keep it simple
The first impression should be: “This is a clean to-do app.”

### 5.2 Reward discipline
The system should reward users for predicting deadlines well and finishing tasks on time.

### 5.3 Make task creation satisfying
Creating a task should feel interactive, polished, and rewarding rather than like admin work.

### 5.4 Hide complexity behind delightful mechanics
Gamification should support productivity without overwhelming the core to-do workflow.

---

## 6. Core MVP Loop

1. User creates a task.
2. User sets a deadline and optional estimate.
3. Task is placed into the active list.
4. User completes the task.
5. System evaluates completion timing.
6. Points and tokens are awarded.
7. Productivity score updates.
8. User can spend tokens on powerups.

---

## 7. MVP Features

## 7.1 Task CRUD

### Create Task
Users can create tasks with:
- title,
- description (optional),
- deadline,
- estimated duration (optional),
- priority (optional),
- tags or category (optional).

### Read Tasks
Users can view:
- active tasks,
- completed tasks,
- overdue tasks,
- sorted or filtered views.

### Update Task
Users can edit:
- title,
- deadline,
- estimate,
- priority,
- tags,
- status.

### Delete Task
Users can permanently delete tasks with confirmation.

---

## 7.2 Completion Logic

A task is considered complete when the user marks it done manually.

The system evaluates completion based on the task deadline.

### Reward Rules
- **Completed before deadline:** 10 points
- **Completed close to deadline window:** 5 points
- **Completed late:** 1 point

The definition of “close to deadline” should be configurable, but the MVP can use a default buffer of **10 minutes before the deadline** to start the final countdown.

### Productivity Score Impact
A user’s productivity score should reflect:
- total points earned,
- number of late completions,
- consistency over time.

Late completions should reduce the score trend or lower the effective score gain.

---

## 7.3 Deadline Prediction

Users must be encouraged to set a deadline when creating a task.

The product should nudge them to think:
- When will I actually do this?
- Is this deadline realistic?
- Can I finish it early?

This is one of the most important behaviors in the MVP.

---

## 7.4 Gamification Layer

### Points
Points represent task execution quality.

### Tokens
Tokens are earned through task completion and can be spent on powerups.

### Productivity Score
A composite score derived from:
- task completion points,
- deadline accuracy,
- late completion penalties,
- streak consistency.

The score should be visible in the UI and updated immediately after task completion.

### Streaks
Optional MVP support:
- daily completion streak,
- on-time streak,
- early-completion streak.

If included, streaks should remain secondary to the core score system.

---

## 7.5 Powerups / Lifelines

Powerups are a light game layer that can help users finish tasks or recover from bad planning.

Examples:
- **Deadline Shield**: protects one task from a small late penalty,
- **Time Boost**: extends the buffer window for one task,
- **Token Skip**: lets the user defer a task without breaking a streak,
- **Focus Boost**: highlights the next highest-priority task.

These are optional “shop” items or unlockable actions that cost tokens.

### MVP Constraint
Powerups should remain limited in number and simple in behavior. The purpose is not to create a complex game economy, but to create motivation and engagement.

---

## 7.6 Task Creation Experience

Task creation should feel attractive and easy to indulge in.

### Desired feel
- fast,
- visually satisfying,
- low friction,
- slightly playful,
- encouraging of planning.

### Suggested UX elements
- animated modal or bottom sheet,
- quick-add input,
- deadline picker with suggested presets,
- visual feedback when a deadline is chosen,
- micro-animations on save,
- rewarding confirmation state after creation.

### Task creation should nudge users
Instead of just asking “What is the task?”, the UI should guide:
- What needs to be done?
- By when?
- How hard is it?
- Is this realistic?

---

## 8. User Experience Requirements

## 8.1 Primary Screens
- **Home / Task List**
- **Create Task Modal**
- **Task Detail / Edit View**
- **Completed Tasks View**
- **Stats / Productivity View**
- **Powerups / Rewards View**
- **Settings**

## 8.2 Header
The header must show:

`AI: Coming soon!`

This should be visible but clearly inactive.

## 8.3 Disabled AI Areas
Any previously planned AI-related action must be:
- hidden from the main flow, or
- visible but disabled, or
- labeled as coming soon.

No AI interaction should be required for the MVP.

---


## 8. Smart Reminders

Tasks approaching their deadlines can trigger configurable reminders.

### Reminder Configuration
Each task can support:
- **Reminder Start Time**: when reminders begin before the deadline
- **Reminder Frequency**: how often reminders repeat after they begin
- **Reminder Enabled**: on/off toggle per task
- **Default Reminders**: optional global defaults for new tasks

### Example
If a user sets:
- reminder start time = **2 hours before deadline**
- reminder frequency = **1 hour**

Then reminders begin 2 hours before the deadline and repeat every hour until the task is completed or the deadline passes.

### MVP Behavior
- Reminders must stop immediately when the task is marked complete.
- Reminder timing should respect the task deadline.
- The UI should expose reminder settings in task creation and task edit flows.
- The system should support simple in-app reminders for MVP.
- Notification channels beyond the app can remain future-ready and disabled.

### Acceptance Criteria
- Users can set when reminders start.
- Users can set how often reminders repeat.
- Users can enable or disable reminders per task.
- Reminder behavior works for any task with a deadline.


## 9. Functional Requirements

### 9.1 Task Management
- Users can create tasks.
- Users can edit tasks.
- Users can delete tasks.
- Users can mark tasks complete.
- Users can filter tasks by status.

### 9.2 Deadline Handling
- Users can set a deadline while creating a task.
- The app can determine whether completion was early, on time, or late.
- The app can show a countdown before the deadline.

### 9.3 Points and Score
- The app should assign points after completion.
- The app should update the user’s productivity score after every completion.
- The app should store historical completion results.

### 9.4 Tokens and Powerups
- Users earn tokens through completion.
- Users can spend tokens on powerups.
- The app should reflect token balance clearly.

### 9.5 Visual Feedback
- Completion should trigger celebratory feedback.
- Late completion should trigger softer, more cautionary feedback.
- Early completion should feel especially rewarding.

---

## 10. Data Model

### Task
```ts
interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string; // ISO datetime
  estimateMinutes?: number;
  priority?: 'low' | 'medium' | 'high';
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  pointsEarned?: number;
  completionStatus?: 'early' | 'on_time' | 'late';
  tags?: string[];
}
```

### User Stats
```ts
interface UserStats {
  totalPoints: number;
  productivityScore: number;
  tokens: number;
  completedTasks: number;
  earlyCompletions: number;
  onTimeCompletions: number;
  lateCompletions: number;
  currentStreak: number;
}
```

### Powerup
```ts
interface Powerup {
  id: string;
  name: string;
  description: string;
  costTokens: number;
  enabled: boolean;
}
```

---

## 11. Reward Logic

### 11.1 Completion Categories
A completion is categorized into one of three buckets:

- **Early:** completed before the deadline window begins
- **On time:** completed within the final deadline window
- **Late:** completed after the deadline

### 11.2 Default Point Allocation
- Early: **10 points**
- On time: **5 points**
- Late: **1 point**

### 11.3 Score Influence
The productivity score should prefer:
- early completions,
- consistent on-time completions,
- low late-task ratio.

A simple MVP formula is enough. It does not need to be mathematically complex.

---

## 12. UI / Interaction Requirements

### 12.1 Task List
- clean list or card view,
- completion checkbox,
- deadline label,
- point preview or status badge,
- token-relevant styling.

### 12.2 Task Creation Modal
Must include:
- title field,
- deadline field,
- estimate field,
- optional tags,
- save button,
- friendly empty-state hints.

### 12.3 Completion Feedback
- early completion: celebratory state,
- on-time completion: positive confirmation,
- late completion: neutral warning.

### 12.4 Powerup Shop
- show token balance,
- show available powerups,
- show disabled/unavailable items if tokens are insufficient.

---

## 13. Acceptance Criteria

The MVP is successful if:

- users can create and complete tasks without friction,
- deadlines are set and evaluated correctly,
- points are awarded based on completion timing,
- productivity score updates immediately,
- tokens can be earned and spent,
- the app feels playful but still useful as a to-do tool,
- AI is visibly present only as future functionality.

---

## 14. Metrics to Track

- task creation rate,
- task completion rate,
- deadline accuracy rate,
- early vs on-time vs late completion ratio,
- average points earned per user,
- token spend rate,
- repeat usage over 7 days,
- average time taken to create a task.

---

## 15. MVP Scope Checklist

### Must Have
- task CRUD
- deadline input
- completion timing logic
- points system
- productivity score
- token rewards
- powerup store
- AI disabled / coming soon state

### Nice to Have
- streaks
- completion animations
- suggested deadline presets
- task priority hints
- light sound feedback

### Not in MVP
- AI task extraction
- async LLM pipeline
- auto-planning
- project generation
- analytics-heavy dashboards

---

## 16. Implementation Notes

- Keep the architecture ready for future AI activation.
- Feature flags should isolate all AI behavior.
- Core task logic must work independently of future AI modules.
- The MVP should be shippable without needing any model calls.
- Any inactive AI UI should be obvious and non-blocking.

---

## 17. Suggested Release Positioning

Market the product as:
- a simple to-do app,
- with motivating rewards,
- built to help users manage time better,
- and designed to make task completion feel satisfying.

Do not lead with the AI layer in the MVP launch.

---

## 18. Future Roadmap

Future versions may introduce:
- AI-assisted task creation,
- note-to-task conversion,
- smart deadline suggestions,
- behavioral learning,
- personalized productivity insights,
- automated planning,
- richer analytics.

These belong to later phases only.

---

## 19. Final MVP Definition

The MVP should prove one thing:

**people are more likely to plan realistically and complete tasks when the app rewards good deadline behavior.**

That is the core product hypothesis.

---

## 20. Design Guidelines

These guidelines define the visual and interaction language for PixelTodo. The product should feel like a modern productivity tool wrapped in a retro CLI / pixel aesthetic. This design direction is intended to make the app feel distinctive, tactile, and enjoyable while keeping the task workflow clear and fast. fileciteturn2file0

### 20.1 Aesthetic Direction
- Full commitment to a terminal / pixel-inspired UI.
- Use chunky, blocky elements, ASCII-style borders, and scanline-inspired background texture.
- The interface should feel like a retro mainframe, but with modern usability and polish.

### 20.2 Color Palette
| Token | Hex | Usage |
|-------|-----|-----|
| Background | `#0a0a0f` | App background |
| Surface | `#12121a` | Panels and cards |
| Border | `#2a2a3a` | Default borders |
| Primary Text | `#e0e0e0` | Main text |
| Secondary Text | `#6a6a7a` | Hints and metadata |
| Success | `#00ff88` | Completion, positive feedback |
| Warning | `#ffcc00` | Deadline caution |
| Danger | `#ff4466` | Errors, overdue states |
| Info | `#00ccff` | AI and system info |

### 20.3 Typography
- **Primary Font:** `Press Start 2P` for headings and strong UI labels.
- **Body Font:** `JetBrains Mono` for readable body content and data.
- **Fallback:** monospace.
- Headings should feel chunky and expressive; body text should remain highly readable.

### 20.4 Spatial System
- Base spacing should follow an 8px grid.
- Borders should remain sharp and pixel-perfect.
- Border radius should stay minimal or zero.
- Layout should prefer boxed sections and strong visual separation.

### 20.5 Motion Philosophy
- Interactions should feel snappy and immediate.
- Use blinking cursors, quick hover glow, and subtle terminal-style feedback.
- Avoid overly smooth or spring-heavy motion.
- Micro-animations should reinforce clarity, not distract from task completion.

### 20.6 Visual Assets
- Use ASCII/box-drawing borders where possible.
- Use pixel-style icons or simple Unicode block characters.
- Optional scanline overlay can be used lightly for atmosphere.
- Section headers can use a terminal-inspired presentation style.

### 20.7 Layout Structure
- Single-page application with tabbed navigation.
- Core layout should support:
  - Tasks
  - Analytics
  - Settings
- Desktop should preserve the full CLI feel.
- Mobile should simplify borders while keeping the same visual identity.

### 20.8 Component Language
Recommended core UI components:
- PixelButton
- PixelInput
- PixelCheckbox
- TaskCard
- StatPanel
- ASCIIBarChart
- Modal
- TabNavigation

### 20.9 Implementation Notes
- Use CSS variables for theming.
- Keep borders crisp with pixel-friendly rendering.
- Store design tokens centrally so the palette can evolve without changing component logic.
- The design system should support future expansion without breaking the MVP look and feel.

### 20.10 Product Feel
The final result should feel:
- retro but not outdated,
- playful but not childish,
- minimal but not sterile,
- rewarding without becoming visually noisy.

