import CS50x from "~/assets/images/courses/CS50X.jpg";
import CS50AI from "~/assets/images/courses/CS50AI.webp";
import Presentation from "~/assets/images/courses/presentation.jpeg";

export interface Course {
    title: string;
    description: string;
    image: string | typeof import("*.jpg").default | typeof import("*.webp").default | typeof import("*.jpeg").default;
    category: string;
}

const courses: Course[] = [
    {
        title: "CS50x",
        description:
            "Learned the overall basics of computer science from programs in C to websites with Flask from Harvard.",
        image: CS50x,
        category: "Web Development",
    },
    {
        title: "CS50AI",
        description:
            "Learned the basics of AI from search algorithms to neural networks from Harvard.",
        image: CS50AI,
        category: "AI",
    },
    {
        title: "CS50 Cybersecurity",
        description:
            "Learned the basics of cybersecurity from cryptography to web security from Harvard.",
        image: "https://prod-discovery.edx-cdn.org/media/course/image/88391405-e329-495d-bf72-5de13bbf1846-be5135562618.small.png",
        category: "Cybersecurity",
    },
    {
        title: "CS50 Gaming",
        description:
            "Utilized tools like Love2D and Unity to create various games.",
        image: "https://prod-discovery.edx-cdn.org/media/course/image/8d1da557-03db-4175-b881-e0480d706d96-d4fc70850897.small.jpg",
        category: "Miscellaneous",
    },
    {
        title: "Ultimate Web Development Bootcamp",
        description:
            "Created websites from raw HTML as well as complex Node.js systems",
        image: "https://www.filepicker.io/api/file/FSIjaoI2QtKWZL65cogd",
        category: "Web Development",
    },
    {
        title: "Presentation on AI Accuracy in Cybersecurity and it's implications",
        description:
            "Gave a presentation along with Stanford Professor Neil Daswani on the implications on AI accuracy and some data I had collected on various AIs dealing with Cybersecurity",
        image: Presentation,
        category: "AI",
    },
];

export const categories = courses.reduce<Record<string, Course[]>>((acc, course) => {
    if (!acc[course.category]) {
        acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
}, {});

export const categoryList = Object.entries(categories).map(([name, courses]) => ({
    name,
    courses,
}));

export default courses;
