export interface DataRows {
  id: number;
  name?: string;
  title?: string;
  email?: string;
  role?: string;
  avatar?: string;
  details: {
    city?: string;
    experience?: string;
    post?: string;
  };
}


export const users = [
  {
    id: 1,
    name: "Mark Dsuza",
    title: "UX/UI Designer",
    email: "markdsuza@gmail.com",
    role: "admin",
    avatar: "/images/avatar/avatar-9.jpg",
    details: {
      city: "dhaka",
      experience: "2 years",
      post: "software engineer",
    },
  },
  {
    id: 2,
    name: "Josef Jennyfer",
    title: "Laravel Developer",
    email: "josefjennyfer@gmail.com",
    role: "member",
    avatar: "/images/avatar/avatar-10.jpg",
    details: {
      city: "Rajshahi",
      experience: "2 years",
      post: "Laravel Developer",
    },
  },
  {
    id: 3,
    name: "Romeo D custa",
    title: "Front-end Developer",
    email: "romeodcusta@gmail.com",
    role: "editor",
    avatar: "/images/avatar/avatar-1.jpg",
    details: {
      city: "Rajshahi",
      experience: "2 years",
      post: "Full Stack Developer",
    },
  },
  {
    id: 4,
    name: "Anald Donald",
    title: "Back-end Developer",
    email: "janalddonald@gmail.com",
    role: "editor",
    avatar: "/images/avatar/avatar-12.jpg",
    details: {
      city: "Barisal",
      experience: "2 years",
      post: "Mern Stack Developer",
    },
  },
  {
    id: 5,
    name: "Vicky Patel",
    title: "WordPress Developer",
    email: "vickypatel@gmail.com",
    role: "member",
    avatar: "/images/avatar/avatar-13.jpg",
    details: {
      city: "Dhaka",
      experience: "2 years",
      post: "Software Engineer",
    },
  },
];
