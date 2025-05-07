
import { useState } from "react";
import { Copy, Check, Search } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ResourceLink {
  title: string;
  url: string;
  description: string;
  tags: string[];
}

const resourcesData: Record<string, ResourceLink[]> = {
  "solana": [
    {
      title: "Solana Documentation",
      url: "https://docs.solana.com/",
      description: "Official documentation for Solana blockchain development",
      tags: ["docs", "official", "development"]
    },
    {
      title: "Solana Cookbook",
      url: "https://solanacookbook.com/",
      description: "Collection of useful Solana code examples and concepts",
      tags: ["tutorial", "examples", "development"]
    },
    {
      title: "Solana Program Library",
      url: "https://github.com/solana-labs/solana-program-library",
      description: "Collection of on-chain programs maintained by Solana labs",
      tags: ["github", "code", "reference"]
    },
    {
      title: "Solana Explorer",
      url: "https://explorer.solana.com/",
      description: "Block explorer for the Solana blockchain",
      tags: ["explorer", "transactions", "blocks"]
    }
  ],
  "security": [
    {
      title: "Solana Security Workshop",
      url: "https://workshop.secureum.xyz/solana/",
      description: "Comprehensive security workshop for Solana developers",
      tags: ["workshop", "training", "audit"]
    },
    {
      title: "Common Security Vulnerabilities in Solana Programs",
      url: "https://github.com/coral-xyz/sealevel-attacks",
      description: "Repository of common attack vectors and vulnerabilities in Solana smart contracts",
      tags: ["vulnerabilities", "attacks", "examples"]
    },
    {
      title: "Superteam Security Handbook",
      url: "https://security.superteam.fun/",
      description: "Comprehensive guide to security in the Solana ecosystem",
      tags: ["handbook", "best-practices", "guide"]
    },
    {
      title: "Solana Security Audits",
      url: "https://audits.quillaudits.com/smart-contract-audit/solana/",
      description: "Collection of security audits for Solana projects",
      tags: ["audits", "reports", "reviews"]
    }
  ],
  "tools": [
    {
      title: "Soteria",
      url: "https://github.com/Soteria-core/soteria-core",
      description: "Static analyzer for Solana programs written in Rust",
      tags: ["static-analysis", "tools", "audit"]
    },
    {
      title: "Seahorse",
      url: "https://seahorse.dev/",
      description: "Python-like language for writing Solana programs",
      tags: ["language", "framework", "development"]
    },
    {
      title: "Anchor Framework",
      url: "https://www.anchor-lang.com/",
      description: "Framework for Solana's Sealevel runtime providing several conveniences for program development",
      tags: ["framework", "development", "tooling"]
    },
    {
      title: "Solana Web3.js",
      url: "https://github.com/solana-labs/solana-web3.js",
      description: "Solana JavaScript API for interacting with the Solana network",
      tags: ["javascript", "api", "sdk"]
    }
  ],
  "learning": [
    {
      title: "Buildspace Solana Course",
      url: "https://buildspace.so/solana-core",
      description: "Free, hands-on course to learn Solana development",
      tags: ["course", "tutorial", "beginner"]
    },
    {
      title: "Solana Developers Blog",
      url: "https://solana.com/developers/blog",
      description: "Official blog with updates, tutorials and resources for developers",
      tags: ["blog", "tutorials", "updates"]
    },
    {
      title: "Solana Bootcamp",
      url: "https://solana.com/developers/bootcamp",
      description: "Intensive training program for Solana developers",
      tags: ["bootcamp", "training", "course"]
    },
    {
      title: "Figment Learn",
      url: "https://learn.figment.io/protocols/solana",
      description: "Tutorials and educational content for Solana development",
      tags: ["tutorials", "pathway", "learn"]
    }
  ]
};

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("solana");
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({});

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      
      // Set this specific URL as copied
      setCopiedLinks({
        ...copiedLinks,
        [url]: true
      });
      
      // Show success toast
      toast.success("Link copied to clipboard");
      
      // Reset copy icon after 2 seconds
      setTimeout(() => {
        setCopiedLinks({
          ...copiedLinks,
          [url]: false
        });
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const filteredResources = resourcesData[activeTab]?.filter(resource => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <PageLayout title="Resources">
      <div className="container mx-auto p-4 space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Security Resources</h1>
          <p className="text-muted-foreground">
            Curated security resources for Solana developers and users
          </p>
        </div>

        <div className="flex items-center w-full max-w-md mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search resources..." 
              className="pl-10 bg-card border-border focus-visible:ring-purple"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="solana" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full sm:w-auto">
            <TabsTrigger value="solana">Solana</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>
          
          {Object.keys(resourcesData).map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources?.length > 0 ? (
                  filteredResources.map((resource, index) => (
                    <Card key={index} className="card-gradient overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:text-primary transition-colors"
                            >
                              {resource.title}
                            </a>
                          </CardTitle>
                          <button 
                            onClick={() => handleCopyLink(resource.url)}
                            className="p-1 hover:bg-muted rounded-md transition-colors"
                            title="Copy link"
                          >
                            {copiedLinks[resource.url] ? (
                              <Check size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} className="text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {resource.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 py-20 text-center">
                    <p className="text-muted-foreground">No resources found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageLayout>
  );
}
