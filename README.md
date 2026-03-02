# 🟢 WorkSphere – Task Management Web App

WorkSphere is a lightweight and interactive **task management web application** built using **HTML5, CSS4, and Vanilla JavaScript**.  
It enables a team leader to create tasks, assign them to team members using **Drag & Drop**, and track progress through multiple task states.

---

## 🚀 Features

### 👥 Team Setup
- Create team members using a SweetAlert2 modal
- Enter member names (comma separated)
- Automatically generates a task board for each member

### 📝 Task Management (Leader)
- Add new tasks to the main task board
- Delete tasks at any time
- Automatic task counter updates

### 🔄 Drag & Drop System
- Drag tasks from the main board to any team member
- Move tasks between team members
- Return tasks back to the main task board

### 📊 Task Status Management
Each task has **three states**:
- Not Started
- In Progress
- Finished

**Important Rule**
- Tasks marked as **Finished** cannot be dragged
- Tasks in other states can be moved freely

### 🎨 Visual Feedback
- Color-coded tasks based on status
- Highlighted drop areas during drag events
- Informational messages when no tasks are available

### 🖼️ Avatar Upload
- Each team member can upload a profile image
- Image preview appears instantly using `URL.createObjectURL()`

---

## 🛠️ Technologies Used

- HTML5
- CSS4
- JavaScript (Vanilla JS)
- SweetAlert2

---

## 📂 Project Structure
WorkSphere/
├── index.html
├── css/
│ └── style.css
├── js/
│ └── main.js
├── assets/
│ └── images/
└── README.md

---

## 🧠 Application Logic

- Only the **Leader** can add and delete tasks
- Tasks are assigned via Drag & Drop
- Each task updates its status visually
- Finished tasks are locked and cannot be moved

---

## 🧪 How to Run

1. Clone or download the repository
2. Open `index.html` in your browser
3. Create team members
4. Start adding and managing tasks

---

## 📌 Future Enhancements

- Persist data using LocalStorage
- Role-based access (Leader / Member)
- Task deadlines and priorities
- Filter tasks by status
- Improved mobile responsiveness

---

## 👩‍💻 Author

**Nehal Nabel**  
Full Stack Web Developer  

🔗 Portfolio:  
https://mostaql.com/u/nehalnabel/portfolio




