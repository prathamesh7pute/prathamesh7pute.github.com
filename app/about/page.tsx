import { Metadata } from 'next';
import PageLayout from '../components/PageLayout';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Prathamesh Satpute, a full-stack engineer crafting Agentic AI solutions, modern frontends, and cloud-native Kubernetes infrastructure, passionate about TypeScript, Python, and AI/LLM-driven systems.',
  openGraph: {
    title: 'About | Prathamesh Satpute',
    description:
      'Learn more about Prathamesh Satpute, a full-stack engineer crafting Agentic AI solutions, modern frontends, and cloud-native Kubernetes infrastructure, passionate about TypeScript, Python, and AI/LLM-driven systems.',
  },
};

export default function About() {
  return (
    <PageLayout>
      <h1>About Me</h1>
      <p>
        Hi, I’m Prathamesh — a full-stack engineer crafting <strong>Agentic AI solutions</strong>, modern frontends, and <strong>cloud-native Kubernetes infrastructure</strong>, passionate about{' '}
        <strong>TypeScript, Python, and AI/LLM-driven systems</strong>.
      </p>
    </PageLayout>
  );
}
