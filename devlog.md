## **Plant Care Tracker Development Journal**

---

### **Project Vision**

The Plant Care Tracker aimed to create a comprehensive platform for managing plant care routines. It would offer tools like plant profiles, care schedules, growth tracking, and troubleshooting, all within a sleek, user-friendly interface. The project set out to combine modern web development practices, innovative features, and a user-centered design philosophy.

---

### **Timeline of Development**

#### **Project Kickoff: Vision and Early Direction**

The project began with ambitious goals:

- **Tech Stack**:
  - Chose **Next.js** for its flexibility in building full-stack applications.
  - Opted for **MongoDB** as the database for its scalability and schema-less design.
  - Selected **NextAuth.js** for secure, seamless authentication.
- **Initial Plans**:
  - Envisioned an achievement system to gamify user engagement and reward consistent plant care.
  - Outlined a dashboard with rich analytics and dynamic care reminders.

---

#### **Phase 1: December 6 – Early Exploration and Design**

- **Early Priorities**:
  - Focused on dashboard UI and basic functionality:
    - Fixed picture carousel for displaying plant images.
    - Enabled uploading images to MongoDB.
- **Achievement System**:
  - Spent significant time designing and implementing an achievement system to reward user milestones.
- **Lessons Learned**:
  - The achievement system turned out to be fundamentally flawed in its logic, requiring a complete rethink. This detour consumed valuable time.
- **Backend Hurdles**:
  - Encountered fundamental flaws in backend implementation. Considered migrating to Supabase but decided to stick with MongoDB and refactor.

---

#### **Phase 2: December 12 – Midway Struggles**

- **API Challenges**:
  - Struggled with API design and considered a complete rewrite. Progress felt slow and disorganized.
- **Small Wins**:
  - Fixed session management to properly pass data between server and client.

---

#### **Phase 3: December 13 – The Great Restart**

- **Rebooting the Project**:
  - After two rewrites, started from scratch yet again:
    - Established a modular folder structure:
      - **Public Routes**: Landing, Login.
      - **Protected Routes**: Dashboard pages like Overview, My Plants, Plant Info, and Routines.
  - Focused on laying a solid foundation for scalable development.

---

#### **Phase 4: December 15 – Rapid MVP Development**

- **New Focus**:
  - Shifted efforts toward delivering a working MVP:
    - Rebuilt the Next.js project with MongoDB integration.
    - Implemented NextAuth.js for GitHub and Google authentication.
    - Developed core features:
      - Upload and fetch plant data with images.
      - Sidebar navigation with protected routes.
- **Achievements in Session Handling**:
  - Strengthened session management with server-side and client-side handling:
    - Server-side: `getServerSession` for secure session management.
    - Client-side: `useSession` for dynamic UI updates.

---

#### **Phase 5: December 30 – Final Push and Scaling Back**

- **Time Crunch**:
  - With the deadline looming, realized the scope was too ambitious:
    - Cut features like notifications, advanced dashboards, and the achievement system.
    - Reflected on how repeated rewrites and early detours had left little time for polishing the app.
- **Core Functionalities Completed**:
  - Successfully built:
    - User authentication.
    - Plant data upload with image support.
    - Sidebar navigation and themes.

---

### **Challenges and Reflections**

1. **Achievement System Detour**:

   - Spent too much time early on trying to build a gamified achievement system. The logic behind tracking and rewarding milestones proved more complex than expected. This delayed progress on core functionalities.

2. **Rewriting the App**:

   - Restarted the app from scratch three times:
     - The first iteration suffered from poor structure and technical flaws.
     - The second iteration improved organization but still lacked clear goals for features like API design and session management.
     - The final rewrite established a solid foundation but came at the cost of significant lost time.

3. **Ambition vs. Feasibility**:

   - The combination of learning Next.js and TypeScript while building a complex app was overly ambitious for the timeline. Key features like routines, notifications, and dashboards had to be cut or scaled back.

4. **Technical Hurdles**:
   - Struggled with hydration errors and backend implementation, requiring frequent debugging and refactoring.

---

### **Notable Achievements**

- **Authentication**:

  - Implemented GitHub and Google authentication, with session management on both server and client sides.

- **Core Features**:

  - Built a functioning plant database system with image uploads and retrievals.

- **UI/UX**:
  - Cleaned up the dashboard and settings pages, added themes, and ensured consistent styling across the app.

---

### **Lessons Learned**

1. **Iterative Development**:

   - Starting small and building incrementally might have prevented wasted time on features like the achievement system.

2. **Scoping Realistically**:

   - A clearer understanding of what could be achieved within the timeline would have reduced the need for last-minute cuts and rewrites.

3. **Leveraging Existing Tools**:
   - Considering third-party solutions earlier for complex features like notifications or achievements might have saved time and effort.

---
