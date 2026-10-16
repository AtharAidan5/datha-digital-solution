import { CtaBanner } from './components/CtaBanner/CtaBanner'
import { Hero } from './components/Hero/Hero'
import { Layout } from './components/Layout'
import { Services } from './components/Services/Services'
import { WhyUs } from './components/WhyUs/WhyUs'

// Portfolio (#portfolio) and Testimonials (#clients) return here once real content exists
// (design in docs/PLAN-sections.md section 4).
export function App() {
  return (
    <Layout>
      <Hero />
      <WhyUs />
      <Services />
      <CtaBanner />
    </Layout>
  )
}
