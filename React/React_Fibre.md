# React Fiber Architecture

## Introduction
React Fiber is an ongoing reimplementation of React's core algorithm. It is the culmination of over two years of research by the React team.

The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is **incremental rendering**: the ability to split rendering work into chunks and spread it out over multiple frames.

Other key features include:
- The ability to pause, abort, or reuse work as new updates come in.
- The ability to assign priority to different types of updates.
- New concurrency primitives.

---

## About this Document
Fiber introduces several novel concepts that are difficult to grok solely by looking at code. This document began as a collection of notes I took as I followed along with Fiber's implementation in the React project. As it grew, I realized it may be a helpful resource for others, too.

I'll attempt to use the plainest language possible and avoid jargon by explicitly defining key terms. I'll also link heavily to external resources when possible.

> Please note that I am not on the React team and do not speak from any authority. This is not an official document. I have asked members of the React team to review it for accuracy.

This is also a **work in progress**. Fiber is an ongoing project that will likely undergo significant refactors before it's completed. Also ongoing are my attempts at documenting its design here. Improvements and suggestions are highly welcome.

My goal is that after reading this document, you will understand Fiber well enough to follow along as it's implemented, and eventually even be able to contribute back to React.

---

## Prerequisites
I strongly suggest that you are familiar with the following resources before continuing:

- **React Components, Elements, and Instances**: "Component" is often an overloaded term. A firm grasp of these terms is crucial.
- **Reconciliation**: A high-level description of React's reconciliation algorithm.
- **React Basic Theoretical Concepts**: A description of the conceptual model of React without implementation burden. Some of this may not make sense on first reading. That's okay; it will make more sense with time.
- **React Design Principles**: Pay special attention to the section on scheduling. It does a great job of explaining the "why" of React Fiber.

---

## Review

### What is Reconciliation?
- **Reconciliation**: The algorithm React uses to diff one tree with another to determine which parts need to be changed.
- **Update**: A change in the data used to render a React app, usually the result of `setState`, which eventually triggers a re-render.

The central idea of React's API is to think of updates as if they cause the entire app to re-render. This allows the developer to reason declaratively, rather than worry about how to efficiently transition the app from one state to another (e.g., A to B, B to C, C to A).

In practice, re-rendering the entire app on each change is costly. React optimizes this through reconciliation, creating the appearance of a whole app re-rendering while maintaining great performance.

#### Key Points of Reconciliation:
- **Different component types** generate substantially different trees. React does not attempt to diff them but replaces the old tree completely.
- **Diffing of lists** is performed using keys. Keys should be stable, predictable, and unique.

### Reconciliation vs. Rendering
- React supports rendering to multiple environments, such as the DOM (React DOM) and native iOS/Android views (React Native).
- React separates **reconciliation** (computing changes) from **rendering** (applying changes to the environment).
- Fiber reimplements the **reconciler**, not the renderer.

---

## Scheduling
- **Scheduling**: The process of determining when work should be performed.
- **Work**: Any computations that must be performed, usually resulting from an update (e.g., `setState`).

From the React Design Principles:

> In its current implementation, React walks the tree recursively and calls render functions of the whole updated tree during a single tick. However, in the future, it might start delaying some updates to avoid dropping frames.

Key points:
- In a UI, not every update needs to be applied immediately. Delaying updates can prevent frame drops and improve user experience.
- Different types of updates have different priorities.
- React's **pull-based approach** allows the framework to decide when to perform computations, rather than leaving it to the developer.

Overhauling React's core algorithm to take advantage of scheduling is the driving idea behind Fiber.

---

## What is a Fiber?
Fibers are a low-level abstraction within React Fiber's architecture. A **fiber** represents a unit of work.

React Fiber enables:
- Pausing work and resuming it later.
- Assigning priority to different types of work.
- Reusing previously completed work.
- Aborting unnecessary work.

Fibers can be thought of as a **virtual stack frame**, allowing React to control execution.

---

## Structure of a Fiber
A fiber is a JavaScript object that contains information about a component, its input, and its output. Here are some important fields in a fiber:

### Key Fields:
1. **type** and **key**:
   - The `type` describes the component the fiber corresponds to.
   - The `key` is used during reconciliation to determine if the fiber can be reused.

2. **child** and **sibling**:
   - `child` points to the fiber's first child.
   - `sibling` points to the fiber's next sibling.
   - These fields form a singly linked list representing the component tree.

3. **return**:
   - Points to the parent fiber.

4. **pendingProps** and **memoizedProps**:
   - `pendingProps`: Props at the beginning of execution.
   - `memoizedProps`: Props at the end of execution.

5. **pendingWorkPriority**:
   - Tracks the priority of work for the fiber.

6. **alternate**:
   - Points to the fiber's alternate version (current vs. work-in-progress).

7. **output**:
   - Represents the output of the fiber, which is transferred up the tree and flushed by the renderer.

---

## Future Sections
This document is a work in progress. Future topics will include:
- How the scheduler finds the next unit of work to perform.
- How priority is tracked and propagated through the fiber tree.
- How the scheduler knows when to pause and resume work.
- How work is flushed and marked as complete.
- How side effects (e.g., lifecycle methods) work.
- What a coroutine is and how it can be used to implement features like context and layout.

---

## Related Videos
- **What's Next for React** (ReactNext 2016)
