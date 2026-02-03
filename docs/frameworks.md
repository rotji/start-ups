# Frameworks & Technology Choices

This document explains how we couple our chosen frameworks and tools to the stack-agnostic foundation, ensuring that technology choices remain flexible and maintainable.

## Frontend
- **Framework:** Vite + React + TypeScript
- **Approach:** UI components interact with the application layer via well-defined interfaces. No business logic is embedded in the UI.

## Backend
- **Framework:** Node.js + Express.js + TypeScript
- **Approach:** Express routes/controllers call use-cases from the application layer. All business logic and rules are enforced in the domain/application layers, not in controllers or middleware.

## Database
- **Database:** MongoDB Atlas
- **Approach:** MongoDB adapters implement repository interfaces defined in the application layer. No direct database logic in domain or use-case code.

## Coupling Example
- The `StartupRepository` interface is implemented by a MongoDB adapter for production, and by an in-memory adapter for testing or prototyping.
- The frontend calls backend APIs, which delegate to use-cases, which in turn use repositories via interfaces.

---

By following this approach, we ensure that our system is robust, maintainable, and ready to evolve with new technologies.