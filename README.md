# React UI Components

This repository contains two reusable React components built with TypeScript and TailwindCSS, documented with Storybook.

## Components

1. **InputField**  
   A flexible input component with support for validation states, multiple variants, sizes, and optional features like clear button and password toggle.

2. **DataTable**  
   A data table component with features like sorting, row selection, loading state, and empty state.

---

## Tech Stack

- React  
- TypeScript  
- TailwindCSS  
- Storybook  

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
  



2. **Install dependencies:**

```bash
npm install
     or
yarn install
```
3.  **Run the development server:**

```bash
npm run dev 
    or 
yarn dev
```
4 **Run the StoryBook**

```
npm run storybook   or yarn storybook 
```
5. **Run Tests**
```
npm test
or
yarn test
```


----

## Description of Approach

* **Scalability and Reusability:** The components were designed with scalability in mind, making them easily reusable and extendable for different projects or feature additions.

* **TypeScript for Strong Typing:** Leveraged TypeScript interfaces and types to ensure type safety, improve code clarity, and provide better developer experience.

* **Component Variants and States:** For `InputField`, multiple variants (`filled`, `outlined`, `ghost`), sizes, and states like `disabled`, `invalid`, and `loading` were implemented to cover diverse UI needs.

* **Accessibility:** Added basic ARIA attributes and roles to ensure components are accessible, including labels, focus management, and keyboard navigation support.

* **Responsive Design:** Used TailwindCSS’s utility classes to make components responsive and visually consistent across different screen sizes.

* **Storybook Documentation:** Documented all component variants, states, and usage examples in Storybook, enabling easy exploration and testing.

* **Testing:** Added basic unit tests to verify critical functionality and edge cases for both components.

* **Optional Features:** Included optional enhancements like clear button and password toggle in `InputField`, and single/multiple row selection in `DataTable` for improved user experience.

---

## Deployment

The Storybook preview is deployed and accessible here:
[**Storybook Preview Link**](https://your-deployment-link.com)

---

## Additional Notes

* Components support both light and dark themes.
* Clear button and password toggle are optional props on InputField.
* DataTable supports both single and multiple row selection.
* Feel free to explore the stories for examples of usage and customization.

---


