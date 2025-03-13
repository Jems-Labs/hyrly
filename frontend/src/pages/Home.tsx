import { Button } from "@/components/ui/button";
import {
  UserPlus,
  FileText,
  CheckCircle,
  Star,
  Dot,
  User,
  ClipboardList,
  Send,
  Trophy,
} from "lucide-react";
import img from "/homepage_img.png";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: UserPlus,
    color: "text-blue-400",
    bgColor: "from-blue-400 to-blue-400/50",
    title: "Sign Up",
    desc: "Create an account and set up your profile in minutes",
  },
  {
    icon: FileText,
    color: "text-green-400",
    bgColor: "from-green-400 to-green-400/50",
    title: "Post a Task",
    desc: "Define task details and compensation clearly",
  },
  {
    icon: CheckCircle,
    color: "text-yellow-400",
    bgColor: "from-yellow-400 to-yellow-400/50",
    title: "Make a Decision",
    desc: "Review submissions and choose the best talent",
  },
  {
    icon: Star,
    color: "text-purple-400",
    bgColor: "from-purple-400 to-purple-400/50",
    title: "Rate & Review",
    desc: "Provide feedback to help the community grow",
  },
];

const features = [
  {
    icon: User,
    title: "Seamless Profile Management",
    desc: "Easily update your profile to showcase your skills and expertise",
  },
  {
    icon: ClipboardList,
    title: "Effortless Task Posting",
    desc: "Post tasks quickly with clear details and expectations",
  },
  {
    icon: Send,
    title: "Streamlined Task Submission",
    desc: "Submit work seamlessly and track progress",
  },
  {
    icon: Trophy,
    title: "Dynamic Leaderboard",
    desc: "Gain recognition and climb the ranks with successful task completions",
  },
];

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative text-white px-6 py-10">
        <div className="absolute inset-0 bg-grid-squares pointer-events-none" />
        <div className="relative flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl">
            Task Based Hiring, Simplified!
          </h1>

          <p className="text-lg text-gray-400 mb-6">
            Connect with top talent through real tasks. Post, submit, and decide
            seamlessly.
          </p>
          <Button
            className="rounded-full py-5 px-5"
            onClick={() => navigate("/signup")}
          >
            Get Started For Free
          </Button>
        </div>

        <div className="mt-16 rounded-2xl z-10 relative border-2">
          <img
            src={img}
            alt="Task Based Hiring"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>

      <div className="border-t py-16">
        <div className="flex flex-col justify-center items-center gap-4">
          <Badge className="bg-black text-white border border-secondary px-3 py-3 rounded-full">
            <Dot /> How It Works <Dot />
          </Badge>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10 text-xl sm:text-2xl md:text-3xl">
            Hire effortlessly in just a few steps.
          </p>
        </div>
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-black border rounded-xl cursor-pointer transition"
            >
              <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${step.bgColor} rounded-full blur-xl`}
                />
                <step.icon size={40} className={`${step.color} relative`} />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-400 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t py-16">
        <div className="flex flex-col justify-center items-center gap-4">
          <Badge className="bg-black text-white border border-secondary px-3 py-3 rounded-full">
            <Dot /> Features <Dot />
          </Badge>

          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10 text-xl sm:text-2xl md:text-3xl">
            Discover powerful tools to simplify hiring.
          </p>
        </div>
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {features?.map((feature, index) => {
            return (
              <div
                className="flex flex-col p-6 bg-black border cursor-pointer transition"
                key={index}
              >
                <div className="relative w-16 h-16 flex border items-center justify-center rounded-full mb-4">
                  <feature.icon size={25} />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 mt-2">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
