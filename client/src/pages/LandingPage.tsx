import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Users, Search, BarChart, MessageSquare, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Turn the Web into Your <span className="text-indigo-600">Lead Machine</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                AI-powered CRM that researches and runs campaigns on your behalf. Talk to it like a team member.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/chat"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Prospecting
                </Link>
                <a
                  href="#features"
                  className="px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                alt="Business team working with ProspectPro AI"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How ProspectPro AI Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform automates your lead generation and customer relationship management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Research</h3>
              <p className="text-gray-600">
                Our AI scans the web to find and qualify prospects that match your ideal customer profile.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conversational Interface</h3>
              <p className="text-gray-600">
                Talk to ProspectPro AI like you would with a team member. No complex menus or commands.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Campaigns</h3>
              <p className="text-gray-600">
                Let the AI run personalized outreach campaigns that adapt based on prospect responses.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by Sales Teams</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              See how ProspectPro AI is transforming lead generation for companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">Sales Director, TechCorp</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ProspectPro AI has increased our qualified leads by 73% while reducing the time our team spends on research."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-500">Founder, GrowthLabs</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The conversational interface makes it so easy to get the information I need without digging through dashboards."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow border">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Jessica Miller</h4>
                  <p className="text-sm text-gray-500">VP Sales, CloudSolutions</p>
                </div>
              </div>
              <p className="text-gray-600">
                "We've seen a 40% increase in response rates since using ProspectPro AI's personalized campaign feature."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Lead Generation?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of sales professionals who are using ProspectPro AI to find and connect with their ideal customers.
          </p>
          <Link
            to="/chat"
            className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors inline-block"
          >
            Start Prospecting Now
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <BrainCircuit className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">ProspectPro AI</span>
              </div>
              <p className="mt-4 text-gray-400">
                AI-powered CRM that turns conversations into customers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ProspectPro AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;