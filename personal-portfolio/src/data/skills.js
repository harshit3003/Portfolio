import { FaReact, FaPython, FaGithub, FaHtml5 } from 'react-icons/fa';
import {
    SiJavascript, SiCss3,
    SiMysql, SiCplusplus,
    SiVite, SiLeetcode
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export const skillCategories = [
    {
        title: 'Programming Languages & DSA',
        description: 'Core languages, data structures & competitive programming',
        icon: '💻',
        skills: [
            { name: 'C / C++', icon: SiCplusplus, level: 80, color: '#00599C' },
            { name: 'Python', icon: FaPython, level: 70, color: '#3776AB' },
            { name: 'JavaScript', icon: SiJavascript, level: 92, color: '#F7DF1E' },
            { name: 'Data Structures & Algorithms', icon: SiLeetcode, level: 60, color: '#FFA116' },
            { name: 'Object-Oriented Programming (OOP)', icon: SiCplusplus, level: 90, color: '#3b82f6' },
        ],
    },
    {
        title: 'Frontend Development',
        description: 'Responsive, fast, and interactive user interfaces',
        icon: '🎨',
        skills: [
            { name: 'React.js', icon: FaReact, level: 95, color: '#61DAFB' },
            { name: 'JavaScript', icon: SiJavascript, level: 92, color: '#F7DF1E' },
            { name: 'Vite', icon: SiVite, level: 90, color: '#646CFF' },
            { name: 'HTML5', icon: FaHtml5, level: 95, color: '#E34F26' },
            { name: 'CSS3 & Responsive Design', icon: SiCss3, level: 90, color: '#1572B6' },
        ],
    },
    {
        title: 'Backend & Databases',
        description: 'Backend architectures & relational database systems',
        icon: '⚙️',
        skills: [
            { name: 'Python', icon: FaPython, level: 95, color: '#3776AB' },
            { name: 'MySQL', icon: SiMysql, level: 90, color: '#4479A1' },
            { name: 'Database Management', icon: SiMysql, level: 88, color: '#00758F' },
        ],
    },
    {
        title: 'Tools & Platforms',
        description: 'Version control & modern developer tools',
        icon: '🚀',
        skills: [
            { name: 'Git', icon: FaGithub, level: 90, color: '#F05032' },
            { name: 'GitHub', icon: FaGithub, level: 90, color: '#FFFFFF' },
            { name: 'VS Code', icon: VscVscode, level: 95, color: '#007ACC' },
        ],
    },
];

