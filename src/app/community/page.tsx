import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Search,
  Users,
  BookOpen,
  AlertCircle,
  Heart,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const discussionTopics = [
  {
    title: "Anxiety Support",
    description: "Share experiences and coping strategies for anxiety.",
    posts: 128,
    members: 456,
    icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Depression Discussion",
    description: "A safe space to talk about depression and recovery journeys.",
    posts: 243,
    members: 512,
    icon: <Heart className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Mindfulness Practice",
    description: "Tips and experiences with mindfulness meditation.",
    posts: 87,
    members: 320,
    icon: <BookOpen className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Caregiver Support",
    description:
      "For those supporting loved ones with mental health challenges.",
    posts: 156,
    members: 289,
    icon: <Users className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Recovery Stories",
    description:
      "Share your mental health recovery journey and inspire others.",
    posts: 194,
    members: 378,
    icon: <Heart className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Community Resources",
    description: "Share and discover helpful resources for mental wellbeing.",
    posts: 112,
    members: 267,
    icon: <Shield className="h-5 w-5 text-orange-500" />,
  },
];

const recentDiscussions = [
  {
    title: "How do you manage anxiety in social situations?",
    author: "Sarah J.",
    replies: 24,
    views: 342,
    timeAgo: "2 hours ago",
    category: "Anxiety Support",
  },
  {
    title: "Mindfulness techniques that actually worked for me",
    author: "Michael T.",
    replies: 18,
    views: 276,
    timeAgo: "5 hours ago",
    category: "Mindfulness Practice",
  },
  {
    title: "Supporting a partner with depression - advice needed",
    author: "Jamie L.",
    replies: 32,
    views: 415,
    timeAgo: "1 day ago",
    category: "Caregiver Support",
  },
  {
    title: "My recovery journey - one year later",
    author: "Alex P.",
    replies: 47,
    views: 623,
    timeAgo: "2 days ago",
    category: "Recovery Stories",
  },
  {
    title: "New to the community - where should I start?",
    author: "Taylor R.",
    replies: 15,
    views: 189,
    timeAgo: "3 days ago",
    category: "Community Resources",
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#045741] py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-[#F6EDE1] tracking-tight drop-shadow-lg">
          Community Forum
        </h1>
        <p className="text-lg text-[#F6EDE1] max-w-2xl mx-auto font-medium">
          Connect with others, share experiences, and find support in our
          moderated community spaces. All discussions are guided by our
          community values of respect, empathy, and hope.
        </p>
      </div>

      <div className="bg-[#F6EDE1] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[#F6EDE1] rounded-lg p-4 mb-8 border-[#045842] border-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search discussions..."
                className="pl-10 bg-[#F6EDE1] border-[#045842] border-2"
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#FF5001] hover:bg-[#cc4001] text-white transform hover:scale-105 transition-all duration-200">
                Search
              </Button>
            </div>
          </div>

          <div className="bg-[#F6EDE1] rounded-lg shadow-sm overflow-hidden mb-12 border-[#045842] border-2">
            <Tabs defaultValue="topics" className="w-full">
              <div className="border-b border-[#045842]">
                <div className="container mx-auto">
                  <TabsList className="flex bg-[#F6EDE1]">
                    <TabsTrigger
                      value="topics"
                      className="flex-1 py-4 data-[state=active]:bg-[#3A3FC1] data-[state=active]:text-white"
                    >
                      <Users className="mr-2 h-5 w-5" /> Topic Categories
                    </TabsTrigger>
                    <TabsTrigger
                      value="recent"
                      className="flex-1 py-4 data-[state=active]:bg-[#3A3FC1] data-[state=active]:text-white"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" /> Recent
                      Discussions
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="topics" className="p-6 bg-[#F6EDE1]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discussionTopics.map((topic, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow duration-200 bg-[#F6EDE1] border-[#045842] border-2"
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          {topic.icon}
                          <CardTitle className="text-lg text-[#0b6344]">
                            {topic.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 text-gray-700">
                          {topic.description}
                        </CardDescription>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{topic.posts} posts</span>
                          <span>{topic.members} members</span>
                        </div>
                        <Button className="w-full mt-4 group bg-[#3A3FC1] hover:bg-[#2e32a6] text-white transform hover:scale-105 transition-all duration-200">
                          View Discussions
                          <MessageCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="p-6 bg-[#F6EDE1]">
                <div className="space-y-4">
                  {recentDiscussions.map((discussion, index) => (
                    <div
                      key={index}
                      className="border-[#045842] border-2 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-[#F6EDE1]"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg hover:text-[#3A3FC1] transition-colors text-[#0b6344]">
                            <Link href="#">{discussion.title}</Link>
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <span>Posted by {discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.timeAgo}</span>
                            <span>•</span>
                            <span className="text-[#FF5001]">
                              {discussion.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>{discussion.replies} replies</div>
                          <div>{discussion.views} views</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 text-center">
                    <Button className="bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200">
                      View More Discussions
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-[#045741] rounded-lg shadow-sm p-6 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-[#F6EDE1]">
              Community Guidelines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-lg mb-2 flex items-center text-[#F6EDE1]">
                  <Shield className="mr-2 h-5 w-5 text-[#FF5001]" />
                  Our Values
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[#F6EDE1]/90">
                  <li>Respect everyone's experiences and perspectives</li>
                  <li>Maintain confidentiality and privacy</li>
                  <li>Focus on support rather than diagnosis</li>
                  <li>Share hope and recovery-oriented content</li>
                  <li>Be mindful of content that may be triggering</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2 flex items-center text-[#F6EDE1]">
                  <AlertCircle className="mr-2 h-5 w-5 text-[#FF5001]" />
                  Important Reminders
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-[#F6EDE1]/90">
                  <li>This forum is moderated but not monitored 24/7</li>
                  <li>For crisis support, please use our crisis resources</li>
                  <li>
                    Information shared is not a substitute for professional help
                  </li>
                  <li>Report concerning content using the report button</li>
                  <li>Protect your personal identifying information</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button className="bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200">
                Read Full Community Guidelines
              </Button>
            </div>
          </div>

          <div className="bg-[#F6EDE1] rounded-lg shadow-sm p-6 border-[#045842] border-2">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-[#0b6344]">
                Ready to Join the Conversation?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Create an account to participate in discussions, save helpful
                resources, and connect with a supportive community on your
                mental health journey.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-[#FF5001] text-white hover:bg-[#cc4001] transform hover:scale-105 transition-all duration-200">
                  Create an Account
                </Button>
                <Button className="bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
