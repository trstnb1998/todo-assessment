# React Developer Test Repository

## Task Description:

This repository contains a sample React application with intentional issues ranging from actual bugs to common React mistakes, as well as opportunities for UI improvements

Your task is to clone this repository, identify the issues, fix them, and submit a pull request with your improvements.

It is important to explain the logic behind your changes in the pull request description or next to code that was changed.

# Changes

## UI/UX Changes:

- Add hover effect to todo list items.
- Priority tag added when app is in mobile view.
- Add active tab to display only active tasks.
- Hide form when user is on completed tab.
- Priority order descends from high to low and when priority is the same, sort in alphabetical order.

- Wrapped input field and button in form:\
  -User cannot add empty task and is now required to add text in field.\
  -Keep focus on input when adding task(use case is for when/ if user plans multiple tasks at once).\
  -handleSubmit function to prevent form from refreshing.\
  -Add onSubmit={handleSubmit} to form so user can press enter to submit.\
  -Removed setNewTaskPriority("medium") from onAddTodo() function so last priority is remembered but resets on refresh.

## Issues

- Required message kept popping up on submit (upon adding handleSubmit to form the button which initially had onClick(addToDo) was causing the addToDo function to run twice and therefore the message kept popping up)

- Commented out CardContent due to build failing to compile and wasn't too sure of it's exact purpose

- The \_unsubscribe function types are incorrect. Attempted to fix them but couldn't resolve the issue within a reasonable time.
