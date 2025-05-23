import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    title: "Understanding Anxiety",
    description:
      "Learn about anxiety triggers, symptoms, and effective coping strategies.",
    category: "Mental Health",
    readTime: "10 min read",
  },
  {
    title: "Mindfulness Meditation",
    description:
      "A beginner's guide to mindfulness meditation and its benefits.",
    category: "Wellness",
    readTime: "8 min read",
  },
  {
    title: "Stress Management",
    description:
      "Practical techniques for managing daily stress and maintaining balance.",
    category: "Self-Care",
    readTime: "12 min read",
  },
  {
    title: "Building Healthy Habits",
    description:
      "Step-by-step guide to developing and maintaining positive habits.",
    category: "Lifestyle",
    readTime: "15 min read",
  },
  {
    title: "Sleep Better",
    description: "Tips and strategies for improving your sleep quality.",
    category: "Wellness",
    readTime: "7 min read",
  },
  {
    title: "Emotional Intelligence",
    description: "Understanding and developing your emotional intelligence.",
    category: "Personal Growth",
    readTime: "11 min read",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-[#F6EDE1] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-[#045842]">
              Wellness Guides
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore our collection of expert-curated guides to help you on
              your journey to better mental health and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium text-orange-500">
                        {guide.category}
                      </span>
                      <CardTitle className="mt-2">{guide.title}</CardTitle>
                    </div>
                    <span className="text-sm text-gray-500">
                      {guide.readTime}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {guide.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full group bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200"
                  >
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#045842] py-12">
        <div className="container mx-auto px-4">
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4 text-[#F6EDE1]">
              Can't find what you're looking for?
            </h2>
            <p className="text-[#F6EDE1] mb-6">
              Our team of experts is constantly creating new guides. Let us know
              what topics you'd like to see.
            </p>
            <Button
              variant="outline"
              className="bg-[#FF5001] text-white hover:bg-[#cc4001] transform hover:scale-105 transition-all duration-200"
            >
              Suggest a Guide Topic
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
